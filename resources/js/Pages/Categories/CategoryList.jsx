import React, {useEffect,useState} from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';

let heads = ['ID','Category Name', 'Category Image','Parent Category', 'Status', 'Action'];
export default function CategoryList({ auth, categories,keyword }) {
    const [cat,setCat]=useState(categories);
   const [key,setKey]=useState(keyword);
    function search(e){
            let k=e.target.value;
            setKey(k);
            fetch(route('categories.search',k), {
              method: "GET",
              headers: {
                "search":"search",
              }
            })
              .then((response) => response.json())
              .then((data) => {
                
                setCat(data);
              })
              .catch((error) => console.log(error));
          
    }
    useEffect(() => {
        console.log('useEffect');
},[cat]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories <Link className="float-right text-base" href={route('categories.create')}><PrimaryButton>Create</PrimaryButton></Link> <TextInput id="category_name" isFocused={true} type="text" value={key} name="category_name" className="w-60 float-right block mr-4 h-8"
            onChange={(e) => search(e)}
        /> </h2>}
        >
            <Head title="Categories" />
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
                                        {cat.data.map((category) => (
                                            <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{category.id}</td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.category_name}</th>
                                                <td className="px-6 py-4"><img className="w-20" src={`/images/categories/${category.category_image}`} /></td>
                                                <td className="px-6 py-4">{category.parent ? category.parent.category_name : 'N/A'}</td>
                                                
                                                <td className="px-6 py-4">
                                                {category.status ? <font className="text-green-600">Active</font> : <font className="text-red-600">Inactive</font>}
                                                </td>
                                                <td className="px-6 py-4">
                                                   <Link href={`/admin/categories/edit/${category.id}`}>Edit</Link> | <Link href={`/admin/categories/activate/${category.id}`}>{category.status ? <font className="text-red-900">Deactivate</font> : <font className="text-green-900">Activate</font>}</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination class="mt-6" links={cat.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}