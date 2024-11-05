import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const targetPost = posts.find((post) => post.id === Number(id));

  return (
    <div className="pb-20">
      <img src="/public/logo.png" alt="img" className="w-full max-h-96 object-contain" />
      <h1 className="font-bold text-4xl text-center mt-10">{targetPost.title}</h1>
      <p className="px-8 text-xl mt-8">{targetPost.content}</p>

    </div>
  );
}

export default PostPage;
