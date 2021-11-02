require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const app = express();

const connectDB = require('./config/db.config');

connectDB();

app.use(express.json());
app.use(cors());

// connect to routes here
// app.use('/', require(''))
// app.use('/', require(''))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
