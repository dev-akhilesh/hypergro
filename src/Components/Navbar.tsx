import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { BsFilm } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <nav className="bg-white text-gray-900 shadow-md p-4 flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Link to={"/"} className="mr-4">
          <BsFilm className="text-3xl" />
        </Link>
        <h1 className="text-xl font-semibold">VidTube</h1>
      </div>
      <div className="md:hidden">
        <RiMenu3Fill size={"40px"} onClick={() => setMenu(!menu)} />
      </div>
      <ul className={`md:flex ${menu ? "flex" : "hidden"} mt-4 md:mt-0`}>
        <li className="mx-4">
          <Link
            to={"/about"}
            className="hover:bg-gray-200 py-2 px-4 rounded-lg block"
          >
            About
          </Link>
        </li>
        <li className="mx-4">
          <Link
            to={"/shorts"}
            className="hover:bg-gray-200 py-2 px-4 rounded-lg block"
          >
            Shorts
          </Link>
        </li>
        <li className="mx-4">
          <Link
            to={"/videos"}
            className="hover:bg-gray-200 py-2 px-4 rounded-lg block"
          >
            Videos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
