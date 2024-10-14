import React from "react";
import IssueItem from "../components/IssueItem";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../css/Books.module.css";
const { Meta } = Card;

/**
 * 存储搜索结果的项目
 * 该组件是根据搜索的类型返回不同类型的搜索项目组件（IssueItem or BookItem）
 * 像这一类组件，没有自己的 JSX 视图，而是充当一个容器一般的存在
 * 这一类组件，我们称之为容器组件
 */
function SearchResultItem(props) {
  const navigate = useNavigate();
  const bookItem = (
    <div className={styles.bookSearchContainer}>
      <Card
        hoverable
        style={{
          width: 200,
          marginBottom: 30,
        }}
        cover={
          <img
            alt="example"
            style={{
              width: 160,
              height: 200,
              margin: "auto",
              marginTop: 10,
            }}
            src={"/assets" + props.info.bookPic}
          />
        }
        onClick={() => navigate(`/books/${props.info._id}`)}
      >
        <Meta title={props.info.bookTitle} />
        <div className={styles.numberContainer}>
          <div>浏览数：{props.info.scanNumber}</div>
          <div>评论数：{props.info.commentNumber}</div>
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      {props.info.issueTitle ? <IssueItem issueInfo={props.info} /> : bookItem}
    </div>
  );
}

export default SearchResultItem;
