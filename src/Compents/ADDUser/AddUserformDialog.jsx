import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';

export default function AddUserformDialog({ open, onClose, onAddUser }) {
  // const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const closeDialog = () => {
    onClose();
    setErrors('');
  };
  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
    setSnackbarSeverity('success');
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleAddUser = async  () => {
    const newErrors = {};
    if (firstName.trim() === '') {
      newErrors.firstName = 'First Name is required';
    }
    if (lastName.trim() === '') {
      newErrors.lastName = 'Last Name is required';
    }
    if (username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbarSeverity('error');
      setSnackbarMessage(Object.values(newErrors).join(', '));
      // setSnackbarOpen(true);
      return;
    }
    const newUser = {
      firstname: firstName,
      lastname: lastName,
      username: username,
      password: password, // Include the password field in the new user object
      isAdmin: false,
      deleted: false
    };
    const idToken = localStorage.getItem('idToken'); // Retrieve authorization token from local storage

    // Call the onAddUser callback function provided parent component add user
    onAddUser(newUser, idToken);
    try {
      await onAddUser(newUser, idToken);
      setSnackbarSeverity('success');
      setSnackbarMessage('user added successfully');
      // setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding user:', error.message);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to add user');
      // setSnackbarOpen(true);
    }

    // Reset form fields and close dialog
    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    closeDialog();
    
      // You can handle adding the user here
    console.log('Adding user...');
    console.log(`First Name: ${firstName} ${lastName}`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    // handleClose(); // Close the dialog after adding user
    onClose(); 
  };
 


  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpen}>Open Dialog</Button>
      <Dialog open={open} onClose={handleClose}> */}
      <Dialog open={open} onClose={onClose} >
        <DialogTitle>ADD USER </DialogTitle>
        <Divider/>
        <DialogContent >
          <Stack direction="row" spacing={5}>
            <div>
              <p style={{ color: 'gray' }} className="block text-gray-700 text-lg ">Firstname</p>
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Document Title-1"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ marginTop: '16px' }}
                error={!!errors.firstName}
                helperText={errors.firstName}
               
              />
            </div>
            <div>
              <p style={{ color: 'gray' }}className="block text-gray-700 text-lg">Lastname</p>
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Document Title-1"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ marginTop: '16px' }}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </div>
          </Stack>
          <Stack direction="row" spacing={5}  sx={{ marginTop: '30px' }}>
            <div>
            <p style={{ color: 'gray' }}className="block text-gray-700 text-lg ">Username</p>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              placeholder="Document Title-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ marginTop: '16px' }}
              error={!!errors.username}
                helperText={errors.username}
            />
            </div>
            <div>
            <p style={{ color: 'gray' }}className="block text-gray-700 text-lg">Password</p>
            <TextField
              variant="outlined"
              fullWidth
              type="password"
              placeholder="Document Title-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginTop: '16px' }}
              error={!!errors.password}
              helperText={errors.password}
            />
            </div>
            </Stack>
        </DialogContent>
        <Divider/>
        <DialogActions sx={{ marginTop: '16px' }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddUser}>Add User</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
         open={Object.keys(errors).length > 0}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        ContentProps={{
          sx: {
            backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
          },
        }}
        />
    </div>
  );
}