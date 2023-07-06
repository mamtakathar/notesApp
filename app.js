const express = require('express');
const fs = require('fs');
const cors = require('cors');
const notesRouter = require('./routes/notes');

const app = express();
app.use(cors());
app.use(express.json());

// Create an empty array to store the notes
let notes = [];

// Load the notes from the data.json file if it exists
if (fs.existsSync('data.json')) {
  const data = fs.readFileSync('data.json', 'utf8');
  notes = JSON.parse(data);
}

app.use('', notesRouter);

// Save the notes to the data.json file before shutting down the server
process.on('SIGINT', () => {
  fs.writeFileSync('data.json', JSON.stringify(notes), 'utf8');
  process.exit();
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;