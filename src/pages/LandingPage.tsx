/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import colours from "../colours";

import Wave from "react-wavify";

function LandingPage() {
    return <div css={{backgroundColor: colours.greenSheen}}>
        <div className="App-content" css={css`
            display: flex;
            color: white;
            flex-direction: column;
            text-align: center;
        `}>
            <h1 css={{margin: 0, fontSize: "8em"}}>Scoop</h1>
            <h3 css={css`
                margin-left: 20px;
                margin-right: 20px;
                margin-bottom: 100px;
                font-weight: normal;
                font-size: 2em;
            `}>
                Scoop is the social media platform for building a community within education.
            </h3>
        </div>
        <div css={css`transform: translateY(5px)`}>
            <Wave
                fill='#ffffff'
                paused={false}
                options={{
                    height: 30,
                    amplitude: 50,
                    speed: 0.15,
                    points: 4
                }}
            />
        </div>
    </div>
}

export default LandingPage;
