/** @jsx jsx */
import { useHistory } from "react-router-dom";
import { jsx, css } from "@emotion/core";

import { useQueryCache } from "react-query";

import { Formik, Field, Form, ErrorMessage } from "formik";
import styles, { errorStyles } from "./formUtils";

import { createOrganisation } from "../api/organisation";
import { humanizeFieldName } from "../utils";


export default function NewOrgForm(props: Record<string, any>) {
    const history = useHistory();
    const queryCache = useQueryCache();

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
        <h2>Create a new organisation</h2>
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
                    queryCache.invalidateQueries("userOrganisations")
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
                        <Field css={errorStyles(errors, touched, "name")} type="text" name="name" placeholder="My Sweet Org!" />
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
