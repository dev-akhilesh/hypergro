import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineComment } from "react-icons/md";
import { TbShare3 } from "react-icons/tb";

interface Comment {
  postId: string | undefined;
  user: string;
  comment: string;
}

const SinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const ContextValue = useContext(MyContext);
  const [commentInput, setCommentInput] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [like, setLike] = useState<number>(
    parseInt(localStorage.getItem(`like_${id}`) || "0")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(
        JSON.parse(storedComments).filter(
          (comment: Comment) => comment.postId === id
        )
      );
    }
  }, [id]);

  const handleLike = () => {
    const newLike = like + 1;
    setLike(newLike);
    localStorage.setItem(`like_${id}`, newLike.toString());
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    const newComment: Comment = {
      postId: id,
      user: "User",
      comment: commentInput,
    };
    setComments((prevComments) => [...prevComments, newComment]);

    localStorage.setItem("comments", JSON.stringify([...comments, newComment]));
    setCommentInput("");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!ContextValue) {
    return null;
  }

  const { posts } = ContextValue;
  const post = posts.find((post) => post.postId === id);

  if (!post) {
    return (
      <div className="flex justify-center items-center text-5xl h-[540px]">
        404, Post not found
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 relative">
      <button
        onClick={handleGoBack}
        className="text-5xl absolute -top-12 left-0 mt-4 ml-4 cursor-pointer hover:text-blue-500 focus:outline-none"
      >
        &#8592; {/* Left arrow */}
      </button>

      <div className="lg:flex lg:justify-center">
        <div className="lg:w-[35%] mx-4  rounded-xl overflow-hidden">
          <video
            src={post.submission.mediaUrl}
            controls={false}
            autoPlay
            loop
            onClick={(e) =>
              (e.target as HTMLVideoElement).paused
                ? (e.target as HTMLVideoElement).play()
                : (e.target as HTMLVideoElement).pause()
            }
            className="w-full h-[550px] rounded-xl"
          />
        </div>
        <div className="lg:w-[35%]">
          <div className="bg-white rounded-lg p-4 mb-4 shadow-lg">
            <div className="mt-3 pr-1">
              <p className="mb-2">
                <span className="font-semibold mb-2">Title:</span>{" "}
                {post.submission.title}
              </p>
              <p className="mb-2">
                <span className="font-semibold mb-2">Creator Name:</span>{" "}
                {post.creator.name || post.creator.handle}
              </p>
              <p className="mb-2">
                <span className="font-semibold mb-2">Creator user handle:</span>{" "}
                {post.creator.handle}
              </p>
              <p className="mb-2">
                <span className="font-semibold mb-2">Description:</span>{" "}
                {post.submission.description}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-lg flex justify-between">
            <div className="flex items-center">
              <AiOutlineLike
                className="text-xl mr-2 cursor-pointer hover:text-blue-500"
                onClick={handleLike}
              />
              <p className="font-semibold">{like}</p>
            </div>
            <div className="flex items-center">
              <MdOutlineComment
                className="text-xl mr-2 cursor-pointer hover:text-blue-500"
                onClick={() => setShowCommentBox((prev) => !prev)}
              />
              <p className="font-semibold">{comments.length}</p>
            </div>
            <div className="flex items-center">
              <TbShare3 className="text-xl mr-2 cursor-pointer hover:text-blue-500" />
              <p className="font-semibold">Share</p>
            </div>
          </div>

          {showCommentBox && (
            <div className="lg:mt-4 lg:ml-4 bg-white rounded-lg shadow-lg">
              <div className="p-4">
                <p className="font-semibold mb-2">Comments</p>
                <div className="overflow-hidden max-h-[250px] mb-4">
                  <table className="w-full">
                    <tbody>
                      {comments.map((item, index) => (
                        <tr key={index}>
                          <td className="p-2">{item.user}</td>
                          <td className="p-2">{item.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="mr-2 w-[70%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
