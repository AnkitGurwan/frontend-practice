import Link from 'next/link'
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css'

const Navbar = () => {
    const { asPath, pathname } = useRouter();
    return (
        <nav className="bg-gray-900 p-3 md:p-4">
        <div className="flex items-center justify-between">
            <div className="text-white font-bold text-xl">My App</div>
            <div className="flex space-x-4 items-center">
            {asPath == '/main'
            ?
                <div className="text-white font-medium text-lg">All Items</div>
                :
                <Link href='/main' className="text-white hover:text-gray-300 ">All Items</Link>
            }
            {asPath == '/add'
            ?
                <div className="text-white font-medium text-lg">Add Items</div>
                :
                <Link href='/add' className="text-white hover:text-gray-300">
                    Add Items
                </Link>
            }
            <Link href='/' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 md:px-4 rounded-full transition-all duration-300 focus:outline-none focus:shadow-outline">
                Log Out
            </Link>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
