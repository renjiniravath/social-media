import fetch from "./handler";

export const addPost = (body) => {
  const url = `/posts`;
  body["username"] = sessionStorage.getItem("username");
  return fetch({
    method: "POST",
    url,
    body,
  });
};

export const getPosts = () => {
  const url = `/posts`;
  return fetch({
    method: "GET",
    url,
  });
};

export const addCommentToPost = (id, body) => {
  const url = `/posts/${id}/comment`;
  body["username"] = sessionStorage.getItem("username");
  return fetch({
    method: "POST",
    url,
    body,
  });
};

export const votePost = (id, body) => {
  const url = `/posts/${id}/vote`;
  body["username"] = sessionStorage.getItem("username");
  return fetch({
    method: "POST",
    url,
    body,
  });
};
