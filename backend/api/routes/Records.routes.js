const { Router } = require('express');
const fs = require('fs');

const router = Router();

const FILE_NAME = 'listOfRecords.json';

router.get('/records', (_req, res) => {
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

router.delete('/records', (_req, res) => {
  fs.readFile(FILE_NAME, () => {
    const newRegistros = [];

    fs.writeFile(FILE_NAME, JSON.stringify(newRegistros), err => {
      if (err) throw err;
      res.send('Registros excluídos com sucesso!');
    });
  });
});