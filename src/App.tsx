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
const NewGroup = React.lazy(() => import("./pages/organisations/groups/NewGroup"));
const GroupList = React.lazy(() => import("./pages/organisations/groups/GroupList"));
const DisplayGroup = React.lazy(() => import("./pages/organisations/groups/GroupDisplay"));
const BulkAdd = React.lazy(() => import("./pages/organisations/groups/BulkAdd"));

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
  },
  {
    path: "/orgs/:org_id/groups/new",
    Component: NewGroup
  },
  {
    path: "/orgs/:org_id/groups",
    Component: GroupList
  },
  {
    path: "/orgs/:organisation_id/groups/:group_id",
    Component: DisplayGroup
  },
  {
    path: "/orgs/:org_id/groups/:group_id/invite",
    Component: BulkAdd
  },
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
