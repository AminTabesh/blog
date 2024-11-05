import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, redirect } from "react-router-dom";
import { getPosts, newPost } from "../funcs/funcs";
import toast from "react-hot-toast";
import { addPost, fetchedPosts } from "../features/posts/postsSlice";
import { useEffect } from "react";
import Post from "../features/posts/Post";
import { logout } from "../features/users/usersSlice";

function HomePage() {
  const posts = useSelector((state) => state.posts.posts);

  const isLoggedIn = useSelector((state) => state.users.isAuth);
  const username = useSelector((state) => state.users.username);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
    onSuccess: () => {
      console.log(data);
    },
  });

  useEffect(
    function () {
      if (data) {
        dispatch(fetchedPosts(data));
      }
    },
    [data, dispatch]
  );

  const { mutate } = useMutation({
    mutationFn: (post) => newPost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
      dispatch(addPost(data.Post));
      toast.success("Poast created successfuly.");
    },
    onError: (err) => {
      toast.error("Failed to create the post");
      console.log(err);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  function onSubmit(data) {
    mutate(data);
    reset()
  }

  function handleLogout() {
    dispatch(logout());
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold text-center">
          Welcome, {username}
          <br />
        </h1>
        <button
          className="cursor-pointer p-1 rounded text-white font bg-red-400 transition-colors hover:bg-red-500"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>

      <form
        className="mb-4 flex flex-col text-ce"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className={`border mt-4 p-2 ${
              errors.title ? "border-red-500" : ""
            }`}
            placeholder="Post Title"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="content" className="font-medium">
            Content:
          </label>
          <textarea
            id="content"
            {...register("content", { required: "Content is required" })}
            className={`border mt-4 p-2 ${
              errors.content ? "border-red-500" : ""
            }`}
            placeholder="Post Content"
            rows="4"
          ></textarea>
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white py-2 rounded px-4 transition-colors hover:bg-teal-600"
        >
          Add Post
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-2 text-center">Posts</h2>
        <div className="flex gap-8 mt-12 px-10 flex-wrap justify-center">
          {!posts.length && <p>No post found :(</p>}
          {posts.length > 0 &&
            posts.map((post) => (
              <Post
                title={post.title}
                content={post.content}
                key={post.id}
                id={post.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
