// import { useState } from 'react';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import axios from 'axios';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('https://localhost:7080/api/auth/login', {
//         email,
//         password,
//       });
      
//       const token = response.data.token; 
//       localStorage.setItem('jwt', token); //  Saving token

//       alert('Login successful!');
//       window.location.href = '/hr-dashboard'; 
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Invalid email or password');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3 }}>
//       <Typography variant="h5" gutterBottom>Login</Typography>
//       <TextField
//         fullWidth
//         label="Email"
//         type="email"
//         margin="normal"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <TextField
//         fullWidth
//         label="Password"
//         type="password"
//         margin="normal"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
//         Login
//       </Button>
//     </Box>
//   );
// };

// export default LoginPage;

// import { useState } from 'react';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import axios from 'axios';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('https://localhost:7080/api/auth/login', {
//         email,
//         password,
//       });
      
//       const { token, role } = response.data;
//       localStorage.setItem('jwt', token);
//       localStorage.setItem('role', role); // Optionally store role if you want

//       alert('Login successful!');

//       // Redirect user based on their role
//       if (role === 'manager') {
//         window.location.href = '/manager-dashboard';
//       } else if (role === 'hr') {
//         window.location.href = '/hr-dashboard';
//       } else {
//         window.location.href = '/'; // fallback: home or an error page
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Invalid email or password');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3 }}>
//       <Typography variant="h5" gutterBottom>Login</Typography>
//       <TextField
//         fullWidth
//         label="Email"
//         type="email"
//         margin="normal"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <TextField
//         fullWidth
//         label="Password"
//         type="password"
//         margin="normal"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
//         Login
//       </Button>
//     </Box>
//   );
// };

// export default LoginPage;

import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook for SPA navigation

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    try {
      const response = await axios.post('https://localhost:7216/api/auth/login', {
        email,
        password,
      });

      console.log('Login response:', response.data);

      const { token, role } = response.data;

      if (!token || !role) {
        alert('Invalid login response from server.');
        return;
      }

      // Normalize role to lowercase for consistent checks
      const normalizedRole = role.toLowerCase();

      localStorage.setItem('jwt', token);
      localStorage.setItem('role', normalizedRole);

      alert('Login successful!');

      // Use navigate for SPA navigation
      if (normalizedRole === 'manager') {
        navigate('/manager-dashboard');
      } else if (normalizedRole === 'hr') {
        navigate('/hr-dashboard');
      } else {
        alert('User role not recognized.');
      }
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

