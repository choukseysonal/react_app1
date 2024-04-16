  import React from "react";
  import {useState, useEffect} from "react";
  import {useNavigate} from "react-router-dom";
  import Box from "@mui/material/Box";
  import Button from "@mui/material/Button";
  import TextField from "@mui/material/TextField";
  import Typography from "@mui/material/Typography";
  import Sidenav from "../Dashboard/Sidenav";
  import Snackbar from '@mui/material/Snackbar';


  const Loginpage = (onLogin) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [errors, setErrors] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const navigate = useNavigate();
    // const [token, setToken] = useState(null);

    
    const handleLogin = async () => {
      try {
        const newErrors = {};
          if (username.trim() === "") {
            newErrors.username = 'Username is required';
          }
    
          if (password.trim() === "") {
            newErrors.password = 'Password is required';
          }

          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSnackbarSeverity('error');
            setSnackbarMessage(Object.values(newErrors).join(', '));
            setSnackbarOpen(true);
            return;
          }
      
        const response = await fetch('http://192.168.1.20:3400/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        if (!response.ok) {
          throw new Error('Invalid username or password');
        }

        const data = await response.json();

        console.log('Response Data:', data); // Log response data

        const idToken = data.id; // Extract IDToken from response

        localStorage.setItem("idToken", idToken); // Save IDToken to localStorage
        console.log("IDToken:", idToken); // Log IDToken

        // localStorage.setItem('idToken', data.idToken);
        // localStorage.setItem('username', username);//new add for localstorge
        // localStorage.setItem('password', password);//new add for localstorge

        console.log('Snackbar Severity:', snackbarSeverity);
        setLoggedIn(true);
        navigate('/sidenav');
        setSnackbarMessage("Login successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        
      // Check localStorage after setting idToken
        console.log('idToken:', localStorage.getItem('idToken'));

      } catch (error) {
        console.error('Login error:', error.message);
        if (error.message.includes('username')) {
          setSnackbarSeverity('error');
          setSnackbarMessage('Invalid username');
          setSnackbarOpen(true);
        } else if (error.message.includes('password')) {
          setSnackbarSeverity('error');
          setSnackbarMessage('Invalid password');
          setSnackbarOpen(true);
        } else {
          setSnackbarSeverity('error');
          setSnackbarMessage('An error occurred during login');
          setSnackbarOpen(true);
      }
    }
    };

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };

    useEffect(() => {
      const idToken = localStorage.getItem("idToken");
      if (idToken) {
        setLoggedIn(true);
        console.log("User logged in:", loggedIn); // Log loggedIn state
      
      }
    },[loggedIn]);

      //this is previsous login 
    //  { if (loggedIn) {
    //     console.log("User logged in, opening sidenav");
    //   }
    // }, [loggedIn]);
  //}

    // const handleLogin = () => {
    //   // Your login logic here
    //   console.log("Username:", username);
    //   console.log("Password:", password);
    //   setLoggedIn(true);
    //   navigate('/sidenav'); 
    // };



    // const toggleSidenav = () => {
    //   setSidenav(!sidenavOpen); // Toggle sidebar visibility state
    // };
    // useEffect(() => {
    //   if (loggedIn) {
    //     // User has logged in, open the sidenav
    //     console.log("User logged in, opening sidenav");
    //     // You can perform any other actions here, like fetching user data
    //   }
    // }, [loggedIn]);

    return (
      <>
      {!loggedIn && ( // Conditionally render login page if Sidenav is not open
        <form>
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={300}
            alignItems="center"
            justifyContent={"center"}
            margin="10px auto"
            marginTop={21}
            padding={5}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            sx={{
              ":hover": {
                boxShadow: "5px 5px 10px #ccc",
              }
            }}
          >
            <Typography variant="h5" padding={2} textAlign="center">
              Login
            </Typography>
            <TextField
              type={"text"}
              variant="outlined"
              placeholder="username"
              margin="normal"
              value={username}
              onChange={(e) =>setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username} 
            />
            <TextField
              type={"password"}
              variant="outlined"
              placeholder="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="success"
              onClick={handleLogin}
            >
              Login
            </Button>
          
          </Box>
        </form>
        
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}

    ContentProps={{
      sx: {
        backgroundColor:  snackbarSeverity === 'success' ? 'green' : 'red',
        
      },
    }}
        />
        {loggedIn && <Sidenav />}
      </>
    );
  };
  export default Loginpage;
