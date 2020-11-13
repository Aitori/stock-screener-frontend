import React, { useRef } from "react";
import "./styles.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

// component imports
import Stock from "../components/stock";
import FrontPage from "../components/front_page";
import NavBar from "../components/nav_bar";

const App = () => {
  const nodeRefFrontPage = useRef(null);
  const nodeRefStock = useRef(null);
  return (
    <Router>
      <div className="app">
        <div className="app-background" />
        <div className="app-navbar">
          <NavBar />
        </div>
        <div className="app-content">
          <Route exact path="/">
            {({ match }) => (
              <CSSTransition
                nodeRef={nodeRefFrontPage}
                in={match != null}
                timeout={1000}
                classNames="page"
                unmountOnExit
              >
                <FrontPage ref={nodeRefFrontPage} />
              </CSSTransition>
            )}
          </Route>
        </div>
        <div className="app-content">
          <Route path="/:ticker">
            {({ match }) => (
              <CSSTransition
                nodeRef={nodeRefStock}
                in={match != null}
                timeout={1000}
                classNames="page"
                unmountOnExit
              >
                <Stock ref={nodeRefStock} />
              </CSSTransition>
            )}
          </Route>
        </div>
      </div>
    </Router>
  );
};

export default App;
