import { Route, Routes, Navigate } from "react-router-dom";

// 引入页面
import Issues from '../pages/Issues';
import Books from '../pages/Books';
import Interviews from '../pages/Interviews';
import AddIssue from "../pages/AddIssue.jsx";
import IssueDetail from "../pages/IssueDetail";
import BookDetail from "../pages/BookDetail.jsx";
import NotFound from "../pages/NotFound.jsx";
import SearchPage from "../pages/SearchPage";
import Personal from "../pages/Personal"

function RouteConfig() {
  return (
    <Routes>
      <Route path='/issues' element={<Issues />}></Route>
      <Route path="/issues/:id" element={<IssueDetail />} />
      <Route path='/books' element={<Books />}></Route>
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path='/interviews' element={<Interviews />}></Route>
      <Route path="/addIssue" element={<AddIssue />} />
      <Route path="/searchPage" element={<SearchPage />} />
      <Route path="/personal" element={<Personal />} />
      <Route path='/' element={<Navigate replace to='/issues' />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RouteConfig;