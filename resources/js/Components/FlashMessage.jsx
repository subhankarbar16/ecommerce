import { useState, useEffect } from "react";
import { Transition } from '@headlessui/react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props
    let msg=flash.message;
    const [state, setState] = useState(msg?true:false);
    useEffect(function(){
        setTimeout(function(){
            setState(false);
        },2000);
    },[state]);
    
    return (
       <div className="absolute top-0 z-50" style={{width:'100%',}}>
        {msg ?
        <Transition
                        show={state}
                        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-2000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
                    >
       { msg.indexOf("success") > 0 ?

            <div id="alert" className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md from-green-500 to-transparent" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                    <div>
                        <p className="font-bold">Success!</p>
                        <p className="text-sm">{msg}</p>
                    </div>
                </div>
            </div>
            :
            <div id="alert" role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error!
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{msg}</p>
                </div>
            </div>
       }
            </Transition>
            :''}
            </div>
    );

}