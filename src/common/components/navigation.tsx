import React from "react";
import { useLocation, Link } from "react-router-dom";

import { appRoutes } from "../constants";

import styles from "./navigation.module.css";

export function Navigation() {
  const { pathname } = useLocation();

  return (
    <ul className={styles.container}>
      {appRoutes.map(r => {
        const style =
          pathname === r.route ? { borderBottom: `3px solid ${r.color}` } : {};

        return (
          <li key={r.name} style={style}>
            <Link to={r.route}>{r.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
