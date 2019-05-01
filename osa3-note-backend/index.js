const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());

let notes = [
  {
    id: 1,
    content: 'HTML on helppoa',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Selain pystyy suorittamaan vain javascriptiä',
    date: '2017-12-10T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    date: '2017-12-10T19:20:14.298Z',
    important: true
  }
];

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(note => noÉte.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
  É;
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  };

  notes = notes.concat(note);

  res.json(note);
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
