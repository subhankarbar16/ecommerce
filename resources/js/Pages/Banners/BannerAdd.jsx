import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function BannerAdd({ auth, sorting_orders }) {
//console.log(sorting_orders);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        highlight:'',
        banner_image: '',
        short_description: '',
        link: '',
        sorting_order: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('banners.add'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Banners (Add)</h2>}
        >
            <Head title="Banners" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div className="grid grid-cols-2 gap-4">
                                    <div >
                                        <InputLabel htmlFor="title" value="Title" />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="banner_image" value="Banner Image" />
                                        <TextInput
                                            id="banner_image"
                                            type="file"
                                            name="banner_image"
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('banner_image', e.target.files[0])}
                                        />
                                        <InputError message={errors.banner_image} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="link" value="URL" />
                                        <TextInput
                                            id="link"
                                            type="text"
                                            name="link"
                                            value={data.link}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('link', e.target.value)}
                                        />
                                        <InputError message={errors.link} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="sorting_order" value="Display Order" />
                                        <SelectInput
                                            id="sorting_order"
                                            options={sorting_orders}
                                            selected={data.sorting_order}
                                            placeholder="Select Display Order"
                                            name="sorting_order"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('sorting_order', e.target[e.target.selectedIndex].value)}
                                        />
                                        <InputError message={errors.sorting_order} className="mt-2" />
                                    </div>
                                    <div className="col-span-2">
                                        <InputLabel htmlFor="highlight" value="Highlight Title" />
                                        <TextArea
                                            id="highlight"
                                            name="highlight"
                                            className="mt-1 block w-full h-40"
                                            col="4" row="6"
                                            value={data.highlight}
                                            onChange={(e) => setData('highlight', e.target.value)}
                                        />
                                        <InputError message={errors.short_description} className="mt-2" />
                                    </div>
                                    <div className="col-span-2">
                                        <InputLabel htmlFor="short_description" value="Short Description" />
                                        <TextArea
                                            id="short_description"
                                            name="short_description"
                                            className="mt-1 block w-full h-40"
                                            col="4" row="6"
                                            value={data.short_description}
                                            onChange={(e) => setData('short_description', e.target.value)}
                                        />
                                        <InputError message={errors.short_description} className="mt-2" />
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