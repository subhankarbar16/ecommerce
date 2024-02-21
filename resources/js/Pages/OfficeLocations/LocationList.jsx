import React, { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';

let heads = ['ID', 'Street', 'City', 'State','Zipcode','Country','Phone','Status', 'Action'];
export default function LocationList({ auth, locations, keyword }) {
    const [loc, setLoc] = useState(locations);
    const [key, setKey] = useState(keyword);
    function search(e) {
        let k = e.target.value;
        setKey(k);
        window.history.replaceState(null, "", route('officelocations.search', k));
        fetch(route('officelocations.search', k), {
            method: "GET",
            headers: {
                "search": "search",
            }
        })
            .then((response) => response.json())
            .then((data) => {

                setLoc(data);
            })
            .catch((error) => console.log(error));

    }
    useEffect(() => {
        console.log('useEffect');
    }, [loc]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Locations <Link className="float-right text-base" href={route('officelocations.create')}><PrimaryButton>Create</PrimaryButton></Link> <TextInput id="office" isFocused={true} type="text" value={key} name="office" className="w-60 float-right block mr-4 h-8"
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
                                        {loc.data.map((location) => (
                                            <tr key={location.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-2 py-4">{location.id}</td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{location.street}</th>
                                                <td className="px-2 py-4">{location.city}</td>
                                                <td className="px-2 py-4">{location.state}</td>
                                                <td className="px-2 py-4">{location.zipcode}</td>
                                                <td className="px-2 py-4">{location.parent.country_nicename}</td>
                                                <td className="px-2 py-4">{'+'+location.parent.country_phonecode+' '+location.phone}</td>
                                                <td className="px-2 py-4">
                                                    {location.status ? <font className="text-green-600">Active</font> : <font className="text-red-600">Inactive</font>}
                                                </td>
                                                <td className="px-2 py-4">
                                                    <Link href={route('officelocations.edit',location.id)}>Edit</Link> | <Link href={route('officelocations.activate',location.id)}>{location.status ? <font className="text-red-900">Deactivate</font> : <font className="text-green-900">Activate</font>}</Link> | <Link href={route('officelocations.delete',location.id)}>Delete</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination class="mt-6" links={loc.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}