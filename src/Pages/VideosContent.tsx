import { useContext } from "react";
import { MyContext } from "../Context/DataContext";
import Card from "../Components/Card";
import { Post } from "../Context/DataContext";
import { Link } from "react-router-dom";

const VideosContent = () => {
  const contextValue = useContext(MyContext);
  if (!contextValue) {
    return null;
  }
  const { posts } = contextValue;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-auto max-w-screen-lg">
      {posts.length > 0 &&
        posts.map((item: Post) => (
          <Link key={item.postId} to={`/${item.postId}`}>
            <Card item={item} />
          </Link>
        ))}
    </div>
  );
};

export default VideosContent;
