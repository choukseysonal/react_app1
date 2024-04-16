const express = require('express');
const app = express();
const authRouter = require('./Express'); 

// Other middleware and routes setup

// Include the authRouter to handle authentication routes
app.use('/api/auth', authRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
