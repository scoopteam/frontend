/** @jsx jsx */
import { useHistory, useParams } from "react-router-dom";
import { jsx, css } from "@emotion/core";

import { Formik, Field, Form, ErrorMessage } from "formik";
import styles, { errorStyles } from "./formUtils";

import { bulkAdd } from "../api/group";
import { humanizeFieldName } from "../utils";
import { useState } from "react";


export default function BulkAddForm(props: Record<string, any>) {
    const { org_id, group_id }: { org_id: string, group_id: string } = useParams();

    const history = useHistory();

    const [message, setMessage] = useState<string>();

    const [failed, setFailed] = useState<string[]>([]);

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
        <h1>Bulk add users</h1>
        <p>{message}</p>
        {failed.length > 0 ? (
            <div css={css`
                display: flex;
                flex-direction: column;

                * {
                    padding: 0;
                    margin: 0;
                }
            `}>
                <p>Failed to add:</p>
                {failed?.map(v => (
                    <p key={v}>{v}</p>
                ))}
            </div>
        ) : null}
        <Formik
            initialValues={{ users: '' }}
            validate={values => {
                const errors: Record<string, string> = {};

                if (!values.users) {
                    errors["name"] = "Required"
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                bulkAdd(org_id, group_id, values.users.split("\n")).then(result => {
                    setSubmitting(false);
                    setMessage(`Successfully added ${result.data!.added.length}`)
                    setFailed(result.data!.failed);
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
                        <label>User emails (separated by a newline)</label>
                        <Field css={errorStyles(errors, touched, "users")} component="textarea" type="textarea" name="users" placeholder="joe@myscoop.dev" />
                        <ErrorMessage name="users" component="span" />

                        <button type="submit" disabled={isSubmitting}>
                            Bulk add
                        </button>

                        <button onClick={() => history.push(`/orgs/${org_id}/groups/${group_id}`)}>
                            Return
                        </button>
                    </Form>
                </div>
            )}
        </Formik>

    </div>
}
