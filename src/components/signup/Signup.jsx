import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../actions/signInOutAction";

const SignUp = () => {
  const dispatch = useDispatch();
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };

  const initialValues = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
  });

  const onSubmit = (values, props) => {
    dispatch(signUpUser({ user: values }))
      .then((res) => {
        if (res.status === 201) {
          props.resetForm();
          props.setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper style={paperStyle}>
      <Grid align="center">
        <h2>Sign Up</h2>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <Grid container direction={"column"} spacing={3}>
              <Grid item>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  helperText={<ErrorMessage name="email" />}
                />
              </Grid>
              <Grid item>
                <Field
                  as={TextField}
                  fullWidth
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  helperText={<ErrorMessage name="password" />}
                />
              </Grid>
              <Grid item>
                <Field
                  as={TextField}
                  fullWidth
                  name="password_confirmation"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  helperText={<ErrorMessage name="password_confirmation" />}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={props.isSubmitting}
                  color="primary"
                >
                  {props.isSubmitting ? "Loading" : "Sign up"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default SignUp;
