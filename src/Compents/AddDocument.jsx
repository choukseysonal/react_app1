import React, { useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';



function AddDocument({ open, onClose, onAddDocument }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');



  const closeDialog = () => {
    onClose();
    setErrors('');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAddDocument = async () => {
    const newErrors = {};
    if (title.trim() === '') {
      newErrors.title = 'Title is required';
    }
    if (link.trim() === '') {
      newErrors.link = 'Link is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbarSeverity('error');
      setSnackbarMessage(Object.values(newErrors).join(', '));
      setSnackbarOpen(true);
      return;
    }
    const newDocument = {
      title: title,
      link: link
    };

    const idToken = localStorage.getItem('idToken'); // Retrieve authorization token from local storage
    
    onAddDocument(newDocument, idToken); // Call the callback function provided by the parent component to add the document

    try {
      await onAddDocument(newDocument, idToken);
      setSnackbarSeverity('success');
      setSnackbarMessage('Document added successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding document:', error.message);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to add document');
      setSnackbarOpen(true);
    }

    
    setTitle(''); // Reset form fields and close dialog
    setLink('');
    closeDialog();
  };
  

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>ADD DOCUMENT</DialogTitle>
        <Divider />
        <DialogContent sx={{ marginBottom: '1rem', padding: '3rem'}}>
          <div className="flex-1 mt-1">
            <p className="text-slate-300 text-gray-700 text-lg">Title </p>
            <TextField
              variant="outlined"
              label="Document Title-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="dense"
              error={!!errors.title}
              helperText={errors.title}
            />
          </div>
          <div className="flex-1" style={{ marginBottom: '1rem', marginTop: '2rem'}}>
            <p className="text-gray-300">Link</p>
            <TextField
              variant="outlined"
              label="http://drive.google.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              fullWidth
              margin="dense"
              error={!!errors.link}
              helperText={errors.link}
            />
          </div>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ padding: '1rem' }}>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddDocument}>
            Add Document
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        // severity={snackbarSeverity}
        ContentProps={{
          sx: {
            backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
          },
        }}
      />
    </>
  );
}

export default AddDocument;
