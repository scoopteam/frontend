/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Formik, Field, Form, ErrorMessage } from "formik";
import colours from "../colours";
import styles, { errorStyles } from "./formUtils";


export default function LoginForm(props: Record<string, any>) {
    let { showModal } = props;

    return <div css={{display: "flex", textAlign: "center", flexDirection: "column", width: "100%"}}>
        <h2>Welcome back</h2>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors: Record<string, string> = {};
                
                if (!values.email) {
                    errors["email"] = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors["email"] = 'Invalid email address';
                }

                if (!values.password) {
                    errors["password"] = "Required"
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
            >
            {({ isSubmitting, errors, touched }) => (
                <Form css={styles}>
                    <label>Email</label>
                    <Field css={errorStyles(errors, touched, "email")} type="email" name="email" />
                    <ErrorMessage name="email" component="span" />
                    <label>Password</label>
                    <Field css={errorStyles(errors, touched, "password")} type="password" name="password" />
                    <ErrorMessage name="password" component="span" />
                    <button type="submit" disabled={isSubmitting}>
                        Login
                    </button>
                    <button css={{border: 'none', backgroundColor: colours.softRed + " !important", color: 'white', fontWeight: 900, paddingTop: "5px", paddingBottom: "5px"}} onClick={() => showModal(false)}>Cancel</button>
                </Form>
            )}
        </Formik>

    </div>
}
