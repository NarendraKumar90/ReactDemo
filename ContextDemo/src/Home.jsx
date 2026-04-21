import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Home</h2>
      <p>ID: {user?.id}</p>
      <p>Opening Balance: ₹{user?.opbal}</p>
    </div>
  );
}

export default Home;