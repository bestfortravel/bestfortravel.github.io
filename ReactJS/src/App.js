import logo from './logo.svg';
import './App.scss';

//Components
import Header from './components/Header';

//Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Map from './pages/Map';
import Terms from './pages/Terms';
import Albums from './pages/Albums';
import AlbumDetails from './pages/AlbumDetails';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

import ProtectedRoute from './components/ProtectedRoute';

//Layouts
import Layout from './Layout';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Home page has no header */}
      <Route path='/' element={<Home />} />

      {/* All these pages use the Layout (with Header) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/map' element={<Map />} />
          <Route path='/albums' element={<Albums />} />
          <Route path='/albums/:id' element={<AlbumDetails />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
