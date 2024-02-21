import React, { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';

let heads = ['ID', 'Unit Name','Status', 'Action'];
export default function UnitList({ auth, units, keyword }) {
    const [un, setUn] = useState(units);
    const [key, setKey] = useState(keyword);
    function search(e) {
        let k = e.target.value;
        setKey(k);
        window.history.replaceState(null, "", route('productunits.search', k));
        fetch(route('productunits.search', k), {
            method: "GET",
            headers: {
                "search": "search",
            }
        })
            .then((response) => response.json())
            .then((data) => {

                setUn(data);
            })
            .catch((error) => console.log(error));

    }
    useEffect(() => {
        console.log('useEffect');
    }, [un]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product Units <Link className="float-right text-base" href={route('productunits.create')}><PrimaryButton>Create</PrimaryButton></Link> <TextInput id="unit_name" isFocused={true} type="text" value={key} name="unit_name" className="w-60 float-right block mr-4 h-8"
                onChange={(e) => search(e)}
            /> </h2>}
        >
            <Head title="Product Units" />
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
                                        {un.data.map((unit) => (
                                            <tr key={unit.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{unit.id}</td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{unit.unit_name}</th>
                                                <td className="px-6 py-4">
                                                    {unit.status ? <font className="text-green-600">Active</font> : <font className="text-red-600">Inactive</font>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={route('productunits.edit',unit.id)}>Edit</Link> | <Link href={route('productunits.activate',unit.id)}>{unit.status ? <font className="text-red-900">Deactivate</font> : <font className="text-green-900">Activate</font>}</Link> | <Link href={route('productunits.delete',unit.id)}>Delete</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination class="mt-6" links={un.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}