import React, { useState, useEffect } from "react";
import { userApi } from "../../api/userApi";
import { validateLogin } from "../../common/utils/validation";
import { loginAction } from "../../store/actions/user";

import styles from "./index.module.css";

export function Login({ onLoginCallback }: { onLoginCallback?: () => void }) {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  });
  const [formError, setFormError] = useState<null | string>(null);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const { username, password } = loginDetails;

    if (!username.trim() || !password.trim()) {
      setFormError("All fields are required");
    }

    await userApi.login({
      email: username,
      password
    });

    onLoginCallback && onLoginCallback();
    loginAction();
    console.log(`Welcome, ${username}`);
  };

  useEffect(() => {
    if (loginDetails.username || loginDetails.password) {
      const { valid, message } = validateLogin(
        loginDetails.username,
        loginDetails.password
      );

      setFormError(!valid ? message : null);
    }
  }, [loginDetails]);

  return (
    <>
      <div className={styles.register}>New Customer? Register here</div>
      <div className={styles.container}>
        <div className={styles.fieldRow}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.fieldRow}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={handleOnChange}
          />
        </div>
        {formError && <div className={styles.formError}>{formError}</div>}
        <button className={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>
        <p className={styles.forgotCredentials}>Forgot Username/Password</p>
      </div>
    </>
  );
}
