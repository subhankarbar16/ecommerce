import '../bootstrap';
import '../../css/app.css';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
export default function Guest({ children }) {
    const { configuration } = usePage().props
    let site_configuration = configuration.site;
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/admin">
                    <img className="h-9 w-auto fill-current text-gray-500" src={`/images/brands/${site_configuration.site_logo}`} />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
