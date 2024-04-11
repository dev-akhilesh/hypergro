import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SinglePage from "./SinglePage";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AllRoutes = () => {
  return (
    <>
       <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SinglePage />} />
      </Routes>
        <Footer/>
    </>
  );
};

export default AllRoutes;
