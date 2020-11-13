/** @jsxFrag React.Fragment */
/** @jsx jsx */
import NavBar from './components/NavBar';
import Footer from "./components/Footer";

import { Global, jsx } from "@emotion/core";

import LandingPage from "./pages/LandingPage";
import AppHome from "./pages/AppHome";

import global from "./global";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const ROUTES = [
  {
    path: "/",
    Component: LandingPage
  },
  {
    path: "/app",
    Component: AppHome
  }
]

function App() {
  return (
    <div>
      <Global styles={global}/>
      <Router>
        <NavBar/>
        <Switch>
          {ROUTES.map(({Component, path}) => (
            <Route path={path} key={path} exact={true}>
              <Component/>
            </Route>
          ))}
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
