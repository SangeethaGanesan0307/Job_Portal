import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7080/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token; 
      localStorage.setItem('jwt', token); //  Save token

      alert('Login successful!');
      window.location.href = '/hr-dashboard'; 
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
