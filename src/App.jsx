import { useState, useEffect } from "react";
import { Layout, message } from 'antd';
import {getInfo, getUserById} from "./api/user";
import { changeLoginStatus, initUserInfo } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import "./css/App.css";

import RouteConfig from "./router/index"
import LoginForm from "./components/LoginForm"

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  // 加载根组件的时候，需要恢复用户的登录状态
  useEffect(() => {
    async function fetchData() {
      const result = await getInfo();
      if (result.data) {
        // 说明 token 有效
        // 获取该 id 对应的用户信息，存储到状态仓库
        const { data } = await getUserById(result.data._id);
        // 存储到状态仓库
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
      } else {
        // 说明 token 过期了
        message.warning(result.msg);
        localStorage.removeItem("userToken");
      }
    }
    if (localStorage.getItem("userToken")) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal() {
    setIsModalOpen(false);
  }

  function loginHandle() {
    setIsModalOpen(true);
  }

  return (
    <div className="App">
      <Header className="header">
        <NavHeader loginHandle={loginHandle} />
      </Header>
      <Content className="content">
        <RouteConfig />
      </Content>
      <Footer className="footer">
        <PageFooter />
      </Footer>
      <LoginForm isShow={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
