import express from 'express';
import Hello from './Hello.js';

const app = express();

// Pass the app instance to Hello.js
Hello(app);

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
