import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "./modal";
import { AppRootState } from "../../store/reducers";
import styles from "./joinNow.module.css";


export function JoinNow() {
  const userLoggedIn = useSelector(({ user }: AppRootState) => user.loggedIn);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (userLoggedIn) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>SPORTS NEW CUSTOMER OFFER</p>
        <p>Get up to £10 in Free Bets</p>
        <button className={styles.joinBtn} onClick={() => setModalIsOpen(true)}>
          Join Now
        </button>
      </div>
      {modalIsOpen && (
        <Modal
          title="Join Now"
          content={<div>JOIN NOW TO GET FREE BETS!!!</div>}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </div>
  );
}
