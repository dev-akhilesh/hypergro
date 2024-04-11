import { useContext } from "react";
import { MyContext } from "../Context/DataContext";

const Pagination = () => {
  const contextValue = useContext(MyContext);
  if (!contextValue) {
    return null;
  }
  const { posts, setPage } = contextValue;
  const btn = Array.from({ length: posts.length }, (_, idx) => idx);

  return (
    <div className="flex justify-center items-center my-10 overflow-x-auto flex-wrap">
      {btn.map((item) => {
        return (
          <button
            key={item}
            onClick={() => setPage(item)}
            className="button-3 m-2 bg-indigo-500 border border-indigo-600 rounded-full shadow-md text-white font-semibold px-4 py-2 inline-block cursor-pointer select-none whitespace-no-wrap hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed active:bg-indigo-800 active:shadow-inner"
          >
            {item + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
