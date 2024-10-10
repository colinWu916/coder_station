import { useState } from "react";
import { Layout } from 'antd';
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import "./css/App.css";

import RouteConfig from "./router/index"
import LoginForm from "./components/LoginForm"

const { Header, Footer, Content } = Layout;

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal(){
    setIsModalOpen(false);
  }

  function loginHandle(){
    setIsModalOpen(true);
  }


  return (
    <div className="App">
      <Header className="header">
        <NavHeader loginHandle={loginHandle}/>
      </Header>
      <Content className="content">
        <RouteConfig />
      </Content>
      <Footer className="footer">
        <PageFooter />
      </Footer>
      <LoginForm isShow={isModalOpen} closeModal={closeModal}/>
    </div>
  );
}

export default App;
