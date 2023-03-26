const { Router } = require('express');
const fs = require('fs');

const router = Router();

const FILE_NAME = 'listOfRecords.json';

let listOfRecords = [];

if (fs.existsSync(FILE_NAME)) {
  const fileContents = fs.readFileSync(FILE_NAME, 'utf8'); // Especifica a codificação do arquivo lido
  listOfRecords = JSON.parse(fileContents);
}

router.post('/', (req, res) => {
  const time = req.body.time;

  const record = {
    time: time,
    date: new Date()
  };

  listOfRecords.push(record);

  fs.writeFile(FILE_NAME, JSON.stringify(listOfRecords), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar registro');
    } else {
      res.status(201).send('Registro salvo com sucesso');
    }
  });
});

module.exports = router;
