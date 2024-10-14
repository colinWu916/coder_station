import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input, Select } from "antd";
import LoginAvatar from "../components/LoginAvatar";

function NavHeader(props) {
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState("issue");

  function onSearch(value) {
    if (value) {
      // 搜索框有内容，需要进行搜索操作
      navigate("/searchPage", {
        state: {
          value,
          searchOption,
        },
      });
    } else {
      // 搜索框没有内容，跳转到首页
      if(searchOption === 'issue') navigate("/");
      else navigate('/books');
    }
  }

  function onChange(val) {
    setSearchOption(val);
  }

  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      <nav className="navContainer">
        <NavLink to="/" className="navgation">
          问答
        </NavLink>
        <NavLink to="/books" className="navgation">
          书籍
        </NavLink>
        <NavLink to="/interviews" className="navgation">
          面试题
        </NavLink>
        <a
          href="https://duyi.ke.qq.com/"
          className="navgation"
          target="_blank"
          rel="noreferrer"
        >
          视频教程
        </a>
      </nav>
      <div className="searchContainer">
        <Input.Group compact>
          <Select
            defaultValue="issue"
            size="large"
            style={{ width: "20%" }}
            onChange={onChange}
          >
            <Select.Option value="issue">问答</Select.Option>
            <Select.Option value="book">书籍</Select.Option>
          </Select>
          <Input.Search
            placeholder="请输入要搜索的内容"
            allowClear
            enterButton="搜索"
            size="large"
            style={{
              width: "80%",
            }}
            onSearch={onSearch}
          />
        </Input.Group>
      </div>
      <div className="loginBtnContainer">
        <LoginAvatar loginHandle={props.loginHandle} />
      </div>
    </div>
  );
}

export default NavHeader;
