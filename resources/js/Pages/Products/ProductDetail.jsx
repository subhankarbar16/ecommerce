import FrontGuestLayout from "@/Layouts/FrontGuestLayout";
import ProductGridListing from '@/Components/ProductGridListing';
import SectionHead from '@/Components/SectionHead';
import { usePage,Link } from '@inertiajs/react';
export default function ProductDetail({ product, new_arrivals }) {
    const { configuration } = usePage().props
    let site_configuration = configuration.site;
    console.log(product);
    return (
        <FrontGuestLayout head="Products" main_section="Product" main_section_url={route('shop')} current_page_name="Product Detail">
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
                        <div className="lg:col-span-5">
                            <div className="tiny-single-item">
                                <div className="tiny-slide">
                                    <div className="m-0.5">
                                        <img src={`/images/products/${product.parent.product_image}`} className="shadow dark:shadow-gray-700" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <h5 className="text-2xl font-semibold">{product.parent.product_name}</h5>
                            <div className="mt-2">
                                <span className="text-slate-400 font-semibold me-1">{site_configuration.default_currency + product.price} <del className="text-red-600">{site_configuration.default_currency + product.mrp}</del></span>
                            </div>

                            <div className="mt-4">
                                <h5 className="text-lg font-semibold">Overview :</h5>
                                <p className="text-slate-400 mt-2">{product.parent.product_description}</p>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4">
                                <div className="flex items-center">
                                    <h5 className="text-lg font-semibold me-2">Size:</h5>
                                    <div className="space-x-1">
                                    {product.parent.children.map((child,index) => (
                                        child.sku === product.sku ?
                                        <div key={index} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center bg-orange-500 text-orange-500 text-white">{eval(child.quantity)+' '+child.unit.unit_name}</div> :
                                        <Link key={index} href={route('products.detail',[product.parent.product_name.toLowerCase().replace(/\s+/g, '-'),child.sku.toLowerCase()])} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white">{eval(child.quantity)+' '+child.unit.unit_name}</Link> 
                                        ))}
                                        {/* <a href="" className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white">M</a>
                                        <a href="" className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white">L</a>
                                        <a href="" className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white">XL</a> */}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <h5 className="text-lg font-semibold me-2">Quantity:</h5>
                                    <div className="qty-icons ms-3 space-x-0.5">
                                        <button onClick={(ev) => { ev.target.parentNode.querySelector('input[type=number]').stepDown() }} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white minus">-</button>
                                        <input min="0" name="quantity" defaultValue="0" type="number" className="h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white pointer-events-none w-16 ps-4 quantity" />
                                        <button onClick={(ev) => { ev.target.parentNode.querySelector('input[type=number]').stepUp() }} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white plus">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 space-x-1">
                                <a href="" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center bg-orange-500 text-white rounded-md mt-2">Shop Now</a>
                                <a href="" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white mt-2">Add to Cart</a>
                            </div>
                        </div>




                    </div>
                </div>
                <div className="container lg:mt-24 mt-16">
                    <SectionHead className="grid grid-cols-1 justify-center text-center mb-6" title="New Arrival Products" short_desc="Shop the latest products from the most popular collections" />
                    <ProductGridListing className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pt-6 gap-6" data={new_arrivals} />
                </div>
            </section>
        </FrontGuestLayout>
    )
}