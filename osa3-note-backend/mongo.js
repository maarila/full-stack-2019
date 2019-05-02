const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fs-2019-user:${password}@fs-2019-cluster-nvfxb.mongodb.net/note-app?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
});

const otherNote = new Note({
  content: 'Toinen muistiinpano on tässä',
  date: new Date(),
  important: true
});

// note.save().then(response => {
//   console.log('note saved!');
// });

// otherNote.save().then(response => {
//   console.log('second note saved!');
//   mongoose.connection.close();
// });

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note);
  });
  mongoose.connection.close();
});
