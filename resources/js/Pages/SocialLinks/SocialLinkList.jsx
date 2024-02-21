import React, { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';

let heads = ['ID', 'Title', 'URL', 'Icon','Status', 'Action'];
export default function SocialLinkList({ auth, links, keyword }) {
    const [lnk, setLnk] = useState(links);
    const [key, setKey] = useState(keyword);
    function search(e) {
        let k = e.target.value;
        setKey(k);
        window.history.replaceState(null, "", route('social_links.search', k));
        fetch(route('social_links.search', k), {
            method: "GET",
            headers: {
                "search": "search",
            }
        })
            .then((response) => response.json())
            .then((data) => {

                setLnk(data);
            })
            .catch((error) => console.log(error));

    }
    useEffect(() => {
        console.log('useEffect');
    }, [lnk]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Social Links <Link className="float-right text-base" href={route('social_links.create')}><PrimaryButton>Create</PrimaryButton></Link> <TextInput id="link" isFocused={true} type="text" value={key} name="link" className="w-60 float-right block mr-4 h-8"
                onChange={(e) => search(e)}
            /> </h2>}
        >
            <Head title="Locations" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            {heads.map((head, index) => (
                                                <th key={`key${index}`} scope="col" className="px-2 py-3">{head}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lnk.data.map((l) => (
                                            <tr key={l.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-2 py-4">{l.id}</td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{l.title}</th>
                                                <td className="px-2 py-4">{l.link}</td>
                                                <td className="px-2 py-4">{l.icon}</td>
                                               
                                                <td className="px-2 py-4">
                                                    {l.status ? <font className="text-green-600">Active</font> : <font className="text-red-600">Inactive</font>}
                                                </td>
                                                <td className="px-2 py-4">
                                                    <Link href={route('social_links.edit',l.id)}>Edit</Link> | <Link href={route('social_links.activate',l.id)}>{l.status ? <font className="text-red-900">Deactivate</font> : <font className="text-green-900">Activate</font>}</Link> | <Link href={route('social_links.delete',l.id)}>Delete</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination class="mt-6" links={lnk.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}