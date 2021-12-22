import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { store } from "./store/store";
import { Header } from "./common/components/header";
import { Navigation } from "./common/components/navigation";
import { JoinNow } from "./common/components/joinNow";
import { appRoutes } from "./common/constants";

import styles from "./app.module.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.main}>
          <div className={styles.background} />
          <Header />
          <Navigation />
          <Routes>
            {appRoutes.map(r => (
              <Route key={r.name} path={r.route} element={r.component} />
            ))}
          </Routes>
          <JoinNow />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
