import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';

const AddUsers = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = () => {
    // Here you can implement logic to add the user with the entered data
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Password:', password);
    // Reset fields
    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    onClose();
  };

  const handleCancel = () => {
    // Reset fields
    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          variant="outlined"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="outlined" startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button onClick={handleAddUser} variant="contained" color="primary">
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUsers;
