const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
const FILE_NAME = 'listOfRecords.json';

let listOfRecords = [];

if (fs.existsSync(FILE_NAME)) {
  const fileContents = fs.readFileSync(FILE_NAME, 'utf8');
  listOfRecords = JSON.parse(fileContents);
}

app.post('/', (req, res) => {
  const time = req.body.time;

  const record = {
    time: time,
    date: new Date()
  };

  listOfRecords.push(record);

  fs.writeFile(FILE_NAME, JSON.stringify(listOfRecords), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving record');
    } else {
      res.status(201).send('Record successfully saved');
    }
  });
});

app.get('/records', (_req, res) => {
  fs.readFile(FILE_NAME, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading log file');
    } else {
      const registros = JSON.parse(data);
      res.status(200).send(registros);
    }
  });
});

app.delete('/records', (_req, res) => {
  fs.readFile(FILE_NAME, () => {
    const newRegistros = [];

    fs.writeFile(FILE_NAME, JSON.stringify(newRegistros), err => {
      if (err) throw err;
      res.status(202).send('Record successfully saved');
    });
  });
});


module.exports = app;