import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm,usePage,Link } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import {useEffect} from 'react';

export default function ProductAdd({ auth, categories,product,product_units }) {
    console.log(product);
    const { configuration } = usePage().props
    let site_configuration = configuration.site;
    const { data, setData, post, processing, errors, reset } = useForm({
        id:product.id,
        product_name: product.product_name,
        category_id: product.category_id,
        product_image: '',
        is_featured:product.is_featured ? true : false,
        // product_sku: '',
        // product_stock: 0,
        product_description:product.product_description ? product.product_description : '',
        product_unit:product.children[0].product_unit_id,
        product_unit_text:product.children[0].unit.unit_name,
        product_variants:product.children,
    });

    const changeVariant = (e)=>{
        // console.log(1)
        e.preventDefault();
        var p = e.target.parentNode.parentNode.parentElement;
        var c=e.target.parentNode.parentNode;
        var index = Array.prototype.indexOf.call(p.children, c);
        var name=e.target.getAttribute('name').replace(index,'');
        const d=data.product_variants;
        
        d[index][name]=e.target.value;
       // debugger;
        setData('product_variants',d);
    }

    const removeVariant = (e)=>{
        e.preventDefault();
        var p = e.target.parentNode.parentNode.parentElement;
        var c=e.target.parentNode.parentNode;
        var index = Array.prototype.indexOf.call(p.children, c);
        //console.log(index);
        //debugger;
        var d=data.product_variants;
        d.splice(index, 1);
        
        setData('product_variants',d);
    };

    const addVariant = (e)=>{
        e.preventDefault();
        setData('product_variants',[...data.product_variants,{
            quantity:'',
            sku:'',
            price:'',
            mrp:'',
            stock:'',
            status:0,

        }]);
    };
   
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('products.update',product.id));
    };
    let heads = ['Quantity','Unit','SKU','MRP ('+site_configuration.default_currency+')','Price ('+site_configuration.default_currency+')','Stock','Status', 'Action']; 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products (Edit : <img className="inline w-10" src={`/images/products/${product.product_image}`} /> {product.product_name} )</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div className="grid grid-cols-2 gap-4">
                                    <div >
                                        <InputLabel htmlFor="product_name" value="Product Name" />
                                        <TextInput
                                            id="product_name"
                                            type="text"
                                            name="product_name"
                                            value={data.product_name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('product_name', e.target.value)}
                                        />
                                        <InputError message={errors.product_name} className="mt-2" />
                                    </div>
                                    {/* <div >
                                        <InputLabel htmlFor="product_price" value={`Product Price (${site_configuration.default_currency})`} />
                                        <TextInput
                                            id="product_price"
                                            type="text"
                                            name="product_price"
                                            value={data.product_price}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('product_price', e.target.value)}
                                        />
                                        <InputError message={errors.product_price} className="mt-2" />
                                    </div> */}
                                    <div >
                                        <InputLabel htmlFor="category_id" value="Product Category" />
                                        <SelectInput
                                            id="category_id"
                                            options={categories}
                                            selected={data.category_id}
                                            namecol="category_name"
                                            valuecol="id"
                                            placeholder="Select Product Category"
                                            name="category_id"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('category_id', e.target[e.target.selectedIndex].value)}
                                        />
                                        <InputError message={errors.category_id} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="product_unit" value="Product Unit" />
                                        <SelectInput
                                            id="product_unit"
                                            options={product_units}
                                            selected={data.product_unit}
                                            namecol="unit_name"
                                            valuecol="id"
                                            placeholder="Select Product Unit"
                                            name="product_unit"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData((prev)=>{
                                                return {...prev,'product_unit':e.target[e.target.selectedIndex].value,'product_unit_text':e.target[e.target.selectedIndex].text}
                                            
                                            })}
                                        />
                                        <InputError message={errors.product_unit} className="mt-2" />
                                    </div>
                                    {/* <div >
                                        <InputLabel htmlFor="product_mrp" value={`Product MRP (${site_configuration.default_currency})`} />
                                        <TextInput
                                            id="product_mrp"
                                            type="text"
                                            name="product_mrp"
                                            value={data.product_mrp}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('product_mrp', e.target.value)}
                                        />
                                        <InputError message={errors.product_mrp} className="mt-2" />
                                    </div> */}
                                    
                                    <div >
                                        <InputLabel htmlFor="product_image" value="Product Image" />
                                        <TextInput
                                            id="product_image"
                                            type="file"
                                            name="product_image"
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('product_image', e.target.files[0])}
                                        />
                                        <InputError message={errors.product_image} className="mt-2" />
                                    </div>
                                    
                                    {/* <div >
                                        <InputLabel htmlFor="product_sku" value="Product SKU" />
                                        <TextInput
                                            id="product_sku"
                                            type="text"
                                            name="product_sku"
                                            value={data.product_sku}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('product_sku', e.target.value)}
                                        />
                                        <InputError message={errors.product_sku} className="mt-2" />
                                    </div> */}
                                    
                                    <div >
                                        <InputLabel htmlFor="product_description" value="Product Description" />
                                        <TextArea
                                            id="product_description"
                                            name="product_description"
                                            className="mt-1 block w-full h-40"
                                            col="4" row="6"
                                            value={data.product_description}
                                            onChange={(e) => setData('product_description', e.target.value)}
                                        />
                                        <InputError message={errors.product_description} className="mt-2" />
                                    </div>
                                    
                                    <div >
                                    <div className="grid grid-cols-1 mt-8">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="is_featured"
                                                checked={data.is_featured}
                                                onChange={(e) => setData('is_featured', e.target.checked)}
                                            />
                                            <span className="ms-2 text-sm text-gray-600">Is featured Collection ?</span>
                                        </label>
                                       
                                       
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                {heads.map((head,index) => (
                                                    <th key={`key${index}`} scope="col" className="px-6 py-3">{head}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {data.product_variants.map((variant,index) => (  
                                               <tr key={`var${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                               <td className="px-2 py-2">
                                               <TextInput id={`quantity${index}`} type="text" name={`quantity${index}`} className="mt-1 block" isFocused={true} style={{width:'100%'}} value={data.product_variants[index].quantity}
                                               onChange={changeVariant}
                                               />
                                               <InputError message={errors[`product_variants.${index}.quantity`]} className="mt-2" />
                                               </td>

                                               <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.product_unit_text}</th>

                                               <td className="px-6 py-4"> 
                                               <TextInput id={`sku${index}`} type="text" name={`sku${index}`} className="mt-1 block" isFocused={true} style={{width:'100%'}} value={data.product_variants[index].sku} 
                                                onChange={changeVariant}
                                               />
                                               <InputError message={errors[`product_variants.${index}.sku`]} className="mt-2" />
                                               </td>

                                               <td className="px-6 py-4"><TextInput id={`mrp${index}`} type="text" name={`mrp${index}`} className="mt-1 block" isFocused={true} style={{width:'100%'}} value={data.product_variants[index].mrp} 
                                                onChange={changeVariant}
                                               />
                                               <InputError message={errors[`product_variants.${index}.mrp`]} className="mt-2" />
                                               </td>

                                               <td className="px-6 py-4"><TextInput id={`price${index}`} type="text" name={`price${index}`} className="mt-1 block" isFocused={true} style={{width:'100%'}} value={data.product_variants[index].price} 
                                                onChange={changeVariant}/>
                                                <InputError message={errors[`product_variants.${index}.price`]} className="mt-2" />
                                                </td>

                                               <td className="px-6 py-4"><TextInput id={`stock${index}`} type="text" name={`stock${index}`} className="mt-1 block" isFocused={true} style={{width:'100%'}} value={data.product_variants[index].stock} 
                                                onChange={changeVariant}
                                               />
                                               <InputError message={errors[`product_variants.${index}.stock`]} className="mt-2" />
                                               </td>

                                               <td className="px-6 py-4">
                                               <SelectInput
                                       id={`status${index}`}
                                       options={[{'value':'0','name':'Inactive'},{'value':'1','name':'Active'}]}
                                       selected={data.product_variants[index].status}
                                       namecol="name"
                                       valuecol="value"
                                       placeholder="Select Status"
                                       name={`status${index}`}
                                       className="mt-1 block w-full" style={{width:'100%'}}
                                       value={data.product_variants[index].status}
                                       onChange={changeVariant}
                                   />
                                               </td>
                                               <td className="px-6 py-4">{index == 0 ? <Link onClick={addVariant}>Add</Link> : <Link onClick={removeVariant}>Remove</Link>}</td>
                                           </tr>
                                                ))}
                                        </tbody>
                                    </table>
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