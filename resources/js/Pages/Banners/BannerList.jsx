
import React, {useEffect,useState} from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
export default function ProductList({ auth, banners,keyword }) {
    const [ban,setBan]=useState(banners);
   const [key,setKey]=useState(keyword);
    function search(e){
            let k=e.target.value;
            setKey(k);
            fetch(route('banners.search',k), {
              method: "GET",
              headers: {
                "search":"search",
              }
            })
              .then((response) => response.json())
              .then((data) => {
                
                setBan(data);
              })
              .catch((error) => console.log(error));
          
    }
    useEffect(() => {
        console.log('useEffect');
},[ban]);
    
    let heads = ['ID','Title','Image','Highlight','Short Description','URL','Display Order','Status', 'Action']; 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Banners <Link className="float-right text-base" href={route('banners.create')}><PrimaryButton>Create</PrimaryButton></Link> <TextInput id="banner" isFocused={true} type="text" value={key} name="banner" className="w-60 float-right block mr-4 h-8"
            onChange={(e) => search(e)}
        /> </h2>}
        >
            <Head title="Banners" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            {heads.map((head,index) => (
                                                <th key={`key${index}`} scope="col" className="px-6 py-3">{head}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ban.data.map((banner,index) => (
                                            <tr key={banner.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{banner.id}</td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{banner.title}</th>
                                                <td className="px-6 py-4"><img className="w-20" src={`/images/banners/${banner.banner_image}`} /></td>
                                                <td className="px-6 py-4">{banner.highlight}</td>
                                                <td className="px-6 py-4">{banner.short_description}</td>
                                                <td className="px-6 py-4"><a target="_blank" href={banner.link}>{banner.link}</a></td>
                                                <td className="px-6 py-4">{banner.sorting_order}</td>
                                                <td className="px-6 py-4">
                                                {banner.status ? <font className="text-green-600">Active</font> : <font className="text-red-600">Inactive</font>}
                                                </td>
                                                <td className="px-6 py-4">
                                                   <Link href={`/admin/banners/edit/${banner.id}`}>Edit</Link> | <Link href={`/admin/banners/activate/${banner.id}`}>{banner.status ? <font className="text-red-900">Deactivate</font> : <font className="text-green-900">Activate</font>}</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination class="mt-6" links={ban.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}