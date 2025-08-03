import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      1 class router
      <Link to="/">Board</Link>
      <Link to="/about">About</Link>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
