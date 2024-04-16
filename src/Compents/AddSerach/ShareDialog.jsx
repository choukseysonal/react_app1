import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete'; // Import Autocomplete

const ShareDialog = ({ open, onClose, onShareClick }) => {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);

  const handleAddUser = () => {
    if (user.trim() !== '') { //  it's not empty or just whitespace
      setUsers([...users, user.trim()]); // Trim user input before adding to input list
    setUser('');
  };
  
  };
  const handleDone = () => {
    handleAddUser(); // Add the user when the "Done" button is clicked
    onClose(); // Close the dialog
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth>
      <DialogTitle>SHARE</DialogTitle>
      <Divider />
      <DialogContent>
        {/* Use Autocomplete to display options based on typed input */}
        <Autocomplete
           options={['', ...users]} // Add empty string option
          value={user}
          freeSolo 
          onChange={(event, newValue) => {
            setUser(newValue);
          }}
          inputValue={user} // Assign user as input value
          onInputChange={(event, newInputValue) => {
            setUser(newInputValue); // Update user state on input change
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              // label="Add Users"
              // defaultValue="Add Users"
              fullWidth
              margin="dense"
              
              onChange={(e) => setUser(e.target.value)} // Update user state on input change
            />
          )}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
         <Button onClick={handleCancel} variant="outlined" >{/*//endIcon={<CancelIcon />} */}
          Cancel
        </Button>
        <Button onClick={handleDone} variant="contained" color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onShareClick: PropTypes.func.isRequired,
};

export default ShareDialog;
