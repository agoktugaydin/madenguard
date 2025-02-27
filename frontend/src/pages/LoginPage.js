import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Snackbar, Paper } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate, useLocation  } from 'react-router-dom';
const { apiUrl, apiPort} = require('../constants.js');

const Login = ({ isLoggedIn, setLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to /device-list if already logged in
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}:${apiPort}/api/user/login`, formData);
      const token = response.data.token;
      const role = response.data.role;

      // Token'i çözümle
      const decodedToken = decodeToken(token);
      const userId = decodedToken.userId;

      // Set the role in local storage or a global state management tool
      localStorage.setItem('role', role);
      // Set the token in local storage or a global state management tool
      localStorage.setItem('token', token);
      // Set the userID in local storage or a global state management tool
      localStorage.setItem('userId', userId);

      setLoggedIn(true);

      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      setSnackbarMessage('Login failed. Please check your credentials.');
      setSnackbarOpen(true);
    }
  };


  const decodeToken = (token) => {
    const tokenPayload = token.split('.')[1]; // Token'in payload kısmını al
    const decodedPayload = atob(tokenPayload); // Base64 kodlu payload'ı çöz

    return JSON.parse(decodedPayload); // JSON formatına çevir
  };


  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="error"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Login;
