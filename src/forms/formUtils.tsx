import { css } from "@emotion/core";
import { FormikErrors, FormikTouched } from "formik";

import colours from "../colours";

export default css`
display: flex;
flex-direction: column;
text-align: left;
width: 50vw;

label {
    font-size: 0.5em;
    padding-bottom: 0;
}

span {
    font-size: 0.5em;
    color: ${colours.softRed};
};

input, button {
    border: none;
    margin-bottom: 10px;
    margin-top: 5px;
};

input {
    padding: 10px;
    transition: box-shadow 500ms linear;
    outline: none;
}

button {
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: ${colours.metallicSeaweed};
    color: white;
    font-size: 0.75em;
    font-weight: 900;
}
`

export function errorStyles(errors: FormikErrors<Record<string, string>>, touched: FormikTouched<Record<string, string>>, field: string) {
    if (Object.keys(errors).indexOf(field) !== -1 && Object.keys(touched).indexOf(field) !== -1) {
        return css`
            box-shadow: 0 0 10px ${colours.softRed};
        `
    } else if (Object.keys(touched).indexOf(field) !== -1) {
        return css`
            box-shadow: 0 0 10px ${colours.olivine};
        `
    }
}