/** @jsx jsx */
import { useHistory, useParams } from "react-router-dom";
import { jsx, css } from "@emotion/core";

import { useQueryCache } from "react-query";

import { Formik, Field, Form, ErrorMessage } from "formik";
import styles, { CheckToggle, errorStyles } from "./formUtils";

import { createGroup } from "../api/group";
import { humanizeFieldName } from "../utils";


export default function NewOrgForm(props: Record<string, any>) {
    const { org_id }: { org_id: string } = useParams();
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
        <h2>Create a new group</h2>
        <Formik
            initialValues={{ name: '', public: false, auto_subscribe: false }}
            validate={values => {
                const errors: Record<string, string> = {};

                if (!values.name) {
                    errors["name"] = "Required"
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                createGroup(org_id, values).then(created => {
                    queryCache.invalidateQueries(`organisation-groups-${org_id}`).then(() => {
                        history.push(`/orgs/${org_id}/groups`);
                    });
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
                        <label>Group name</label>
                        <Field css={errorStyles(errors, touched, "name")} type="text" name="name" placeholder="Cooking club..." />
                        <ErrorMessage name="name" component="span" />

                        <label>Public group (joinable by anyone inside the organisation)</label>
                        <Field css={errorStyles(errors, touched, "public")} component={CheckToggle} name="public" />
                        <ErrorMessage name="public" component="span" />

                        <label>Auto-subscribe (new users automatically become a member of this group)</label>
                        <Field css={errorStyles(errors, touched, "auto_subscribe")} component={CheckToggle} name="auto_subscribe" />
                        <ErrorMessage name="auto_subscribe" component="span" />

                        <button type="submit" disabled={isSubmitting}>
                            Create group
                        </button>
                    </Form>
                </div>
            )}
        </Formik>

    </div>
}
