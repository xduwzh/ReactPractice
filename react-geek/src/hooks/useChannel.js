import { useState, useEffect } from "react";
import { getChannelAPI } from "@/apis/article";

// get channel list

export function useChannel() {
  // get channel list from server
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);
  return { channelList };
}
