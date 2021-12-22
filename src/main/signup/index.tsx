import { useState } from "react";

import { emailIsValid } from "../../common/utils/validation";

import styles from "./index.module.css";

export function SignUp({ onSignupCallback }: { onSignupCallback: () => void }) {
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [formError, setFormError] = useState<null | string>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!emailIsValid(e.target.value)) {
      setFormError("Email is invalid");
      return;
    }

    setFormError(null);
  };

  return (
    <div className={styles.contentContainer}>
      {signupSuccess ? (
        <>
          <div className={styles.successMsg}>Sign up successful!</div>
          <button onClick={onSignupCallback}>Close</button>
        </>
      ) : (
        <>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleOnChange}
          />
          {formError && <div className={styles.error}>{formError}</div>}
          <button onClick={() => setSignupSuccess(true)}>Sign Up</button>
        </>
      )}
    </div>
  );
}
