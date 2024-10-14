import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Comment,
  Avatar,
  Button,
  Input,
  Form,
  message,
  List,
  Tooltip,
  Pagination,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  addComment,
  getIssueCommentById,
  getBookCommentById,
} from "../api/comment";
import { getUserById } from "../api/user";
import { formatDate } from "../utils/tools";
import { updateIssue } from "../api/issue";
import { updateBook } from "../api/book";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { updateUserInfoAsync } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import styles from "../css/Discuss.module.css";

/**
 * 评论组件
 */
function Discuss(props) {
  const { userInfo, isLogin } = useSelector((state) => state.user);
  const [value, setValue] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const [pageInfo, setPageInfo] = useState({
    current: 1, // 当前是第一页
    pageSize: 10, // 每一页显示 10 条数据
    total: 0, // 数据的总条数
  });
  const editorRef = useRef();

  useEffect(() => {
    async function fetchCommentList() {
      let data = null;
      if (props.commentType === 1) {
        // 传递过来的是问答的 id，所以需要获取该问答 id 所对应的评论
        const result = await getIssueCommentById(props.targetId, {
          current: pageInfo.current,
          pageSize: pageInfo.pageSize,
        });
        data = result.data;
      } else if (props.commentType === 2) {
        const result = await getBookCommentById(props.targetId, {
          current: 1,
          pageSize: 10,
        });
        data = result.data;
      }
      for (let i = 0; i < data.data.length; i++) {
        const result = await getUserById(data.data[i].userId);
        // 将用户的信息添加到评论对象上面
        data.data[i].userInfo = result.data;
      }
      // 更新评论数据
      setCommentList(data.data);
      // 更新分页数据
      setPageInfo({
        currentPage: data.currentPage,
        eachPage: data.eachPage,
        count: data.count,
        totalPage: data.totalPage,
      });
    }
    if (props.targetId) {
      fetchCommentList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.targetId, refresh]);

  // 根据登录状态进行头像处理
  let avatar = null;
  if (isLogin) {
    avatar = <Avatar src={"/assets" + userInfo.avatar} alt="用户头像" />;
  } else {
    avatar = <Avatar icon={<UserOutlined />} />;
  }

  function onSubmit() {
    let newComment = null;
    if (props.commentType === 1) {
      // 说明是新增问答的评论
      newComment = editorRef.current.getInstance().getHTML();
    } else if (props.commentType === 2) {
      newComment = value;
    }
    if (newComment === "<p><br></p>") {
      newComment = "";
    }
    if (!newComment) {
      message.warning("请输入评论内容");
      return;
    } else {
      // 提交评论
      addComment({
        userId: userInfo._id,
        bookId: props.bookInfo?._id,
        issueId: props.issueInfo?._id,
        typeId: props.issueInfo
          ? props.issueInfo.typeId
          : props.bookInfo.typeId,
        commentContent: newComment,
        commentType: props.commentType,
      });

      // 该条问答或者书籍的评论数量加一
      if (props.commentType === 1) {
        // 问答评论数 +1
        updateIssue(props.issueInfo._id, {
          commentNumber: ++props.issueInfo.commentNumber,
        });
        // 增加对应用户的积分
        dispatch(
          updateUserInfoAsync({
            userId: userInfo._id,
            newInfo: {points: userInfo.points + 4}
          })
        );
        message.success("评论添加成功，积分+4");
        editorRef.current.getInstance().setHTML("");
      } else if (props.commentType === 2) {
        // 书籍评论数 + 1
        updateBook(props.bookInfo._id, {
          commentNumber: ++props.bookInfo.commentNumber,
        });
        // 增加对应用户的积分
        dispatch(
          updateUserInfoAsync({
            userId: userInfo._id,
            newInfo: {points: userInfo.points + 2}
          })
        );
        message.success("评论添加成功，积分+2");
        setValue("");
      }
      setRefresh(!refresh);
    }
  }

  return (
    <div>
      <Comment
        avatar={avatar}
        content={
          <>
            <Form.Item>
              {props?.commentType === 1 ? (
                <Editor
                  initialValue=""
                  previewStyle="vertical"
                  height="270px"
                  initialEditType="wysiwyg"
                  useCommandShortcut={true}
                  language="zh-CN"
                  ref={editorRef}
                  className="editor"
                />
              ) : (
                <Input.TextArea
                  rows={4}
                  placeholder={isLogin ? "" : "请登录后评论..."}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                disabled={isLogin ? false : true}
                onClick={onSubmit}
              >
                添加评论
              </Button>
            </Form.Item>
          </>
        }
      />

      {commentList?.length > 0 && (
        <List
          header="当前评论"
          dataSource={commentList}
          itemLayout="horizontal"
          renderItem={(item) => (
            <Comment
              avatar={<Avatar src={"/assets" + item.userInfo.avatar} />}
              content={
                <div
                  dangerouslySetInnerHTML={{ __html: item.commentContent }}
                ></div>
              }
              datetime={
                <Tooltip title={formatDate(item.commentDate, "year")}>
                  <span>{formatDate(item.commentDate, "year")}</span>
                </Tooltip>
              }
            />
          )}
        />
      )}

      {/* 分页 */}
      {commentList.length > 0 ? (
        <div className={styles.paginationContainer}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            total={pageInfo.total}
          />
        </div>
      ) : (
        <div
          style={{
            fontWeight: "200",
            textAlign: "center",
            margin: "50px",
          }}
        >
          暂无评论
        </div>
      )}
    </div>
  );
}

export default Discuss;
