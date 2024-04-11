import { Post } from "../Context/DataContext";
import { MdVerified } from "react-icons/md";

interface CardProps {
  item: Post;
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={item.submission.thumbnail}
        alt={item.submission.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img
            src={item.creator.pic}
            alt={item.creator.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-lg font-semibold">{item.submission.title}</p>
            <p className="text-sm text-gray-600 flex items-center">
              {item.creator.handle}{" "}
              <MdVerified className="ml-1 text-blue-500" />
            </p>
            <p className="text-sm text-gray-600">
              {item.creator.name || item.creator.handle}
            </p>
          </div>
        </div>
        {/* Additional content can be added here */}
      </div>
    </div>
  );
};

export default Card;
