import axios from "axios";
import { useState } from "react";

export default function UserPage() {

    const [user, setUser] = useState(null);
    const [searchId, setSearchId] = useState("");
    const [error, setError] = useState("");

    const get = () => {
        if (!searchId) return;

        axios.get("http://localhost:8080/userById/" + searchId)
            .then(res => {
                console.log(res.data);

                const userData = res.data?.data?.[0]?.users;

                if (userData) {
                    setUser(userData);
                    setError("");
                } else {
                    setUser(null);
                    setError("User not found");
                }
            })
            .catch(err => {
                console.log(err);
                setUser(null);
                setError("User not found");
            });
    };

    return (
        <center>
            <h2>Search User</h2>

            {/* <input
                type="text"
                placeholder="Enter ID"
                value={searchId}
                onChange={(e) => 

                 {
                        const id = e.target.value;
                        setSearchId(id);
                        // get(id);   // 🔥 automatically call API when typing
                        if (id.length > 0) {
                           get(id);
                          }}}
                
            /> */}

             <input
                type="text"
                placeholder="Enter ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            />

            <button onClick={get}>Search</button>

            {error && <h3 style={{color: "red"}}>{error}</h3>}

            {user && (
                <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
                    <tbody>
                        <tr><td>Account No</td><td>{user.acno}</td></tr>
                        <tr><td>Name</td><td>{user.name}</td></tr>
                        <tr><td>Gender</td><td>{user.gender}</td></tr>
                        <tr><td>DOB</td><td>{user.dob}</td></tr>
                        <tr><td>Mobile</td><td>{user.mob}</td></tr>
                        <tr><td>Address</td><td>{user.address}</td></tr>
                        <tr><td>Occupation</td><td>{user.occupation}</td></tr>
                        <tr><td>PAN No</td><td>{user.panno}</td></tr>
                        <tr><td>Aadhar No</td><td>{user.adharno}</td></tr>
                        <tr><td>RD Amount</td><td>{user.rdamt}</td></tr>
                        <tr><td>RD Date</td><td>{user.rddate}</td></tr>
                    </tbody>
                </table>
            )}
        </center>
    );
}