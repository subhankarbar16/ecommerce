import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function CategoryAdd({ auth, categories }) {
    //console.log(sitesettings);
    const { data, setData, post, processing, errors, reset,recentlySuccessful } = useForm({
        category_name: '',
        parent_id: '',
        category_image: '',
    });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('categories.add'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories (Add)</h2>}
        >
            <Head title="Categories" />
           
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div className="grid grid-cols-2 gap-4">
                                    <div >
                                        <InputLabel htmlFor="category_name" value="Category Name" />
                                        <TextInput
                                            id="category_name"
                                            type="text"
                                            name="category_name"
                                            value={data.category_name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('category_name', e.target.value)}
                                        />
                                        <InputError message={errors.category_name} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="category_image" value="Category Image" />
                                        <TextInput
                                            id="category_image"
                                            type="file"
                                            name="category_image"
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('category_image', e.target.files[0])}
                                        />
                                        <InputError message={errors.category_image} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="parent_id" value="Parent Category" />
                                        <SelectInput
                                            id="parent_id"
                                            options={categories}
                                            selected={data.parent_id}
                                            valuecol="id"
                                            namecol="category_name"
                                            placeholder="Select Parent Category"
                                            name="parent_id"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('parent_id', e.target[e.target.selectedIndex].value)}
                                        />
                                        <InputError message={errors.parent_id} className="mt-2" />
                                    </div>
                                    <div className="col-span-2">
                                        <PrimaryButton className="float-right" disabled={processing}>
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}