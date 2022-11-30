import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userSignIn } from "../../actions/signInOutAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = ({ handleChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const btnstyle = { margin: "8px 0" };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values, props) => {
    props.resetForm();
    props.setSubmitting(false);
    dispatch(userSignIn({ user: values })).then((res) => {
      if (res && res.status === 201) {
        navigate("/dashboard");
      }
    });
  };
  return (
    <Paper style={paperStyle}>
      <Grid align="center">
        <h2>Sign In</h2>
      </Grid>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                  helperText={<ErrorMessage name="password" />}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  style={btnstyle}
                  fullWidth
                >
                  {props.isSubmitting ? "Loading" : "Sign in"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Typography>
        Do you have an account ?
        <Link href="#" onClick={() => handleChange("event", 1)}>
          Sign Up
        </Link>
      </Typography>
    </Paper>
  );
};

export default Login;
