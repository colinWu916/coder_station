import { useState, useEffect } from 'react';

import PageHeader from "../components/PageHeader";
import IssueItem from "../components/IssueItem";
import { Pagination } from "antd";
import { getIssueByPage } from "../api/issue";
import AddIssueBtn from "../components/AddIssueBtn.jsx";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank"
import TypeSelect from "../components/TypeSelect";
import styles from "../css/Issue.module.css";
import { useSelector } from "react-redux";

function Issues(props) {
  // 用于存储获取到的状态列表
  const [issueInfo, setIssueInfo] = useState([]);
  // 分页信息
  const [pageInfo, setPageInfo] = useState({
    current: 1, // 当前是第一页
    pageSize: 15, // 每一页显示 15 条数据
    total: 0, // 数据的总条数
  });

  const { issueTypeId } = useSelector(state => state.type);

  function handlePageChange(current, pageSize) {
    setPageInfo({
      current,
      pageSize,
    });
  }

  useEffect(() => {
    async function fetchData() {
      let searchParams = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      };
      if (issueTypeId !== "all") {
        // 用户点击了分类的，那么就需要根据分类来渲染
        searchParams.typeId = issueTypeId;
        // 如果按照分类来进行查询，需要重新将当前页设置为第一页
        searchParams.current = 1;
      }
      const { data } = await getIssueByPage(searchParams);
      setIssueInfo(data.data);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo.current, pageInfo.pageSize, issueTypeId]);

  let issueList = [];

  for (let i = 0; i < issueInfo.length; i++) {
    issueList.push(<IssueItem key={i} issueInfo={issueInfo[i]} />);
  }

  return (
    <div className={styles.container}>
      {/* 上面的头部 */}
      <PageHeader title="问答列表">
        <TypeSelect />
      </PageHeader>
      {/* 下面的列表内容区域 */}
      <div className={styles.issueContainer}>
        {/* 左边区域 */}
        <div className={styles.leftSide}>
          {issueList}
          <div className="paginationContainer">
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              {...pageInfo}
              onChange={handlePageChange}
            />
          </div>
        </div>
        {/* 右边区域 */}
        <div className={styles.rightSide}>
          <AddIssueBtn />
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <Recommend />
          </div>
          <ScoreRank />
        </div>
      </div>
    </div>
  );
}

export default Issues;
