import Link from 'next/link'
import 'tailwindcss/tailwind.css'
const Auth = () => {
  return (
    <div className='h-screen flex justify-center items-center bg-white'>
      <div className='flex justify-center items-center shadow-lg'>
      <Link href="/main" className='py-4 px-12 text-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-red-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold rounded-md transition-all duration-300 focus:outline-none focus:shadow-outline'>Login</Link>
      </div>
    </div>
  )
}

export default Auth