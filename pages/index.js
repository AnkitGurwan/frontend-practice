import Login from '../components/auth'
import 'tailwindcss/tailwind.css'
import { Toaster } from "react-hot-toast";
export default function Home() {
  return (
    <div className="bg-red-800">
      <Toaster position="bottom-center" />
      <Login/>
    </div>
  );
}
