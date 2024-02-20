// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../../assets/css/style.css';

// import required modules
import { Autoplay,Pagination } from 'swiper/modules';

//import { Carousel, Typography, Button } from "@material-tailwind/react";
 import '../../assets/libs/swiper/css/swiper.min.css';

 export default function SliderBanner({data=[],...props}){
    const pagination = {
        clickable: true, renderBullet: function (index, className) {
            return '<span class="' + className + '" style="margin-left:10px">' + '0'+(index + 1) + '</span>';
        }
    };
    const autoplay={
        delay: 5000,
        disableOnInteraction: false,
      };

    return (
        <Swiper pagination={pagination} modules={[Autoplay,Pagination]} autoplay={autoplay} {...props}
       >                {data.map((item,index) => (
                        <SwiperSlide key={item.id} className="flex items-center overflow-hidden">
                            <div className="slide-inner absolute end-0 top-0 w-full h-full slide-bg-image bg-red-600/5 flex items-center md:bg-top bg-center bg-no-repeat bg-cover;" style={{backgroundImage:`url(${'images/banners/'+item.banner_image})`}}>
                                <div className="container relative">
                                    <div className="grid md:grid-cols-2 grid-cols-1">
                                        <div>
                                            <span className="uppercase font-semibold text-lg">{item.title}</span>
                                            <h4 className="md:text-6xl text-4xl md:leading-normal leading-normal font-bold my-3">{item.highlight}</h4>
                                            <p className="text-lg">{item.short_description}.</p>
                    
                                            <div className="mt-6">
                                                <a href={`${item.link}`} className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-center bg-slate-900 dark:bg-orange-500 text-white rounded-md">Shop Now <i className="mdi mdi-arrow-right" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                         ))}
                    </Swiper>
    )


 }