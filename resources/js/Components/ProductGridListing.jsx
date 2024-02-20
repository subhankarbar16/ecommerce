import FeatherIcon from 'feather-icons-react';
import { Link, usePage } from '@inertiajs/react';
export default function ProductGridListing({data=[], ...props }) {
    const { configuration } = usePage().props
    let site_configuration = configuration.site;
    return (
        <div{...props} >
        {data.map((item,index) => (
            <div className="group" key={item.product_id}>
                <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                    <img src={`/images/products/${item.parent.product_image}`} className="group-hover:scale-110 duration-500" alt="" />

                    <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                        <a href="" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                    </div>

                    <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                        <li><a href=" " className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><FeatherIcon icon="heart" className="size-4" /></a></li>
                        <li className="mt-1"><Link href={route('products.detail',[item.parent.product_name.toLowerCase().replace(/\s+/g, '-'),item.sku.toLowerCase()])} className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><FeatherIcon icon="eye" className="size-4" /></Link></li>
                        <li className="mt-1"><a href=" " className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><FeatherIcon icon="bookmark" className="size-4" /></a></li>
                    </ul>

                    <ul className="list-none absolute top-[10px] start-4">
                        <li><a href=" " className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">{(((item.mrp-item.price)*100)/item.mrp).toFixed(2)}% Off</a></li>
                    </ul>
                </div>

                <div className="mt-4">
                    <Link href={route('products.detail',[item.parent.product_name.toLowerCase().replace(/\s+/g, '-'),item.sku.toLowerCase()])} className="hover:text-orange-500 text-lg font-medium">{item.parent.product_name}</Link>
                    <div className="flex justify-between items-center mt-1">
                        <p>{site_configuration.default_currency+eval(item.price)} per {eval(item.quantity)+' '+item.unit.unit_name} <del className="text-slate-400">${site_configuration.default_currency+eval(item.mrp)}</del></p>
                    </div>
                </div>
            </div>
             ))}
        </div>
    )
}