import { useState } from "react";
import "./commentArea.scss";
import avatar from "./images/bozai.png";
import _ from "lodash";
import classNames from "classnames";

// comment list
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: "13258165",
      avatar: "",
      uname: "Jay Chou",
    },
    // 评论内容
    content: "哎哟，不错哦",
    // 评论时间
    ctime: "10-18 08:15",
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: "36080105",
      avatar: "",
      uname: "许嵩",
    },
    content: "我寻你千百度 日出到迟暮",
    ctime: "11-13 11:29",
    like: 100,
  },
  {
    rpid: 1,
    user: {
      uid: "30009257",
      avatar,
      uname: "wzh",
    },
    content: "Ars longa, vita brevis.",
    ctime: "10-19 09:00",
    like: 999,
  },
];
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

const CommentArea = () => {
  const [commentList, setCommentList] = useState(
    _.orderBy(defaultList, "like", "desc")
  );
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
          <div className="reply-box-wrap">
            <textarea
              className="reply-box-textarea"
              placeholder="Be Friendly"
            />
            <div className="reply-box-send">
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        <div className="reply-list">
          {commentList.map((item) => (
            <div key={item.rpid} className="reply-item">
              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    className="bili-avatar-img"
                    alt=""
                    src={item.user.avatar}
                  />
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
                      <span
                        className="delete-btn"
                        onClick={() => handleDel(item.rpid)}
                      >
                        Delete
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentArea;
