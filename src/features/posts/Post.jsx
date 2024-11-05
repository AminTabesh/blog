import { useNavigate } from "react-router-dom";

function Post({ title, content, id }) {
  const navigate = useNavigate();
  let formattedContent = "";

  content.length >= 120
    ? (formattedContent = content.slice(0, 115) + "...")
    : (formattedContent = content);
  return (
    <div
      className="flex flex-col h-80 w-96 min-w-80 bg-gray-200 items-center cursor-pointer border rounded-2xl overflow-hidden"
      onClick={() => {
        navigate(`/posts/${id}`);
      }}
    >
      <img
        src="/public/logo.png"
        alt="img"
        className="h-3/6 w-full object-cover"
      />
      <h3 className="mt-5 font-bold text-2xl">{title}</h3>
      <p className="mt-2 text-center">{formattedContent}</p>
    </div>
  );
}

export default Post;
