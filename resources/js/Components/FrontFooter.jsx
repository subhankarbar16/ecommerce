import FeatherIcon from 'feather-icons-react';
import { Link, usePage } from '@inertiajs/react';
export default function FrontFooter() {
    const { configuration } = usePage().props
    let site_configuration = configuration.site;
    let categories=configuration.categories;
    let social_links=configuration.social_links;
    return (<footer className="footer bg-dark-footer relative text-gray-200 dark:text-gray-200">
        <div className="container relative">
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <div className="py-[60px] px-0">
                        <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                            <div className="lg:col-span-3 md:col-span-12">
                                <a href="#" className="text-[22px] focus:outline-none">
                                    <img src={`/images/brands/${site_configuration.site_logo}`} alt="" />
                                </a>
                                <p className="mt-6 text-gray-300">{site_configuration.footer_short_desc}</p>
                                <ul className="list-none mt-6">
                                {social_links.map((item,index)=>(
                                    <li className="inline"><Link href={item.link} target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-orange-500 dark:hover:text-orange-500 text-slate-300"><FeatherIcon icon={item.icon} className="h-4 w-4 align-middle" title={item.icon} /></Link></li>
                                ))}
                                    <li className="inline"><a href={`mailto:${site_configuration.support_email}`} className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-orange-500 dark:hover:text-orange-500 text-slate-300"><FeatherIcon icon="mail" className="h-4 w-4 align-middle" title="email" /></a></li>
                                </ul>
                            </div>

                            <div className="lg:col-span-6 md:col-span-12">
                                <h5 className="tracking-[1px] text-gray-100 font-semibold">Categories</h5>

                                <div className="grid md:grid-cols-12 grid-cols-1">
                                {categories.map((item,index) => (
                                    <div className="md:col-span-4">
                                        <ul className="list-none footer-list mt-6">
                                        { item.incl_footer==1 ? 
                                            <li><Link href={route('shop',item.category_name.toLowerCase().replace(/\s+/g, '-'))} className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> {item.category_name}</Link></li> : ''
                                        }
                                        {item.children.map((child,index) => (
                                            child.incl_footer==1 ?
                                            <li><Link href={route('shop',child.category_name.toLowerCase().replace(/\s+/g, '-'))} className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> {child.category_name}</Link></li> : ''
                                        ))}  
                                        </ul>
                                    </div>
                                ))}

                                    {/* <div className="md:col-span-4">
                                        <ul className="list-none footer-list mt-6">
                                            <li><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Shorts </a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Suits Swimwear </a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> T-shirts </a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Tracksuits </a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Trousers</a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Shirts</a></li>
                                        </ul>
                                    </div> */}

                                    {/* <div className="md:col-span-4">
                                        <ul className="list-none footer-list mt-6">
                                            <li><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> My account </a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Order History </a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Wish List </a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Newsletter</a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Affiliate</a></li>
                                            <li className="mt-[10px]"><a href="" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right" /> Returns</a></li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1">
                <div className="py-[30px] px-0 border-t border-slate-800">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2">
                        <div className="flex items-center lg:justify-center">
                            <i className="mdi mdi-truck-check-outline align-middle text-lg mb-0 me-2" />
                            <h6 className="mb-0 font-medium">Free delivery</h6>
                        </div>

                        <div className="flex items-center lg:justify-center">
                            <i className="mdi mdi-archive align-middle text-lg mb-0 me-2" />
                            <h6 className="mb-0 font-medium">Non-contact shipping</h6>
                        </div>

                        <div className="flex items-center lg:justify-center">
                            <i className="mdi mdi-cash-multiple align-middle text-lg mb-0 me-2" />
                            <h6 className="mb-0 font-medium">Money-back quarantee</h6>
                        </div>

                        <div className="flex items-center lg:justify-center">
                            <i className="mdi mdi-shield-check align-middle text-lg mb-0 me-2" />
                            <h6 className="mb-0 font-medium">Secure payments</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="py-[30px] px-0 border-t border-slate-800">
            <div className="container relative text-center">
                <div className="grid md:grid-cols-2 items-center">
                    <div className="md:text-start text-center">
                        <p className="mb-0">{site_configuration.footer_copyright}</p>
                    </div>

                    <ul className="list-none md:text-end text-center mt-6 md:mt-0">
                        <li className="inline"><a href=""><img src="/assets/images/payments/american-express.jpg" className="max-h-6 rounded inline" title="American Express" alt="" /></a></li>
                        <li className="inline"><a href=""><img src="/assets/images/payments/discover.jpg" className="max-h-6 rounded inline" title="Discover" alt="" /></a></li>
                        <li className="inline"><a href=""><img src="/assets/images/payments/mastercard.jpg" className="max-h-6 rounded inline" title="Master Card" alt="" /></a></li>
                        <li className="inline"><a href=""><img src="/assets/images/payments/paypal.jpg" className="max-h-6 rounded inline" title="Paypal" alt="" /></a></li>
                        <li className="inline"><a href=""><img src="/assets/images/payments/visa.jpg" className="max-h-6 rounded inline" title="Visa" alt="" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>);
}