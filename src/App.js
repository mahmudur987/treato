import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import Salons from "./pages/Salons/Salons";
import AuthChoicePage from "./components/AuthPages/AuthChoicePage/AuthChoicePage";
import CreateAccountPage from "./components/AuthPages/CreateAccountPage/CreateAccountPage";
import LoginPage from "./components/AuthPages/LoginPage/LoginPage";
import VerifyOTP from "./components/AuthPages/VerifyOTP/VarifyOTP";
import PageLayout from './layouts/PageLayout/PageLayout';
import BlogDetail from './pages/BlogDetail/BlogDetail';

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/auth-choice" exact element={<AuthChoicePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path='/blogs/:id' element={<BlogDetail />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
