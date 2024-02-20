export default function TopBanner({title="",main_section="",main_section_url="",current_page_name=""}){
    return (
        <section  className="relative table w-full py-20 lg:py-24 md:pt-28 bg-gray-50 dark:bg-slate-800 bg-[url('../../assets/images/hero/pages.jpg')] bg-no-repeat" style={{backgroundPosition : 'right bottom',backgroundSize : '100% auto'}}>
            
            <div  className="container relative">
                <div  className="grid grid-cols-1 mt-14">
                    <h3  className="text-3xl leading-normal font-semibold">{title}</h3>
                </div>

                <div  className="relative mt-3">
                    <ul  className="tracking-[0.5px] mb-0 inline-block">
                        <li  className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href={main_section_url} >{main_section}</a></li>
                        <li  className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i  className="mdi mdi-chevron-right"></i></li>
                        <li  className="inline-block uppercase text-[13px] font-bold text-orange-500" aria-current="page">{current_page_name}</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}