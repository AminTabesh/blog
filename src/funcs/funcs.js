

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
    body: JSON.stringify(userObj)
  });

  const res = await data.json();

  return res;
}

export async function newPost(postObj) {
  const data = await fetch("http://127.0.0.1:8000/api/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(postObj),
  });

  const res = data.json();

  return res;
}

export async function getPosts(userObj) {
  const data = await fetch(`http://127.0.0.1:8000/api/posts`);

  const res = await data.json();

  return res;
}