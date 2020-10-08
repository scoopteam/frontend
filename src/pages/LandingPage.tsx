/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import colours from "../colours";

import Wave from "react-wavify";
import { useState } from "react";

import Modal from "react-modal";

const modalStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background            : 'none',
        border                : 'none',
        color                 : 'white'
    },
    overlay: {
        backgroundColor       : colours.greenSheen
    }
};

const buttonStyles = css`
* {
    margin-left: 10px;
    margin-right: 10px;
    border: none;

    padding-left: 20px;
    padding-right: 20px;

    padding-top: 10px;
    padding-bottom: 10px;
    
    font-size: 2em;
    color: white;
    background-color: ${colours.metallicSeaweed};
    border-radius: 10px;

    font-family: "Alegreya Sans", Arial, Helvetica, sans-serif;
    font-weight: 600;

    outline: none;

    transition: filter 200ms, transform 200ms;

    &:hover {
        filter: brightness(90%);
        transform: scale(1.05);
        cursor: pointer;
    }
}
`;

function LandingPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [formMode, setFormMode] = useState("login");

    function openModal(mode: string) {
        setFormMode(mode);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    return <div>
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            contentLabel="LoginModal"
            style={modalStyles}
            closeTimeoutMS={400}
        >
            <h1 css={{fontSize: "4em"}}>{formMode === "login" ? "Login" : "Sign up"}</h1>
        </Modal>

        <div css={{ backgroundColor: colours.greenSheen }}>
            <div css={css`
            display: flex;
            color: white;
            flex-direction: column;
            text-align: center;
        `}>
                <h1 css={{ margin: 0, fontSize: "8em" }}>Scoop</h1>
                <h3 css={css`
                    margin-left: 20px;
                    margin-right: 20px;
                    margin-bottom: 100px;
                    font-weight: normal;
                    font-size: 2em;
                `}>
                    Scoop is the social media platform for building a community within education.
                </h3>
                <div css={buttonStyles}>
                    <button onClick={() => openModal("sign_up")}>
                        Sign up
                    </button>

                    <button onClick={() => openModal("login")}>
                        Login
                    </button>
                </div>
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
        <div css={css`
            display: flex;
            text-align: center;
            justify-content: center;
            flex-direction: column;
        `}>
            <h1 css={{fontSize: "3em"}}>Why choose Scoop?</h1>
            <div css={css`
                display: flex;
                text-align: center;
                justify-content: center;
                margin-left: 30px;
                margin-right: 30px;
                flex-wrap: wrap;
            `}>
                <div css={{width: "450px", margin: "30px"}}>
                    <h2>Auditable</h2>
                    <p>Scoop brings a set of tools to moderate student generated content. Safety is the top-consideration with all features of the product. We ensure that all data generated by your organisation can be viewed quickly in a format optimised for anyone.</p>
                </div>
                <div css={{width: "450px", margin: "30px"}}>
                    <h2>Open source</h2>
                    <p>Scoop is a fully open-source application. The source code can be found on <a href={"https://github.com/scoopteam"}>GitHub</a> and should your IT department feel it is necessary school can run their own instance of Scoop for full management. We collect anonymomus analytics to provide a good experience but no data is collected and provided to third parties.</p>
                </div>
                <div css={{width: "450px", margin: "30px"}}>
                    <h2>Flexible</h2>
                    <p>Scoop provides many tools for customising what your students see. You can use school branding, define layouts for news and much more. Scoop allows you to integrate with services such as Microsoft Active Directory to register your users.</p>
                </div>
            </div>
        </div>
    </div>
}

export default LandingPage;
