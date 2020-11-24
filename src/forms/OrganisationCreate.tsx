/** @jsx jsx */
import { useHistory } from "react-router-dom";
import { jsx, css } from "@emotion/core";

import { Formik, Field, Form, ErrorMessage } from "formik";
import styles, { errorStyles } from "./formUtils";

import { createOrganisation } from "../api/organisation";
import { humanizeFieldName } from "../utils";


export default function NewOrgForm(props: Record<string, any>) {
    const history = useHistory();

    return <div css={css`
        display: flex;
        text-align: center;
        flex-direction: column;
        width: 100%;

        div {
            display: flex;
            justify-content: center;
        }
    `}>
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
                    history.push(`/orgs`);
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
                <div>
                    <Form css={styles}>
                        <label>Organisation name</label>
                        <Field css={errorStyles(errors, touched, "name")} type="text" name="name" />
                        <ErrorMessage name="name" component="span" />
                        <button type="submit" disabled={isSubmitting}>
                            Create organisation
                        </button>
                    </Form>
                </div>
            )}
        </Formik>

    </div>
}
