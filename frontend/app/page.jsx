import Image from "next/image";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import VisualDSALGO from "./pages/DataStructure"
import {AlgoHeader,Video_Section,Complexity_Section,Implementation,SubmitAnswer,DeepDiveSection,Previous_Topic,FAQ}  from "./components/DS_section";
import Array from "./components/Visualization/Array";
export default function Home() {
  return (
  <div>
    <Navbar/>
        {/* <Login /> 
      <Register/>  */}
      {/* <HomePage/>  */}
      {/* <VisualDSALGO/> */}
      <AlgoHeader/><Array/>
      {/* <Video_Section/> */}
      <Video_Section/>
      <Complexity_Section/>
      <Implementation/>
      <DeepDiveSection/><SubmitAnswer/><Previous_Topic/><FAQ/>
  </div> 
);
}
