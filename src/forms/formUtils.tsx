/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FormikErrors, FormikTouched, Field } from "formik";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import colours from "../colours";

export default css`
display: flex;
flex-direction: column;
text-align: left;
width: 70vw;

label {
    font-weight: bolder;
    padding-bottom: 0;
    font-size: 1.25em;
}

span {
    color: ${colours.softRed};
    font-weight: 900;
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
    font-size: 1.5em;
    background-color: ${colours.lightGrey};
}

button {
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: ${colours.metallicSeaweed};
    color: white;
    font-size: 1.5em;
    font-weight: 900;
    cursor: pointer;
}

button[disabled] {
    filter: brightness(70%);
    cursor: default;
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

export function CheckToggle({ field, form, ...props}: { field: typeof Field, form: Record<any, any> }) {
    return <Toggle css={{alignSelf: "center", margin: "10px"}} name={field.name} onChange={(e) => form.setFieldValue(field.name, e.target.checked)}/>
}
