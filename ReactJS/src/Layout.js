import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  // define which routes should have full-width header
  const fullWidthRoutes = ['/map', '/albums', '/insights']

  // check if the current route matches one of them
  const isFullWidth = fullWidthRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <Header fullWidth={isFullWidth} />
      <div className='page-content'>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
