import React from 'react';
import IconButton from '@mui/material/IconButton';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';

const CustomShareIcon = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="Share document">
      <ShareSharpIcon />
    </IconButton>
  );
};

export default CustomShareIcon;
