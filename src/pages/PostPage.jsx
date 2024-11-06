import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosts } from "../funcs/funcs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchedPosts } from "../features/posts/postsSlice";

const pathPrefix = "../../../backend/public/storage/";

function PostPage() {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const targetPost = posts.find((post) => post.id === Number(id));
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    onSuccess: () => {},
    cacheTime: 1000 * 60 * 5, 
    staleTime: 1000 * 60 * 2, 
  });

  useEffect(() => {
    if (data) {
      dispatch(fetchedPosts(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <p>Loading post...</p>;
  if (isError) return <p>Failed to load post data.</p>;

  if (!targetPost) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="pb-20">
      <img
        src={
          targetPost.image_path
            ? `${pathPrefix}${targetPost.image_path}`
            : "/public/logo.png"
        }
        alt="img"
        className="w-full max-h-96 object-contain"
      />
      <h1 className="font-bold text-4xl text-center mt-10">{targetPost.title}</h1>
      <p className="px-8 text-xl mt-8">{targetPost.content}</p>
    </div>
  );
}

export default PostPage;
