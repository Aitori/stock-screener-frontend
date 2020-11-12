import React from "react";
import "./styles.scss";
import { CSSTransition } from "react-transition-group";

// component imports
import Stock from "../components/stock";
import FrontPage from "../components/front_page";

const App = () => {
  return (
    <div className="app">
      <CSSTransition
        timeout={1000}
        classNames="page"
        unmountOnExit
      >
        <FrontPage />
      </CSSTransition>
      <CSSTransition
        timeout={1000}
        classNames="page"
        unmountOnExit
      >
        <div className={`app-content`}>
          <Stock />
        </div>
      </CSSTransition>
      <div className="app-background" />
    </div>
  );
};

export default App;
