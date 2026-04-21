import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    setUser({
      id: 101,
      opbal: 3000
    });

    navigate("/dashboard");
  };


const hlogin = () => {
    setUser({
      id: 101,
      opbal: 3000
    });

    navigate("/home");
  };


  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Dash Login</button>
      <button onClick={hlogin}>Home Login</button>
    </div>
  );
}

export default Login;