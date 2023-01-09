import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useStyles } from "./styles";
import { login, reset } from '../../featured/auth/authSlice';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password } = formData;
  const { user, isError, isLoading, isSuccess, message } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }  
    if(user?.result?.token) {
      navigate('/home')
    } 
    if(!user?.result?.token) {
      navigate('/')
    } 
    
    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  const handleChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value
    })
    )
  }

  const onSubmit = async (e: any) => {
    if(username === '' || password === '' ) {
      toast.error('Please, enter valid data')
    }
    const userData: any = {
      username,
      password
    }

    await dispatch(login(userData))

  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.typography} variant="h4" gutterBottom >
          Login
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              className={classes.textField}
              fullWidth
              name="username"
              required
              value={username}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label="Password"
              className={classes.textField}
              fullWidth
              name="password"
              required
              value={password}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Link href="/register" className={classes.link}>
          Don't have an account? Register by clicking here!
        </Link>
        <Box textAlign="center">
          <Button variant="outlined" className={classes.button} onClick={onSubmit}>Log In</Button>
        </Box>
      </CardContent>
      <ToastContainer />

    </Card>
  );
};

export default Login;
