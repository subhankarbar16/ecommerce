

import '../../assets/libs/@mdi/font/css/materialdesignicons.min.css';
import '../../assets/css/tailwind.min.css';
import FrontHeader from '@/Components/FrontHeader';
import FrontFooter from '@/Components/FrontFooter';
import TopBanner from '@/Components/TopBanner';
export default function FrontGuest({head="",main_section="", main_section_url="",current_page_name="",children }) {

    return (
        <div className="light scroll-smooth" dir="ltr">
        <div className="dark:bg-slate-900">
        <FrontHeader pageTitle={current_page_name}/>
        <TopBanner title={head} main_section={main_section} main_section_url={main_section_url} current_page_name={current_page_name} />
        {children}
        <FrontFooter />

        <a href="#" id="back-to-top" className="back-to-top fixed hidden text-lg rounded-full z-10 bottom-5 end-5 size-9 text-center bg-orange-500 text-white justify-center items-center"><i className="mdi mdi-arrow-up" /></a>

    </div>
    </div>
    );

}
