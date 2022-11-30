import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createPasswordDispatch } from "../../actions/signInOutAction";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };

  const initialValues = {
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
  });

  const onSubmit = (values, props) => {
    dispatch(createPasswordDispatch({ user: values }))
      .then((res) => {
        if (res.status === 200) {
          props.resetForm();
          props.setSubmitting(false);
          setOpen(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2>Create Password</h2>
        </Grid>
        <Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Password created successfully, Please login
            </Alert>
          </Snackbar>
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
                    {props.isSubmitting ? "Loading" : "Create password"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default CreatePassword;
