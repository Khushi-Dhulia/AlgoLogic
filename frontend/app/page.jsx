import Image from "next/image";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";

export default function Home() {
  return (
  <div>
    <Navbar/>
        {/* <Login /> 
      <Register/>  */}
      <HomePage/> 
  </div> 
);
}
