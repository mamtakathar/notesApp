const express = require('express');
const router = express.Router();

let notes = [];
// Get all notes
router.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Create a new note
router.post('/api/notes', (req, res) => {
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// Delete a note
router.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== noteId);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
