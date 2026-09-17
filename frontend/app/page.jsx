import Image from "next/image";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import VisualDSALGO from "./pages/DataStructure"
import {AlgoHeader,Video_Section,Complexity_Section,Implementation,TopicTest,SubmitAnswer,DeepDiveSection,Previous_Topic,FAQ}  from "./components/DS_section";
import Array from "./components/Visualization/Array";
import DashboardPage from "./pages/DashboardPage" 
import TestPage from "./pages/Test"
import PracticePage from "./components/MockTestPage"
export default function Home() {
  return (
  <div>
    <Navbar/>
      <Login /> 
      <Register/>
      <HomePage/> 
      {/* <VisualDSALGO/> */}
      {/* <AlgoHeader/><Array/><Complexity_Section/><Implementation/><DeepDiveSection/><TopicTest topicName="Array"/><SubmitAnswer/><Previous_Topic/><FAQ/> */}
      {/* <DashboardPage/> */}
      {/* <TestPage/> */}
      {/* <PracticePage/> */}
  </div> 
);
}
