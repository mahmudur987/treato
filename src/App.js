import { Route, Routes } from 'react-router-dom';
import PageLayout from './layouts/PageLayout/PageLayout';
import Home from './pages/Home/Home';
import Blogs from './pages/Blogs/Blogs';
import Salons from './pages/Salons/Salons';
import AuthChoicePage from './pages/AuthPages/AuthChoicePage/AuthChoicePage';
import CreateAccountPage from './pages/AuthPages/CreateAccountPage/CreateAccountPage';
import LoginPage from './pages/AuthPages/LoginPage/LoginPage';

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/salons' element={<Salons />} />
        <Route path="/auth-choice" exact element={<AuthChoicePage/>} />
        <Route path="/create-account" element={<CreateAccountPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </PageLayout>
  );
}

export default App;
