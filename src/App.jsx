import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Auth/Login';
import Register from './Auth/register';
import DetailArticle from './Pages/DetailArticle/[id]';
import ProfileUser from './Pages/Profile/ProfileUser';
import Articles from './Pages/Articles/Articles';
import ListArticle from './Pages/ListArticle/ListArticle';
import RequireAuth from './Auth/RequireAuth';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/article/:id' element={<RequireAuth><DetailArticle /></RequireAuth>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<RequireAuth><ProfileUser /></RequireAuth>} />
          <Route path='/profile/article/create' element={<RequireAuth><Articles /></RequireAuth>} />
          <Route path='/profile/article/list' element={<RequireAuth><ListArticle /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
