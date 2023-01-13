
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/db.json')
const fs = require ('fs')
const path = require ('path')
const uuid = require ('./helpers/uuid')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.json(db)
);
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  console.log(title)
  console.log(text)
  req.body.id = uuid()
  db.push(req.body)
  fs.writeFileSync('./db/db.json', JSON.stringify (db))
  req.json(db)
})

app.listen(PORT, function () {
  console.log('app is listening on PORT', PORT)
})