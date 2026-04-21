import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>ID: {user?.id}</p>
      <p>Opening Balance: ₹{user?.opbal}</p>
    </div>
  );
}

export default Dashboard;