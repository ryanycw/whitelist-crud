import { React, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import WhitelistItem from "./WhitelistItem";

function Whitelist() {
    const [data, setData] = useState([]);
    const [newItemAddress, setNewAddress] = useState("");
    const [newItemQnt, setNewQnt] = useState("");

    async function fetchData() {
      const res = await fetch("../api/getItem");
      const newData = await res.json();
      setData(newData);
    }
    useEffect(() => {
      fetchData();
    }, [newItemAddress, newItemQnt]);    

    
    const handleAddress = (e) => {
        setNewAddress(e.target.value);
    };
    const handleQnt = (e) => {
        setNewQnt(e.target.value);
    };
    const HandleSubmit = (e) => {
        console.log(newItemAddress, newItemQnt);
    };

    return (
        <div className={styles.maincont}>
            <h1>Whitelist</h1>
            <div className={styles.newItem}>
                <h3>Add New Whitelist</h3>
                <div className={styles.semi}>
                <input
                    type="text"
                    value={newItemAddress}
                    onChange={(e) => handleAddress(e)}
                ></input>
                <input
                    type="text"
                    value={newItemQnt}
                    onChange={(e) => handleQnt(e)}
                ></input>
                <button onClick={() => HandleSubmit()}>
                    Add Record
                </button>
                </div>
            </div>
            <div>
                {data &&
                    data.map((item, idx) => (
                    <WhitelistItem key={idx} item={item} />
                ))}
            </div>
        </div>
    );
}
export default Whitelist;
