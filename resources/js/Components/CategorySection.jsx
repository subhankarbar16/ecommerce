export default function CategorySection({data=[],...props}){
    console.log(data);
    // {data.map((item,index) => (
    //     console.log(index)
    //     ))}
    return (
        <div {...props}>
            
            <div className="lg:col-span-4 md:col-span-6 md:order-1 order-2">
                <div className="relative overflow-hidden group rounded-md shadow dark:shadow-gray-800">
                    <a href="" className="">
                        <img src={`/images/categories/${data[0].category_image}`} className="h-full w-full object-cover xl:h-[738.66px] lg:h-[614.66px] rounded-md group-hover:scale-110 duration-500" alt="" />
                        <span className="bg-white dark:bg-slate-900 group-hover:text-orange-500 py-2 px-4 rounded-md shadow dark:shadow-gray-800 absolute mx-4 bottom-4 text-lg font-medium">{data[0].category_name}</span>
                    </a>
                </div>
            </div>

            <div className="lg:col-span-4 md:col-span-12 lg:order-2 order-3">
                <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-6">
                    <div className="relative overflow-hidden group rounded-md shadow dark:shadow-gray-800">
                        <a href="" className="">
                            <img src={`/images/categories/${data[1].category_image}`} className="group-hover:scale-110 duration-500" alt="" />
                            <span className="bg-white dark:bg-slate-900 group-hover:text-orange-500 py-2 px-4 rounded-md shadow dark:shadow-gray-800 absolute mx-4 bottom-4 text-lg font-medium">{data[1].category_name}</span>
                        </a>
                    </div>

                    <div className="relative overflow-hidden group rounded-md shadow dark:shadow-gray-800">
                        <a href="" className="">
                            <img src={`/images/categories/${data[2].category_image}`} className="group-hover:scale-110 duration-500" alt="" />
                            <span className="bg-white dark:bg-slate-900 group-hover:text-orange-500 py-2 px-4 rounded-md shadow dark:shadow-gray-800 absolute mx-4 bottom-4 text-lg font-medium">{data[2].category_name}</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 lg:order-3 order-2">
                <div className="relative overflow-hidden group rounded-md shadow dark:shadow-gray-800">
                    <a href="" className="">
                        <img src={`/images/categories/${data[3].category_image}`} className="h-full w-full object-cover xl:h-[738.66px] lg:h-[614.66px] rounded-md group-hover:scale-110 duration-500" alt="" />
                        <span className="bg-white dark:bg-slate-900 group-hover:text-orange-500 py-2 px-4 rounded-md shadow dark:shadow-gray-800 absolute mx-4 bottom-4 text-lg font-medium">{data[3].category_name}</span>
                    </a>
                </div>
            </div>
        </div>

    );
}