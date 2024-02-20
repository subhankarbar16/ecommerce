
import React, {useEffect,useState} from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
export default function UserList({ auth, users,keyword }) {
    console.log(users);
    const [usr,setUsr]=useState(users);
   const [key,setKey]=useState(keyword);
    function search(e){
            let k=e.target.value;
            setKey(k);
            fetch(route('users.search',k), {
              method: "GET",
              headers: {
                "search":"search",
              }
            })
              .then((response) => response.json())
              .then((data) => {
                
                setUsr(data);
              })
              .catch((error) => console.log(error));
          
    }
    useEffect(() => {
        console.log('useEffect');
},[usr]);
    
    let heads = ['ID','Name','Image','email','phone','Status', 'Action']; 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users <Link className="float-right text-base" href={route('users.create')}><PrimaryButton>Create</PrimaryButton></Link> <TextInput id="user" isFocused={true} type="text" value={key} name="user" className="w-60 float-right block mr-4 h-8"
            onChange={(e) => search(e)}
        /> </h2>}
        >
            <Head title="Products" />
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
                                        {usr.data.map((user,index) => (
                                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{user.id}</td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.first_name + ' '+ user.last_name}</th>
                                                <td className="px-6 py-4"><img className="w-20" src={`/images/users/${user.user_image ? user.user_image : 'blank-profile-picture.webp'}`} /></td>
                                                <td className="px-6 py-4">{user.email}</td>
                                                <td className="px-6 py-4">{user.phone}</td>
                                                <td className="px-6 py-4">
                                                {user.status ? <font className="text-green-600">Active</font> : <font className="text-red-600">Inactive</font>}
                                                </td>
                                                <td className="px-6 py-4">
                                                   <Link href={`/admin/users/edit/${user.id}`}>Edit</Link> | <Link href={`/admin/users/activate/${user.id}`}>{user.status ? <font className="text-red-900">Deactivate</font> : <font className="text-green-900">Activate</font>}</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination class="mt-6" links={users.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}