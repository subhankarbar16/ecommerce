import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function SiteSettings({ auth, sitesettings }) {
    //console.log(sitesettings);
    const { data, setData, post, processing, errors, reset } = useForm({
        site_name: sitesettings.site_name,
        support_email: sitesettings.support_email,
        support_phone: sitesettings.support_phone,
        meta_keyword: sitesettings.meta_keyword,
        meta_description: sitesettings.meta_description,
        default_currency:sitesettings.default_currency,
        footer_copyright:sitesettings.footer_copyright,
        footer_short_desc:sitesettings.footer_short_desc,
    });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('sitesettings.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Site Settings</h2>}
        >
            <Head title="Site Settings" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div className="grid grid-cols-2 gap-4">
                                    <div >
                                        <InputLabel htmlFor="site_name" value="Site Name" />
                                        <TextInput
                                            id="sitename"
                                            type="text"
                                            name="site_name"
                                            value={data.site_name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('site_name', e.target.value)}
                                        />
                                        <InputError message={errors.site_name} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="site_logo" value="Site Logo" />
                                        <TextInput
                                            id="site_logo"
                                            type="file"
                                            name="site_logo"
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('site_logo', e.target.files[0])}
                                        />
                                        <InputError message={errors.site_logo} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="support_email" value="Support Email" />
                                        <TextInput
                                            id="support_email"
                                            type="email"
                                            name="support_email"
                                            value={data.support_email}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('support_email', e.target.value)}
                                        />
                                        <InputError message={errors.support_email} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="favicon" value="Favicon" />
                                        <TextInput
                                            id="favicon"
                                            type="file"
                                            name="favicon"
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('favicon', e.target.files[0])}
                                        />
                                        <InputError message={errors.favicon} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="support_phone" value="Support Phone" />
                                        <TextInput
                                            id="support_phone"
                                            type="text"
                                            name="support_phone"
                                            value={data.support_phone}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('support_phone', e.target.value)}
                                        />
                                        <InputError message={errors.support_phone} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="default_currency" value="Default Currency" />
                                        <TextInput
                                            id="default_currency"
                                            type="text"
                                            name="default_currency"
                                            value={data.default_currency}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('default_currency', e.target.value)}
                                        />
                                        <InputError message={errors.default_currency} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="footer_copyright" value="Footer Copyright Text" />
                                        <TextInput
                                            id="footer_copyright"
                                            type="text"
                                            name="footer_copyright"
                                            value={data.footer_copyright}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('footer_copyright', e.target.value)}
                                        />
                                        <InputError message={errors.footer_copyright} className="mt-2" />
                                    </div>

                                    <div >
                                        <InputLabel htmlFor="meta_keyword" value="Meta Keyword" />
                                        <TextInput
                                            id="meta_keyword"
                                            type="text"
                                            name="meta_keyword"
                                            value={data.meta_keyword}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('meta_keyword', e.target.value)}
                                        />
                                        <InputError message={errors.meta_keyword} className="mt-2" />
                                    </div>
                                    <div className="col-span-2">
                                        <InputLabel htmlFor="footer_short_desc" value="Footer Short Description" />
                                        <TextArea
                                            id="footer_short_desc"
                                            name="footer_short_desc"
                                            className="mt-1 block w-full h-40"
                                            col="4" row="6"
                                            value={data.footer_short_desc}
                                            onChange={(e) => setData('footer_short_desc', e.target.value)}
                                        />
                                        <InputError message={errors.footer_short_desc} className="mt-2" />
                                    </div>
                                    <div className="col-span-2">
                                        <InputLabel htmlFor="meta_description" value="Meta Description" />
                                        <TextArea
                                            id="meta_description"
                                            name="meta_description"
                                            className="mt-1 block w-full h-40"
                                            col="4" row="6"
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                        />
                                        <InputError message={errors.meta_description} className="mt-2" />
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