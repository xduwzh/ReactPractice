import { useState, useRef, useEffect } from "react";
import "./commentArea.scss";
import avatar from "./images/bozai.png";
import _ from "lodash";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import axios from "axios";

// logined user
const user = {
  uid: "30009257",
  avatar,
  uname: "wzh",
};

// nav tabs
const tabs = [
  { type: "hot", text: "Top" },
  { type: "time", text: "Latest" },
];

function useGetList() {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    async function getList() {
      const res = await axios.get("http://localhost:3004/list");
      setCommentList(res.data);
    }
    getList();
  }, []);

  return {
    commentList,
    setCommentList,
  };
}

function CommentItem({ item, onDel }) {
  return (
    <div key={item.rpid} className="reply-item">
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" alt="" src={item.user.avatar} />
        </div>
      </div>

      <div className="content-wrap">
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            <span className="reply-time">{item.ctime}</span>
            <span className="reply-time">like: {item.like}</span>
            {user.uid === item.user.uid && (
              <span className="delete-btn" onClick={() => onDel(item.rpid)}>
                Delete
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const CommentArea = () => {
  //   const [commentList, setCommentList] = useState(
  //     _.orderBy(defaultList, "like", "desc")
  //   );
  const { commentList, setCommentList } = useGetList();
  const handleDel = (id) => {
    console.log(id);
    setCommentList(commentList.filter((item) => item.rpid !== id));
  };

  const [type, setType] = useState("hot");
  const handleTabChange = (type) => {
    console.log(type);
    setType(type);
    if (type === "hot") {
      setCommentList(_.orderBy(commentList, "like", "desc"));
    } else {
      setCommentList(_.orderBy(commentList, "ctime", "desc"));
    }
  };

  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const handlePublish = () => {
    setCommentList([
      ...commentList,
      {
        rpid: uuidv4(),
        user: {
          uid: "30009257",
          avatar,
          uname: "wzh",
        },
        content: content,
        ctime: dayjs(new Date()).format("MM-DD hh:mm"),
        like: 1999,
      },
    ]);
    // empty content after sending
    setContent("");
    // refocus
    inputRef.current.focus();
  };

  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comment</span>
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {tabs.map((item) => (
              <span
                key={item.type}
                onClick={() => handleTabChange(item.type)}
                className={classNames("nav-item", {
                  active: type === item.type,
                })}
              >
                {item.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        <div className="box-normal">
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="Avatar" />
            </div>
          </div>
          {/* content area */}
          <div className="reply-box-wrap">
            <textarea
              className="reply-box-textarea"
              placeholder="Send a friendly comment."
              ref={inputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="reply-box-send">
              <div className="send-text" onClick={handlePublish}>
                Publish
              </div>
            </div>
          </div>
        </div>
        <div className="reply-list">
          {commentList.map((item) => (
            <CommentItem item={item} onDel={handleDel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentArea;
