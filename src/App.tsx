/** @jsxFrag React.Fragment */
/** @jsx jsx */
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { QueryCache, ReactQueryCacheProvider } from "react-query";

import { Global, jsx } from "@emotion/core";

import LandingPage from "./pages/LandingPage";

import global from "./global";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Suspense } from "react";
import React from "react";

const queryCache = new QueryCache();

const AppHome = React.lazy(() => import("./pages/AppHome"));

const ROUTES = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/home",
    Component: AppHome,
  },
];

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <div>
        <Global styles={global} />
        <Router>
          <NavBar />
          <Switch>
            {ROUTES.map(({ Component, path }) => (
              <Route path={path} key={path} exact={true}>
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Component />
                </Suspense>
              </Route>
            ))}
          </Switch>
          <Footer />
        </Router>
      </div>
    </ReactQueryCacheProvider>
  );
}

export default App;
