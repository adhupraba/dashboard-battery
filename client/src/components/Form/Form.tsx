import { FC } from "react";
import { containerTitleStyles } from "src/constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { Stack } from "@mui/material";

interface Props {}

export const Form: FC<Props> = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "*Names must have at least 2 characters")
      .max(250, "*Names can't be longer than 250 characters")
      .matches(/^[A-Za-z]+[A-Za-z\s]{1,250}$/, "*Name must be in a proper format")
      .required("*Name is required"),
    criteria: Yup.string().required("*Criteria is required"),
    criteriaValue: Yup.number().required("*Criteria Value is required"),
    dayType: Yup.string().required("*Day type is required"),
    priceSignal: Yup.string().required("*Price Signal is required"),
    email: Yup.string()
      .min(5, "*Email must have at least 2 characters")
      .max(250, "*Email can't be longer than 250 characters")
      .email("*Must be a valid email address")
      .required("*Email is required"),
    phone: Yup.string()
      .matches(/^(?!\d{10})$/, "*Phone number is not valid")
      .required("*Phone number required"),
  });

  return (
    <div className="container">
      <div style={{ marginBottom: "15px" }}>
        <p style={containerTitleStyles}>Create Alert</p>
      </div>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          criteria: "gt",
          criteriaValue: 0,
          dayType: "everyday",
          priceSignal: "DK1",
          email: "",
          phone: "",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          validateOnBlur,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldTouched,
          setFieldValue,
        }) => (
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
                <p>Criteria</p>
                <label style={{ marginRight: "15px" }}>
                  <input
                    type="radio"
                    name="criteria"
                    value={"gte"}
                    checked={values.criteria === "gt"}
                    defaultChecked
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  Greater than
                </label>
                <label>
                  <input
                    type="radio"
                    name="criteria"
                    value={"lt"}
                    checked={values.criteria === "lt"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  Less than
                </label>
                {touched.criteria && errors.criteria ? <div className="errorMessage">{errors.criteria}</div> : <br />}
              </div>
              <div>
                <input
                  type="text"
                  name="criteriaValue"
                  placeholder="Value"
                  value={values.criteriaValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input ${touched.criteriaValue && errors.criteriaValue ? "error" : ""}`}
                />
                {touched.criteriaValue && errors.criteriaValue ? (
                  <div className="errorMessage">{errors.criteriaValue}</div>
                ) : (
                  <br />
                )}
              </div>
              <div>
                <select
                  name="dayType"
                  value={values.dayType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Day Type"
                  className={`input ${touched.dayType && errors.dayType ? "error" : ""}`}
                >
                  <option value="everyday">Everyday</option>
                  <option value="today">Today</option>
                </select>
                {touched.dayType && errors.dayType ? <div className="errorMessage">{errors.dayType}</div> : <br />}
              </div>
              <div>
                <label>Criteria</label>
                <select
                  name="priceSignal"
                  value={values.priceSignal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Price Signal"
                  className={`input ${touched.priceSignal && errors.priceSignal ? "error" : ""}`}
                >
                  <option value="dk1">DK1</option>
                  <option value="dk2">DK2</option>
                </select>
                {touched.priceSignal && errors.priceSignal ? (
                  <div className="errorMessage">{errors.priceSignal}</div>
                ) : (
                  <br />
                )}
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
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input ${touched.phone && errors.phone ? "error" : ""}`}
                />
                {touched.phone && errors.phone ? <div className="errorMessage">{errors.phone}</div> : <br />}
              </div>
              <div>
                <input type="submit" value="Submit" className="button filled right" />
              </div>
            </Stack>
          </form>
        )}
      </Formik>
    </div>
  );
};
