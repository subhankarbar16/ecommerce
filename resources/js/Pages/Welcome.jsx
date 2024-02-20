

import '../../assets/libs/@mdi/font/css/materialdesignicons.min.css';
import '../../assets/css/tailwind.min.css';
// import FeatherIcon from 'feather-icons-react';
// import '../../assets/js/plugins.init.js';
// import '../../assets/js/app.js';
import { Link, usePage } from '@inertiajs/react';
import FrontHeader from '@/Components/FrontHeader';
import SliderBanner from '@/Components/SliderBanner';
import CategorySection from '@/Components/CategorySection';
import ProductGridListing from '@/Components/ProductGridListing';
import SectionHead from '@/Components/SectionHead';
import FrontFooter from '@/Components/FrontFooter';


export default function Welcome({banners,new_arrivals}) {
    const { configuration } = usePage().props
    let categories = configuration.categories;
    let site=configuration.site;
    return (
        <div className="light scroll-smooth" dir="ltr">
            <div className="dark:bg-slate-900">
                <FrontHeader pageTitle="Home"/>
                <section className="swiper-slider-hero relative block h-screen " id="home">
                    <SliderBanner className="mySwiper" data={banners}/>
                </section>
                <section className="relative md:py-24 py-16">
                    <div className="container relative">
                        <SectionHead className="grid grid-cols-1 justify-center text-center mb-6" title="Featured Collections" short_desc="Shop the latest products from the most popular collections"/>
                        <CategorySection className="grid md:grid-cols-12 grid-cols-1 pt-6 gap-6" data={categories}/>
                    </div>

                    <div className="container relative md:mt-24 mt-16">
                        <SectionHead className="grid grid-cols-1 justify-center text-center mb-6" title="New Arrival Products" short_desc="Shop the latest products from the most popular collections"/>
                        <ProductGridListing className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pt-6 gap-6" data={new_arrivals}/>
                    </div>
                </section>
                
                <FrontFooter />
            
                <a href="#" id="back-to-top" className="back-to-top fixed hidden text-lg rounded-full z-10 bottom-5 end-5 size-9 text-center bg-orange-500 text-white justify-center items-center"><i className="mdi mdi-arrow-up" /></a>

            </div></div>

    );
}
