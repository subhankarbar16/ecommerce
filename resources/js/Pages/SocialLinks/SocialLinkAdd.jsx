import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function LocationAdd({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        link: '',
        icon : '',
    });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('social_links.add'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Social Links (Add)</h2>}
        >
            <Head title="Social Links" />
           
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
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
                                        <InputLabel htmlFor="link" value="Link" />
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
                                        <InputLabel htmlFor="icon" value="Icon" />
                                        <TextInput
                                            id="icon"
                                            type="text"
                                            name="icon"
                                            value={data.icon}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('icon', e.target.value)}
                                        />
                                        <InputError message={errors.icon} className="mt-2" />
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