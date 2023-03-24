const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const FILE_NAME = 'listOfRecords.json';

let listOfRecords = [];

// Carrega os registros do arquivo JSON, se ele existir
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

  // módulo fs para salvar o registro em um arquivo JSON
  fs.writeFile(FILE_NAME, JSON.stringify(listOfRecords), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar registro');
    } else {
      res.status(201).send('Registro salvo com sucesso');
    }
  });
});

app.get('/records', (_req, res) => {
  fs.readFile(FILE_NAME, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler arquivo de registros');
    } else {
      const registros = JSON.parse(data);
      res.status(200).send(registros);
    }
  });
});

// Esta rota aceita dois parâmetros na URL: startDate e endDate, que especificam o
// intervalo de datas que você deseja filtrar. A rota lê o arquivo JSON listOfRecords.json, filtra os registros com base nas datas fornecidas e envia os registros filtrados como resposta.
app.get('/records/:date', (req, res) => {
  const startDate = new Date(req.params.startDate);
  const endDate = new Date(req.params.endDate);

  fs.readFile(FILE_NAME, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler arquivo de registros');
    } else {
      const registros = JSON.parse(data).filter(record => {
        const date = new Date(record.date);
        return date >= startDate && date <= endDate;
      });
      res.status(200).send(registros);
    }
  });
});


module.exports = app;