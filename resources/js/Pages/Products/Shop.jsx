import FrontGuestLayout from "@/Layouts/FrontGuestLayout";
import ProductGridListing from "@/Components/ProductGridListing";
import FrontPagination from "@/Components/FrontPagination";
import { Link, usePage } from "@inertiajs/react";
import FeatherIcon from 'feather-icons-react';
import React, { useEffect, useState } from "react";
export default function Shop({
    products,
    category_name,
    size,
    keyword,
    product_sizes,
}) {
    const [prod, setProd] = useState(products);
    const [key,setKey]=useState(keyword);
    const { configuration } = usePage().props;
    let categories = configuration.categories;
    function search(e) {
        let k = e.target.value;
        
        window.history.replaceState(null, "", route("shop",[category_name ? category_name.toLowerCase().replace(/\s+/g,"-")
        : "all",size ? size.toLowerCase().replace(/\s+/g,"-" ): "all", k]));
        setKey(k);
        fetch(route("shop",[category_name ? category_name.toLowerCase().replace(/\s+/g,"-")
            : "all",size ? size.toLowerCase().replace(/\s+/g,"-" ): "all", k]), {
            method: "GET",
            headers: {
                search: "search",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProd(data);
            })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        console.log("useEffect");
    }, [prod,key]);

    console.log(categories);
    return (
        <FrontGuestLayout
            head="Products"
            main_section="Home"
            main_section_url={route("home")}
            current_page_name="Products"
        >
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 gap-6">
                        <div className="lg:col-span-3 md:col-span-4">
                            <div className="rounded shadow dark:shadow-gray-800 p-4 sticky top-20">
                                <h5 className="text-xl font-medium">
                                    Filter :{" "}
                                    <Link
                                        href={route("shop")}
                                        className={`text-sm italic underline text-orange-500${
                                            category_name || size || key
                                                ? ""
                                                : " hidden"
                                        }`}
                                    >
                                        Clear
                                    </Link>
                                </h5>

                                <form className="mt-4">
                                    <div>
                                        <label
                                            htmlFor="searchname"
                                            className="font-medium"
                                        >
                                            Search:
                                        </label>
                                        <div className="relative mt-2">
                                            <FeatherIcon icon="search" className="absolute size-4 top-[9px] end-4" />
                                            <input
                                                type="text"
                                                className="h-9 pe-10 rounded px-3 border border-gray-100 dark:border-gray-800 focus:ring-0 outline-none"
                                                name="s"
                                                id="searchItem"
                                                placeholder="Search..."
                                                value={key}
                                                onChange={search}
                                            />
                                        </div>
                                    </div>
                                </form>

                                <div className="mt-4">
                                    <h5 className="font-medium">Categories:</h5>
                                    <ul className="list-none mt-2">
                                        {categories.map((item, index) => (
                                            <li key={item.id}>
                                                <Link
                                                    href={route("shop", [
                                                        item.category_name
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            ),
                                                        size
                                                            ? size
                                                                  .toLowerCase()
                                                                  .replace(
                                                                      /\s+/g,
                                                                      "-"
                                                                  )
                                                            : "all",
                                                            key ? key : "",
                                                    ])}
                                                    className={`${
                                                        item.category_name.toLowerCase() ==
                                                        category_name
                                                            ? " text-black font-extrabold"
                                                            : " text-slate-400 dark:text-gray-100"
                                                    }`}
                                                >
                                                    <i className="mdi mdi-shopping-outline text-orange-500 me-2"></i>
                                                    {item.category_name}
                                                </Link>
                                                <ul className="px-4">
                                                    {item.children.map(
                                                        (child, index) => (
                                                            <li key={child.id}>
                                                                <Link
                                                                    href={route(
                                                                        "shop",
                                                                        [
                                                                            child.category_name
                                                                                .toLowerCase()
                                                                                .replace(
                                                                                    /\s+/g,
                                                                                    "-"
                                                                                ),
                                                                            size
                                                                                ? size
                                                                                      .toLowerCase()
                                                                                      .replace(
                                                                                          /\s+/g,
                                                                                          "-"
                                                                                      )
                                                                                : "all",
                                                                                key
                                                                                ? key
                                                                                : "",
                                                                        ]
                                                                    )}
                                                                    className={`${
                                                                        child.category_name.toLowerCase() ==
                                                                        category_name
                                                                            ? " text-black font-extrabold"
                                                                            : " text-slate-400 dark:text-gray-100"
                                                                    }`}
                                                                >
                                                                    <i className="mdi text-orange-500 me-2"></i>
                                                                    -{" "}
                                                                    {
                                                                        child.category_name
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-4">
                                    <h5 className="font-medium">Sizes:</h5>
                                    <ul className="list-none mt-2">
                                        {product_sizes.map((item, index) => (
                                            <li
                                                key={index}
                                                className="inline space-x-1.5"
                                            >
                                                <Link
                                                    href={route("shop", [
                                                        category_name
                                                            ? category_name
                                                                  .toLowerCase()
                                                                  .replace(
                                                                      /\s+/g,
                                                                      "-"
                                                                  )
                                                            : "all",
                                                        eval(item.quantity) +
                                                            "-" +
                                                            item.unit.unit_name
                                                                .toLowerCase()
                                                                .replace(
                                                                    /\s+/g,
                                                                    "-"
                                                                ),
                                                                key ? key : "",
                                                    ])}
                                                    className={`size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md border${
                                                        size ==
                                                        eval(item.quantity) +
                                                            "-" +
                                                            item.unit.unit_name
                                                                .toLowerCase()
                                                                .replace(
                                                                    /\s+/g,
                                                                    "-"
                                                                )
                                                            ? " border-slate-900 dark:border-gray-100 text-white dark:text-slate-900 bg-slate-900 dark:bg-slate-100"
                                                            : " border-gray-100 dark:border-gray-800 text-slate-900 dark:text-gray-50 hover:border-slate-900 dark:hover:border-gray-100 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100"
                                                    }`}
                                                >
                                                    {eval(item.quantity) +
                                                        item.unit.unit_name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`lg:col-span-9 md:col-span-8${
                                prod.from ? "" : " hidden"
                            }`}
                        >
                            <div className="md:flex justify-between items-center mb-6">
                                <span className="font-semibold">{`Showing ${prod.from}-${prod.to} of ${prod.total} items`}</span>

                                <div className="md:flex items-center">
                                    <label className="font-semibold md:me-2">
                                        Sort by:
                                    </label>
                                    <select className="form-select form-input md:w-36 w-full md:mt-0 mt-1 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0">
                                        <option value="">Featured</option>
                                        <option value="">Sale</option>
                                        <option value="">Alfa A-Z</option>
                                        <option value="">Alfa Z-A</option>
                                        <option value="">Price Low-High</option>
                                        <option value="">Price High-Low</option>
                                    </select>
                                </div>
                            </div>

                            <ProductGridListing
                                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
                                data={prod.data}
                            />

                            <div
                                className={`grid md:grid-cols-12 grid-cols-1 mt-6${
                                    prod.from ? "" : " hidden"
                                }`}
                            >
                                <div className="md:col-span-12 text-center">
                                    <FrontPagination
                                        links={prod.links}
                                        prev_page_url={prod.prev_page_url}
                                        next_page_url={prod.next_page_url}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontGuestLayout>
    );
}
