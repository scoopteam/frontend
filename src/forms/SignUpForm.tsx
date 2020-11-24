/** @jsx jsx */

import { jsx } from "@emotion/core";

import { useHistory } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import colours from "../colours";
import styles, { errorStyles } from "./formUtils";

import { createUser } from "../api/users";
import { humanizeFieldName } from "../utils";

import userTokenStore from "../stores/token";

import { useQueryCache } from "react-query";


export default function SignUpForm(props: Record<string, any>) {
    const queryCache = useQueryCache();
    let { showModal } = props;
    const history = useHistory();

    return <div css={{ display: "flex", textAlign: "center", flexDirection: "column", width: "100%" }}>
        <h1>Sign up for Scoop</h1>
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
            onSubmit={(values, { setSubmitting, setErrors }) => {
                createUser(values).then(created => {
                    let unsubscribe = userTokenStore.subscribe(() => {
                        history.push("/home");
                        queryCache.invalidateQueries("userData");
                        unsubscribe();
                    });
                    userTokenStore.dispatch({ type: 'token/set', payload: created.data!.token })
                }).catch(error => {
                    if (error.isAxiosError) {
                        let errors: Record<string, string> = {};

                        Object.keys(error.response.data.errors).forEach((field: string) => {
                            errors[field] = humanizeFieldName(field) + " " + error.response.data.errors[field][0]
                        })

                        setErrors(errors);
                        setSubmitting(false);
                    }
                })
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form css={styles}>
                    <label>Full name</label>
                    <Field css={errorStyles(errors, touched, "full_name")} type="text" name="full_name" />
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
                    <button type="submit" disabled={isSubmitting}>
                        Sign Up
                    </button>
                    <button type="button" css={{ border: 'none', backgroundColor: colours.softRed + " !important", color: 'white', fontWeight: 900, paddingTop: "5px", paddingBottom: "5px" }} onClick={() => showModal(false)}>Cancel</button>
                </Form>
            )}
        </Formik>

    </div>
}
