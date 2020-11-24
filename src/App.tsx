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
const NewOrg = React.lazy(() => import("./pages/organisations/NewOrganisation"));
const UserOrganisations = React.lazy(() => import("./pages/organisations/UserOrganisations"));
const OrganisationJoin = React.lazy(() => import("./pages/organisations/OrganisationJoin"));
const DisplayOrganisation = React.lazy(() => import("./pages/organisations/DisplayOrganisation"));

const ROUTES = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/home",
    Component: AppHome,
  },
  {
    path: "/orgs/new",
    Component: NewOrg
  },
  {
    path: "/orgs",
    Component: UserOrganisations
  },
  {
    path: "/orgs/join",
    Component: OrganisationJoin
  },
  {
    path: "/orgs/:id",
    Component: DisplayOrganisation
  }
];

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
        <Global styles={global} />
        <Router>
          <NavBar />
          <div css={{ flex: "1 0 auto" }}>
            <Switch>
              {ROUTES.map(({ Component, path }) => (
                <Route path={path} key={path} exact={true}>
                  <Suspense fallback={<h1 css={{ textAlign: "center" }}>Loading...</h1>}>
                    <Component />
                  </Suspense>
                </Route>
              ))}
            </Switch>
          </div>
          <div css={{ flexShrink: 0 }}>
            <Footer />
          </div>
        </Router>
    </ReactQueryCacheProvider>
  );
}

export default App;
