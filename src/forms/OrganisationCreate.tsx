/** @jsx jsx */

import { jsx } from "@emotion/core";

import { useHistory } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import colours from "../colours";
import styles, { errorStyles } from "./formUtils";

import { createOrganisation } from "../api/organisation";
import { humanizeFieldName } from "../utils";

import userTokenStore from "../stores/token";


export default function SignUpForm(props: Record<string, any>) {
    let { showModal } = props;
    const history = useHistory();

    return <div css={{ display: "flex", textAlign: "center", flexDirection: "column", width: "100%" }}>
        <h2>Sign up for Scoop</h2>
        <Formik
            initialValues={{ name: '' }}
            validate={values => {
                const errors: Record<string, string> = {};

                if (!values.name) {
                    errors["name"] = "Required"
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                createOrganisation(values).then(created => {
                    let unsubscribe = userTokenStore.subscribe(() => {
                        history.push("/hom");
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
                    <label>Organisation name</label>
                    <Field css={errorStyles(errors, touched, "name")} type="text" name="name" />
                    <ErrorMessage name="name" component="span" />
                    <button type="submit" disabled={isSubmitting}>
                        Create organisation
                    </button>
                    <button type="button" css={{ border: 'none', backgroundColor: colours.softRed + " !important", color: 'white', fontWeight: 900, paddingTop: "5px", paddingBottom: "5px" }} onClick={() => showModal(false)}>Cancel</button>
                </Form>
            )}
        </Formik>

    </div>
}
