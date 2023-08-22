import { Route, Routes } from 'react-router-dom';
import PageLayout from './layouts/PageLayout/PageLayout';
import Home from './pages/Home/Home';
import Blogs from './pages/Blogs/Blogs';
import Salons from './pages/Salons/Salons';
import BlogDetail from './pages/BlogDetail/BlogDetail';

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:id' element={<BlogDetail />} />
        <Route path='/salons' element={<Salons />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
