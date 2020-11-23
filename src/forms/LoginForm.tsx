/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Formik, Field, Form, ErrorMessage } from "formik";
import colours from "../colours";
import styles, { errorStyles } from "./formUtils";
import { loginUser } from "../api/users";
import userTokenStore from "../stores/token";

import { useHistory } from "react-router-dom";
import { humanizeFieldName } from "../utils";

export default function LoginForm(props: Record<string, any>) {
  let { showModal } = props;

  let history = useHistory();

  return (
    <div
      css={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <h1>Welcome back</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: Record<string, string> = {};

          if (!values.email) {
            errors["email"] = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors["email"] = "Invalid email address";
          }

          if (!values.password) {
            errors["password"] = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          loginUser(values)
            .then((token) => {
              let unsubscribe = userTokenStore.subscribe(() => {
                history.push("/home");
                unsubscribe();
              });
              userTokenStore.dispatch({
                type: "token/set",
                payload: token.data!.token,
              });
            })
            .catch((error) => {
              if (error.isAxiosError) {
                let errors: Record<string, string> = {};

                Object.keys(error.response.data.errors).forEach(
                  (field: string) => {
                    errors[field] =
                      humanizeFieldName(field) +
                      " " +
                      error.response.data.errors[field][0];
                  }
                );

                setErrors(errors);
                setSubmitting(false);
              }
            });
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form css={styles}>
            <label>Email</label>
            <Field
              css={errorStyles(errors, touched, "email")}
              type="email"
              name="email"
            />
            <ErrorMessage name="email" component="span" />
            <label>Password</label>
            <Field
              css={errorStyles(errors, touched, "password")}
              type="password"
              name="password"
            />
            <ErrorMessage name="password" component="span" />
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
            <button
              type="button"
              css={{
                border: "none",
                backgroundColor: colours.softRed + " !important",
                color: "white",
                fontWeight: 900,
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
              onClick={() => showModal(false)}
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
