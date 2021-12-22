import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "./modal";
import { Login } from "../../main/login";
import { logoutAction } from "../../store/actions/user";
import { SignUp } from "../../main/signup";
import { AppRootState } from "../../store/reducers";

import styles from "./header.module.css";

export function Header() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const user = useSelector(({ user }: AppRootState) => user);

  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
  };
  const closeSignupModal = () => {
    setSignupModalIsOpen(false);
  };
  const actionsRight = (
    <div>
      {user.loggedIn ? (
        <button className={styles.loginBtn} onClick={() => logoutAction()}>
          Logout
        </button>
      ) : (
        <>
          <button
            className={styles.loginBtn}
            onClick={() => setLoginModalIsOpen(true)}
          >
            Login
          </button>
          <button
            className={styles.signUpBtn}
            onClick={() => setSignupModalIsOpen(true)}
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <img
          src="https://betway.com/doc-centre/assets/betway-logo-white-sml.png"
          alt="Betway"
        />
        {actionsRight}
      </div>
      {loginModalIsOpen && (
        <Modal
          title="Login"
          content={<Login onLoginCallback={closeLoginModal} />}
          onClose={closeLoginModal}
        />
      )}
      {signupModalIsOpen && (
        <Modal
          title="Sign Up"
          content={<SignUp onSignupCallback={closeSignupModal} />}
          onClose={closeSignupModal}
        />
      )}
    </>
  );
}
