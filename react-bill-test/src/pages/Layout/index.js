import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";

const Layout = () => {
  return (
    <div>
      <Outlet />
      Layout
      <Button color="primary">test</Button>
      <div className="purple">
        <Button color="primary">part</Button>
      </div>
    </div>
  );
};

export default Layout;
