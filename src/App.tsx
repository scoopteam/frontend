/** @jsxFrag React.Fragment */
/** @jsx jsx */
import NavBar from './components/NavBar';

import { Global, jsx, css } from "@emotion/core";

import LandingPage from "./pages/LandingPage";

function App() {
  const global = css`
    @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap');

    body {
      margin: 0;
      font-family: 'Alegreya Sans', 'Arial', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }`;

  const appStyles = css`
    padding-bottom: 0px;
    margin-bottom: 0px;
  `;

  return (
    <div>
      <Global styles={global}/>
      <div css={appStyles}>
        <NavBar/>
        <LandingPage/>
      </div>
    </div>
  );
}

export default App;
