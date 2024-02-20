import FeatherIcon from 'feather-icons-react';
import { Link } from '@inertiajs/react';
export default function FrontPagination({ links,prev_page_url,next_page_url }) {

    console.log(links);

    function getClassName(active) {
        if (active) {
            return "z-10 size-[40px] inline-flex justify-center items-center text-white bg-orange-500 border border-orange-500";
        } else {
            return "size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500";
        }
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex items-center -space-x-px">
                {/* <li>
                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">
                        <FeatherIcon icon="chevron-left" className="size-5 rtl:rotate-180 rtl:-mt-1" />
                    </a>
                </li>
                <li>
                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">1</a>
                </li>
                <li>
                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page" className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-orange-500 border border-orange-500">3</a>
                </li>
                <li>
                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">4</a>
                </li>
                <li>
                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">5</a>
                </li>
                <li>
                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">
                        <FeatherIcon icon="chevron-right" className="size-5 rtl:rotate-180 rtl:-mt-1" />
                    </a>
                </li> */}
                
                <li>
                {prev_page_url == null ?
                    <div className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl border border-gray-100 dark:border-gray-800">
                        <FeatherIcon icon="chevron-left" className="size-5 rtl:rotate-180 rtl:-mt-1" />
                    </div> :
                    <Link href={prev_page_url} className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">
                        <FeatherIcon icon="chevron-left" className="size-5 rtl:rotate-180 rtl:-mt-1" />
                    </Link>
}                   
                </li> 
                {links.map((link, key) => (
                    !(key == 0 || key == (links.length - 1)) ?
                        (<li key={key}><Link 
                            className={getClassName(link.active)}
                            href={link.url}
                        >{link.label.replace('&laquo;', '<').replace('&raquo;', '>')}</Link></li>) : ''


                ))}
                <li>
                {next_page_url == null  ?
                    <div className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl border border-gray-100 dark:border-gray-800">
                        <FeatherIcon icon="chevron-right" className="size-5 rtl:rotate-180 rtl:-mt-1" />
                    </div>:
                    <Link href={next_page_url} className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">
                    <FeatherIcon icon="chevron-right" className="size-5 rtl:rotate-180 rtl:-mt-1" />
                </Link>
}
                </li>
            </ul>
        </nav>
    );
}