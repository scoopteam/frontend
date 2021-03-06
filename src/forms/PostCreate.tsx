/** @jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";

import { Formik, Field, Form, ErrorMessage } from "formik";
import styles, { errorStyles } from "./formUtils";

import RichTextEditor from 'react-rte';
import { createPost } from "../api/post";
import { useHistory, useParams } from "react-router-dom";
import { humanizeFieldName } from "../utils";
import { useQueryCache } from "react-query";


export default function PostCreateForm(props: Record<string, any>) {
    const queryCache = useQueryCache();
    const history = useHistory();
    const { org_id, group_id } = useParams<{ org_id: string, group_id: string}>();

    const [editorState, setEditorState] = useState(() => RichTextEditor.createEmptyValue());

    return <div>
        <Formik
        initialValues={{ title: '', content: '' }}
        validate={values => {
            const errors: Record<string, string> = {};

            if (!values.title) {
                errors["title"] = "Required"
            }

            return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
            createPost(org_id, group_id, values.title, editorState.toString("markdown")).then(() => {
                setSubmitting(false);
                queryCache.invalidateQueries("feedData").then(() => history.push("/home"))
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
        {({ isSubmitting, errors, touched, setFieldValue, setTouched }) => (
            
            <div css={css`
            justify-content: center;
            display: flex;

            h1 {
                text-align: center;
            }
            `}>
                <Form css={styles}>
                    <h1>Create post</h1>
                    <label>Post title</label>
                    <Field css={errorStyles(errors, touched, "title")} type="text" name="title" placeholder="What is the answer to life, the universe and everything?" />
                    <ErrorMessage name="title" component="span" />

                    {/* Rich text editor component for markdown editing */}
                    <RichTextEditor css={errorStyles(errors, touched, "content")} value={editorState} onChange={(value) => {
                        setEditorState(value)
                        setFieldValue("content", value.toString("markdown"))
                        setTouched({ content: true })
                    }} className="text-editor" />
                    <ErrorMessage name="content" component="span" />
                    <button type="submit" disabled={isSubmitting}>
                        Publish post
                    </button>
                </Form>
            </div>
        )}
    </Formik>
    </div>
}
