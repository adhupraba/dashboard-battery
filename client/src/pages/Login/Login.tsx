import { FC } from "react";
import { containerTitleStyles } from "src/constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { restApi } from "src/utils";
import { useAuthCtx } from "src/context";

type ILoginProps = {};

export const Login: FC<ILoginProps> = () => {
  const { setToken, setUser } = useAuthCtx();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
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
            <p style={containerTitleStyles}>Login</p>
          </div>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                setSubmitting(true);

                const res = await restApi({
                  url: "http://localhost:5000/api/login",
                  body: JSON.stringify({
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
                    <input type="submit" value="Login" className="button filled" />
                  </div>
                </Stack>
              </form>
            )}
          </Formik>
          <p style={{ marginTop: "10px" }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </Grid>
    </Grid>
  );
};
