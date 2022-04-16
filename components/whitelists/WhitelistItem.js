import { React, useState } from "react";
import styles from "../../styles/Home.module.css";

function WhitelistItem(data) {

    const handleEdit = () => {
    };

    return (
        <div>
        <span className={styles.eachtodo}>
          <p className={styles.text}>{data.item.address}</p>
          <p className={styles.text}>{data.item.maxQuantity}</p>
          <button onClick={handleEdit}>Edit</button>
        </span>
        <span>
        <p className={styles.text}>{data.item.signedSinature}</p>
        </span>
      </div>
    );
}
export default WhitelistItem;