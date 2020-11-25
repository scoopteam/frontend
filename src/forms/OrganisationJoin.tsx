/** @jsx jsx */
import { useHistory } from "react-router-dom";
import { jsx, css } from "@emotion/core";

import { useQueryCache } from "react-query";

import { Formik, Field, Form, ErrorMessage } from "formik";
import styles, { errorStyles } from "./formUtils";

import { joinOrganisation } from "../api/organisation";


export default function OrgJoinForm(props: Record<string, any>) {
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
        <h1>Join an organisation</h1>
        <Formik
            initialValues={{ code: '' }}
            validate={values => {
                const errors: Record<string, string> = {};

                if (!values.code) {
                    errors["code"] = "Required"
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                joinOrganisation(values.code).then(() => {
                    queryCache.invalidateQueries("userOrganisations")
                    history.push(`/orgs`);
                }).catch(error => {
                    if (error.isAxiosError) {
                        let errors: Record<string, string> = {};

                        if (error.response.data.errors.org_id) {
                            errors["code"] = "You've already joined this organisation"
                        } else {
                            errors["code"] = "Code not found"
                        }

                        setErrors(errors);
                        setSubmitting(false);
                    }
                })
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <div>
                    <Form css={styles}>
                        <label>Organisation code</label>
                        <Field css={errorStyles(errors, touched, "code")} type="text" name="code" placeholder="Enter code..." />
                        <ErrorMessage name="code" component="span" />
                        <button type="submit" disabled={isSubmitting}>
                            Join organisation
                        </button>
                    </Form>
                </div>
            )}
        </Formik>

    </div>
}
