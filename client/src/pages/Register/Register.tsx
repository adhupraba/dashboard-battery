import { FC, useState } from "react";
import { containerTitleStyles } from "src/constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, restApi } from "src/utils";
import { useAuthCtx } from "src/context";
import { ErrorType } from "types";

type IRegisterProps = {};

export const Register: FC<IRegisterProps> = () => {
  const { setToken, setUser } = useAuthCtx();
  const [apiErrors, setApiErrors] = useState<ErrorType[]>([]);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "*Name must have at least 2 characters")
      .max(100, "*Name can't be longer than 100 characters")
      .matches(/^[A-Za-z]+[A-Za-z\s]{1,250}$/, "*Name must be in a proper format")
      .required("*Name is required"),
    email: Yup.string()
      .min(5, "*Email must have at least 2 characters")
      .max(250, "*Email can't be longer than 250 characters")
      .email("*Must be a valid email address")
      .required("*Email is required"),
    password: Yup.string()
      .min(4, "*Password must have at least 4 characters")
      .max(20, "*Password can't be longer than 20 characters")
      .required("*Password is required"),
  });

  return (
    <Grid container height="100vh" justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={8} md={6}>
        <div className="container">
          <div style={{ marginBottom: "15px" }}>
            <p style={containerTitleStyles}>Register</p>
          </div>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                setSubmitting(true);

                const res = await restApi({
                  url: `${baseUrl}/api/register`,
                  body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                  }),
                });

                setToken(res.token);
                setUser(res.user);
                localStorage.setItem("battery-token", res.token);
                resetForm();
                navigate("/dashboard");
              } catch (err: any) {
                console.error("Register page =>", err);
                setApiErrors(err);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit} autoComplete="off">
                <Stack direction="column" spacing={2}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${touched.name && errors.name ? "error" : ""}`}
                    />
                    {touched.name && errors.name ? <div className="errorMessage">{errors.name}</div> : <br />}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${touched.email && errors.email ? "error" : ""}`}
                    />
                    {touched.email && errors.email ? <div className="errorMessage">{errors.email}</div> : <br />}
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${touched.password && errors.password ? "error" : ""}`}
                    />
                    {touched.password && errors.password ? (
                      <div className="errorMessage">{errors.password}</div>
                    ) : (
                      <br />
                    )}
                  </div>
                  <div>
                    <input type="submit" value="Register" className="button filled" />
                  </div>
                </Stack>
              </form>
            )}
          </Formik>
          {apiErrors.length > 0 && (
            <ul className="error-container">
              {apiErrors.map((err) => (
                <li>{err.message}</li>
              ))}
            </ul>
          )}
          <p style={{ marginTop: "10px" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </Grid>
    </Grid>
  );
};
