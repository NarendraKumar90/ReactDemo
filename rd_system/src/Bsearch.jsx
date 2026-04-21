import axios from "axios";
import { useState } from "react";

export default function Bsearch() {

    const [data, setData] = useState("");
    const [searchId, setSearchId] = useState("");

    const get = (id) => {
        if (!id) return; // prevent empty calls

        axios.get("http://localhost:8080/userById/" + id)
            .then(res => {
                console.log(res.data);
                setData(JSON.stringify(res.data)); // show response
            })
            .catch(err => {
                console.log(err);
                setData("User not found");
            });
    };

    return (
        <>
            <center>
                <input
                    type="text"
                    placeholder="Enter ID"
                    value={searchId}
                    onChange={(e) => {
                        const id = e.target.value;
                        setSearchId(id);
                        // get(id);   // 🔥 automatically call API when typing
                        if (id.length > 0) {
                           get(id);
                          }
                          
                    }}
                />

                <h1>{data}</h1>
            </center>
        </>
    );
}