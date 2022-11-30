import React, { useEffect } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { sendInvitation } from "../../actions/signInOutAction";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Navigation from "../navigation/Navigation";

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { invitation } = useSelector((state) => state.signInUserReducer);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
  });

  const onSubmit = (values, props) => {
    dispatch(sendInvitation({ user: values }));
    props.resetForm();
    props.setSubmitting(false);
  };

  useEffect(() => {
    if (invitation.data) {
      setOpen(true);
    }
  }, [invitation]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Navigation />
      <Grid direction={"row"} container align="center">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Invitation fully sent
          </Alert>
        </Snackbar>
        <Grid
          item
          sm={4}
          sx={{ backgroundColor: "gray", p: 5, color: "white" }}
        >
          <Grid item>
            <Typography
              variant="h5"
              sx={{ textAlign: "left", paddingBottom: 5 }}
            >
              Send invitation to your friend{" "}
            </Typography>
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
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={props.isSubmitting}
                      color="primary"
                    >
                      Invite
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
