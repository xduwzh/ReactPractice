import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      Login page
      <Link to="/article">To Article Page</Link>
      <button onClick={() => navigate("/article")}>To Article Page</button>
      <button onClick={() => navigate("/article?id=1001&name=jack")}>
        Search Params
      </button>
      <button onClick={() => navigate("/article/1001/jack111")}>Params</button>
    </div>
  );
};

export default Login;
