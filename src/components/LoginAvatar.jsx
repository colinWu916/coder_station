import React from "react";
import { Button, List, Popover, Avatar, Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo, changeLoginStatus } from '@/redux/userSlice';
import styles from "../css/LoginAvatar.module.css";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';


function LoginAvatar(props) {
  const { isLogin, userInfo } = useSelector((state) => state.user);
  let loginStatus = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function listClickHandle(item) {
    if (item === "个人中心") {
      navigate("/personal");
    } else {
      // 退出登录
      // 清除 token
      localStorage.removeItem("userToken");
      // 清除状态仓库
      dispatch(clearUserInfo);
      dispatch(changeLoginStatus(false));
      navigate("/");
    }
  }



  if (isLogin) {
    const content = (
      <List
        dataSource={["个人中心", "退出登录"]}
        size="large"
        renderItem={(item) => {
          return <List.Item style={{ cursor: "pointer" }} onClick={()=>listClickHandle(item)}>{item}</List.Item>;
        }}
      />
    );
    loginStatus = (
      <Popover content={content} trigger="hover" placement="bottom">
        <div className={styles.avatarContainer}>
          <Avatar src={<Image src={'/assets' + userInfo?.avatar} preview={false}/>} size="large" icon={<UserOutlined />} />
        </div>
      </Popover>
    );
  } else {
    loginStatus = (
      <Button type="primary" size="large" onClick={props.loginHandle}>
        注册/登录
      </Button>
    );
  }

  return (
    <div>
      {loginStatus}
    </div>
  );
}

export default LoginAvatar;
