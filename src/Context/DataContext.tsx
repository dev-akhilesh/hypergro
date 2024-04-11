import { createContext, useEffect, useState, ReactNode } from "react";

export interface Post {
  postId: string;
  creator: {
    name: string;
    id: string;
    handle: string;
    pic: string;
  };
  comment: {
    count: number;
    commentingAllowed: boolean;
  };
  reaction: {
    count: number;
    voted: boolean;
  };
  submission: {
    title: string;
    description: string;
    mediaUrl: string;
    thumbnail: string;
    hyperlink: string;
    placeholderUrl: string;
  };
}

interface ContextType {
  posts: Post[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}
interface ContextProviderProps {
  children: ReactNode;
}
export const MyContext = createContext<ContextType | null>(null);

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);

  async function getData() {
    try {
      const response = await fetch(
        `https://internship-service.onrender.com/videos?page=${page}`
      );
      const resData = await response.json();
      setPosts(resData.data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [page]);
  return (
    <MyContext.Provider value={{ posts, page, setPage, setPosts }}>
      {children}
    </MyContext.Provider>
  );
};

