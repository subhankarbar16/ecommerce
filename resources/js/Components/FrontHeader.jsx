import FeatherIcon from 'feather-icons-react';
import { Link, usePage, Head } from '@inertiajs/react';
export default function FrontHeader({pageTitle}) {
    const { configuration } = usePage().props
    let site_configuration = configuration.site;
    let categories=configuration.categories;
   // console.log(categories);
    function windowScroll(){
        const navbar = document.getElementById("topnav");
        if (navbar != null) {
            if (
                document.body.scrollTop >= 50 ||
                document.documentElement.scrollTop >= 50
            ) {
                navbar.classList.add("nav-sticky");
            } else {
                navbar.classList.remove("nav-sticky");
            }
        }
    }

    function dismissDropdownMenu() {
        document.querySelectorAll(".dropdown-menu").forEach(function (item) {
            item.classList.remove("block")
            item.classList.add("hidden")
        });
        document.querySelectorAll(".dropdown-toggle").forEach(function (item) {
            item.classList.remove("block")
        });
      }

    document.querySelectorAll(".dropdown").forEach(function (item) {
        item.querySelectorAll(".dropdown-toggle").forEach(function (subitem) {
            subitem.addEventListener("click", function (event) {
                subitem.classList.toggle("block");
                if (subitem.classList.contains("block") != true) {
                    item.querySelector(".dropdown-menu").classList.remove("block")
                    item.querySelector(".dropdown-menu").classList.add("hidden")
                } else {
                    dismissDropdownMenu()
                    item.querySelector(".dropdown-menu").classList.add("block")
                    item.querySelector(".dropdown-menu").classList.remove("hidden")
                    if (item.querySelector(".dropdown-menu").classList.contains("block")) {
                        subitem.classList.add("block")
                    } else {
                        subitem.classList.remove("block")
                    }
                    event.stopPropagation();
                }
            });
        });
      });
    
    window.addEventListener('scroll', (ev) => {
        ev.preventDefault();
        windowScroll();
    })

    window.addEventListener('click', function (e) {
        dismissDropdownMenu();
      });
    return (

        <nav id="topnav" className="defaultscroll is-sticky ">
            <Head title={`${site_configuration.site_name} :: ${pageTitle} `}  />
            <div className="container relative">
                <Link className="logo" href={route('home')}>
                    <div>
                        <img src={`/images/brands/${site_configuration.site_logo}`} className="h-40 inline-block dark:hidden" alt="" />
                        <img src={`/images/brands/${site_configuration.site_logo}`} className="h-40 hidden dark:inline-block" alt="" />
                    </div>
                </Link>

                <div className="menu-extras">
                    <div className="menu-item">
                        <a className="navbar-toggle" id="isToggle" >
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </a>
                    </div>
                </div>

                <ul className="buy-button list-none mb-0">
                    <li className="dropdown inline-block relative pe-1">
                        <button data-dropdown-toggle="dropdown" className="dropdown-toggle align-middle inline-flex" type="button" onClick={(e)=>e.stopPropagation()} >
                            <FeatherIcon icon="search" className="size-5" />
                        </button>

                        <div className="dropdown-menu absolute overflow-hidden end-0 m-0 mt-5 z-10 md:w-52 w-48 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 hidden"  >
                            <div className="relative">
                                <FeatherIcon icon="search" className="absolute size-4 top-[9px] end-3" />
                                <input type="text" className="h-9 px-3 pe-10 w-full border-0 focus:ring-0 outline-none" name="s" id="searchItem" placeholder="Search..." />
                            </div>
                        </div>
                    </li>

                    <li className="dropdown inline-block relative ps-0.5">
                        <button data-dropdown-toggle="dropdown" className="dropdown-toggle size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-orange-500 border border-orange-500 text-white" type="button" onClick={(e)=>e.stopPropagation()}>
                            <FeatherIcon icon="shopping-cart" className="h-4 w-4" />
                        </button>

                        <div className="dropdown-menu absolute end-0 m-0 mt-4 z-10 w-64 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 hidden"  >
                            <ul className="py-3 text-start" aria-labelledby="dropdownDefault">
                                <li>
                                    <a href="#" className="flex items-center justify-between py-1.5 px-4">
                                        <span className="flex items-center">
                                            <img src="/assets/images/shop/trendy-shirt.jpg" className="rounded shadow dark:shadow-gray-800 w-9" alt="" />
                                            <span className="ms-3">
                                                <span className="block font-semibold">T-shirt (M)</span>
                                                <span className="block text-sm text-slate-400">$320 X 2</span>
                                            </span>
                                        </span>

                                        <span className="font-semibold">$640</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="flex items-center justify-between py-1.5 px-4">
                                        <span className="flex items-center">
                                            <img src="/assets/images/shop/luxurious-bag2.jpg" className="rounded shadow dark:shadow-gray-800 w-9" alt="" />
                                            <span className="ms-3">
                                                <span className="block font-semibold">Bag</span>
                                                <span className="block text-sm text-slate-400">$50 X 5</span>
                                            </span>
                                        </span>

                                        <span className="font-semibold">$250</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="flex items-center justify-between py-1.5 px-4">
                                        <span className="flex items-center">
                                            <img src="/assets/images/shop/apple-smart-watch.jpg" className="rounded shadow dark:shadow-gray-800 w-9" alt="" />
                                            <span className="ms-3">
                                                <span className="block font-semibold">Watch (Men)</span>
                                                <span className="block text-sm text-slate-400">$800 X 1</span>
                                            </span>
                                        </span>

                                        <span className="font-semibold">$800</span>
                                    </a>
                                </li>

                                <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>

                                <li className="flex items-center justify-between py-1.5 px-4">
                                    <h6 className="font-semibold mb-0">Total($):</h6>
                                    <h6 className="font-semibold mb-0">$1690</h6>
                                </li>

                                <li className="py-1.5 px-4">
                                    <span className="text-center block">
                                        <a href=" " className="py-[5px] px-4 inline-block font-semibold tracking-wide align-middle duration-500 text-sm text-center rounded-md bg-orange-500 border border-orange-500 text-white">View Cart</a>
                                        <a href=" " className="py-[5px] px-4 inline-block font-semibold tracking-wide align-middle duration-500 text-sm text-center rounded-md bg-orange-500 border border-orange-500 text-white">Checkout</a>
                                    </span>
                                    <p className="text-sm text-slate-400 mt-1">*T&C Apply</p>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="inline-block ps-0.5">
                        <a href=" " className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-orange-500 text-white">
                            <FeatherIcon icon="heart" className='h-4 w-4' />
                        </a>
                    </li>

                    <li className="dropdown inline-block relative ps-0.5">
                        <button data-dropdown-toggle="dropdown" className="dropdown-toggle items-center" type="button" onClick={(e)=>e.stopPropagation()}>
                            <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-orange-500 bg-orange-500 text-white"><img src="/assets/images/client/16.jpg" className="rounded-full" alt="" /></span>
                        </button>

                        <div className="dropdown-menu absolute end-0 m-0 mt-4 z-10 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 hidden"  >
                            <ul className="py-2 text-start">
                                <li>
                                    <p className="text-slate-400 pt-2 px-4">Welcome Jesus!</p>
                                </li>
                                <li>
                                    <p className="flex items-center font-medium py-2 px-4"><FeatherIcon icon="dollar-sign" className="h-4 w-4 me-2" /> Balance: <span className="text-orange-500 ms-2">$ 245.10</span></p>
                                </li>
                                <li>
                                    <a href="user-account.html" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-orange-500 dark:hover:text-white"><FeatherIcon icon="user" className="h-4 w-4 me-2" />Account</a>
                                </li>
                                <li>
                                    <a href="helpcenter.html" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-orange-500 dark:hover:text-white"><FeatherIcon icon="help-circle" className="h-4 w-4 me-2" />Helpcenter</a>
                                </li>
                                <li>
                                    <a href="user-setting.html" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-orange-500 dark:hover:text-white"><FeatherIcon icon="settings" className="h-4 w-4 me-2" />Settings</a>
                                </li>
                                <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                                <li>
                                    <a href="login.html" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-orange-500 dark:hover:text-white"><FeatherIcon icon="log-out" className="h-4 w-4 me-2" />Logout</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>


                <div id="navigation">

                    <ul className="navigation-menu">
                        <li><Link href={route('home')} className="sub-menu-item">Home</Link></li>

                        <li className="has-submenu parent-parent-menu-item">
                            <Link href={route('shop')}>Products</Link><span className="menu-arrow"></span>

                            <ul className="submenu megamenu">
                            {categories.map((item,index) => (
                                <li key={item.id} >
                                    <ul>
                                        <li><Link className="font-extrabold" href={route('shop',item.category_name.toLowerCase().replace(/\s+/g, '-'))}>{item.category_name}</Link></li>
                                        {item.children.map((child,index) => (
                                         child.status==1 ? <li key={child.id}><Link href={route('shop',child.category_name.toLowerCase().replace(/\s+/g, '-'))} className="sub-menu-item">{child.category_name}</Link></li> : ''
                                        ))}
                                        
                                        
                                    </ul>
                                </li>
                                ))}
                                
                                <li>
                                    <ul>
                                        <li className="megamenu-head"><img src="/assets/images/cta.png" alt="" /></li>
                                    </ul>
                                </li> 
                            </ul>
                        </li>

                       
                        <li><a href={route('home')} className="sub-menu-item">Sale</a></li>

                        <li><a href={route('home')} className="sub-menu-item">About Us</a></li>

                        <li><a href={route('home')} className="sub-menu-item">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </nav>

    );

}