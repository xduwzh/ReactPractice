// article apis

import { request } from "@/utils";

// get channel list
export function getChannelAPI() {
  return request({ url: "/channels", method: "GET" });
}

export function createArticleAPI(data) {
  return request({ url: "/mp/articles?draft=false", method: "POST", data });
}

// get article list
export function getArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

// delete article
export function delArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
}

// get article details by id
export function getArticleById(id) {
  return request({ url: `/mp/articles/${id}` });
}
