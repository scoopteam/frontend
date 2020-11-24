/** @jsx jsx */
import { useHistory } from "react-router-dom";
import { jsx, css } from "@emotion/core";

import { Formik, Field, Form, ErrorMessage } from "formik";
import styles, { errorStyles } from "./formUtils";

import { joinOrganisation } from "../api/organisation";
import { humanizeFieldName } from "../utils";


export default function OrgJoinForm(props: Record<string, any>) {
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
        <h2>Join an organisation</h2>
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
                    history.push(`/orgs`);
                }).catch(error => {
                    if (error.isAxiosError) {
                        let errors: Record<string, string> = {};

                        if (error.response.data.errors.org_id) {
                            errors["code"] = "You've already joined this organisation"
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
                        <Field css={errorStyles(errors, touched, "code")} type="text" name="code" />
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
