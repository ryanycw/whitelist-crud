import { React, useEffect, useState } from "react";
import { Link } from 'components';

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
        <div>
            <h1>Whitelist</h1>
            <Link href="/whitelists/add" className="btn btn-sm btn-success mb-2">Add Whitelist Record</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '0%' }}>Id</th>
                        <th style={{ width: '30%' }}>Address</th>
                        <th style={{ width: '15%' }}>Max Quantity</th>
                        <th style={{ width: '55%' }}>Signed Signature</th>
                        <th style={{ width: '0%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, idx)  =>
                        <tr key={idx}>
                            <td>{idx}</td>
                            <td>{item.address.slice(0,10)} {"..."} {item.address.slice(-10)}</td>
                            <td>{item.maxQuantity}</td>
                            <td>{item.signedSinature.slice(0,20)} {"..."} {item.signedSinature.slice(-20)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/whitelists/edit/${idx}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(idx)} className="btn btn-sm btn-danger btn-delete-user" disabled={item.isDeleting}>
                                    {item.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!data &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {data && !data.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Whitelist Records To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {/*<div className={styles.newItem}>
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
            </div>*/}
        </div>
    );
}
export default Whitelist;
