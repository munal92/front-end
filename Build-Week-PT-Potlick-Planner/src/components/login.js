import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

function LoginForm({ values, errors, touched }) {
  return (
      <div className="login-form">
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <button>Submit!</button>
    </Form>
    </div>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "alreadytaken@atb.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://bwpt-potluck-planner.herokuapp.com/", values)
        .then(res => {
          console.log(res); 
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); 
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;