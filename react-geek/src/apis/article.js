// article apis

import { request } from "@/utils";

// get channel list
export function getChannelAPI() {
  return request({ url: "/channels", method: "GET" });
}
