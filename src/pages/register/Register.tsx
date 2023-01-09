import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { register, reset } from '../../featured/auth/authSlice';
import { useStyles } from './styles';


const Register = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    address: '',
    zipcode: '',
    discount: false,
  });

  const { username, email, password, password2, address, zipcode, discount } = formData;

   const navigate = useNavigate();
  const dispatch = useAppDispatch();

   const { user, isLoading, isError, isSuccess, message } = useAppSelector((state:any) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: any) => {
    if (e.target.name === 'discount') {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e: any) => {
    if (password !== password2) {
       toast.error('Passwords do not match' , {
        position: toast.POSITION.TOP_RIGHT
    });
    } else {
      const userData: any = {
        username,
        email,
        password,
        address,
        zipcode,
        discount
      };
       dispatch(register(userData));
    }
  };

  return (
    <Card className={classes.root}>
          <CardContent>
        <Typography gutterBottom variant='h4' align='center'>
          Register
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label='Username'
              variant='outlined'
              fullWidth
              name='username'
              required
              value={username}
              onChange={onChange}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label='Email'
              variant='outlined'
              fullWidth
              name='email'
              required
              value={email}
              onChange={onChange}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label='Password'
              variant='outlined'
              fullWidth
              name='password'
              required
              value={password}
              onChange={onChange}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label='Retype Password'
              variant='outlined'
              fullWidth
              name='password2'
              required
              value={password2}
              onChange={onChange}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label='Address'
              variant='outlined'
              fullWidth
              name='address'
              value={address}
              onChange={onChange}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label='Zip Code'
              variant='outlined'
              fullWidth
              name='zipcode'
              value={zipcode}
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={<Checkbox />}
          label='I want to be a remember to receive additional discounts'
          name='discount'
          value={discount}
          onChange={onChange}
        />

        <Box textAlign='center'>
          <Button variant='outlined' onClick={onSubmit}>
            Sign In
          </Button>
        </Box>
      </CardContent>
      <ToastContainer />
    </Card>
  );
};

export default Register;
