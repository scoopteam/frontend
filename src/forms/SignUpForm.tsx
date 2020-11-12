/** @jsx jsx */
import { useRef, useState } from "react";
import { jsx } from "@emotion/core";

import { Formik, Field, Form, ErrorMessage } from "formik";
import colours from "../colours";
import styles, { errorStyles } from "./formUtils";

import { createUser } from "../api/users";

import HCaptcha from '@hcaptcha/react-hcaptcha';

import env from "../env";


export default function SignUpForm(props: Record<string, any>) {
    let { showModal } = props;

    let [captchaToken, setCaptchaToken] = useState<string | null>(null);

    let captchaRef = useRef<any>(null);

    return <div css={{display: "flex", textAlign: "center", flexDirection: "column", width: "100%"}}>
        <h2>Sign up for Scoop</h2>
        <Formik
            initialValues={{ email: '', password: '', captcha: '', confirm_password: '', full_name: '' }}
            validate={values => {
                const errors: Record<string, string> = {};

                if (!values.email) {
                    errors["email"] = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors["email"] = 'Invalid email address';
                }

                if (!values.full_name) {
                    errors["full_name"] = "Required"
                }

                if (!values.password) {
                    errors["password"] = "Required"
                }

                if (values.password !== values.confirm_password) {
                    errors["confirm_password"] = "Does not match"
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                if (!captchaToken) {
                    captchaRef.current.execute();
                    return;
                }

                createUser(values).then(created => {
                    console.log(created);
                })
            }}
            >
            {({ isSubmitting, errors, touched }) => (
                <Form css={styles}>
                    <label>Full name</label>
                    <Field css={errorStyles(errors, touched, "email")} type="text" name="full_name" />
                    <ErrorMessage name="full_name" component="span" />
                    <label>Email</label>
                    <Field css={errorStyles(errors, touched, "email")} type="email" name="email" />
                    <ErrorMessage name="email" component="span" />
                    <label>Password</label>
                    <Field css={errorStyles(errors, touched, "password")} type="password" name="password" />
                    <ErrorMessage name="password" component="span" />
                    <label>Confirm Password</label>
                    <Field css={errorStyles(errors, touched, "confirm_password")} type="password" name="confirm_password" />
                    <ErrorMessage name="confirm_password" component="span" />
                    <HCaptcha
                        sitekey={env.HCAPTCHA_KEY}
                        ref={captchaRef}
                        onVerify={token => setCaptchaToken(token)}
                        onError={() => alert("Error occurred with HCaptcha, please reload the page.")}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        Login
                    </button>
                    <button type="button" css={{border: 'none', backgroundColor: colours.softRed + " !important", color: 'white', fontWeight: 900, paddingTop: "5px", paddingBottom: "5px"}} onClick={() => showModal(false)}>Cancel</button>
                </Form>
            )}
        </Formik>

    </div>
}
