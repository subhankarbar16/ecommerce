
import React, {useEffect,useState} from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, usePage} from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
export default function ProductList({ auth, products,keyword }) {
    const [prod,setProd]=useState(products);
   const [key,setKey]=useState(keyword);
   const { configuration } = usePage().props
    let site_configuration = configuration.site;
    function search(e){
            let k=e.target.value;
            setKey(k);
            fetch(route('products.search',k), {
              method: "GET",
              headers: {
                "search":"search",
              }
            })
              .then((response) => response.json())
              .then((data) => {
                
                setProd(data);
              })
              .catch((error) => console.log(error));
          
    }
    useEffect(() => {
        console.log('useEffect');
},[prod]);
    
    let heads = ['ID','Name','SKU','Image','Category','MRP','Price','Stock','Status', 'Action']; 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products <Link className="float-right text-base" href={route('products.create')}><PrimaryButton>Create</PrimaryButton></Link> <TextInput id="product_name" isFocused={true} type="text" value={key} name="product_name" className="w-60 float-right block mr-4 h-8"
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
                                        {prod.data.map((product,index) => (
                                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{product.id}</td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.product_name}</th>
                                                <td className="px-6 py-4">{product.product_sku}</td>
                                                <td className="px-6 py-4"><img className="w-20" src={`/images/products/${product.product_image}`} /></td>
                                                <td className="px-6 py-4">{product.parent.category_name}</td>
                                                <td className="px-6 py-4">{site_configuration.default_currency+product.product_mrp}</td>
                                                <td className="px-6 py-4">{site_configuration.default_currency+product.product_price}</td>
                                                <td className="px-6 py-4">{product.product_stock}</td>
                                                <td className="px-6 py-4">
                                                {product.status ? <font className="text-green-600">Active</font> : <font className="text-red-600">Inactive</font>}
                                                </td>
                                                <td className="px-6 py-4">
                                                   <Link href={`/admin/products/edit/${product.id}`}>Edit</Link> | <Link href={`/admin/products/activate/${product.id}`}>{product.status ? <font className="text-red-900">Deactivate</font> : <font className="text-green-900">Activate</font>}</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination class="mt-6" links={products.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}