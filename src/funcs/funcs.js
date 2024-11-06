export async function postUser(newUser) {
  const data = await fetch("http://127.0.0.1:8000/api/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const res = data.json();

  return res;
}

export async function getUser(userObj) {
  const data = await fetch(`http://127.0.0.1:8000/api/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  const res = await data.json();

  return res;
}

export const newPost = async (formData) => {
  const response = await fetch("http://localhost:8000/api/posts", {
    method: "POST",
    headers: {},
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export async function getPosts() {
  const data = await fetch(`http://127.0.0.1:8000/api/posts`);

  const res = await data.json();

  return res;
}
