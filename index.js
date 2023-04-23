const express = require('express');

const app = express();

const fs = require('fs');

require('dotenv').config();

 

app.use(express.json());

 

const port =process.env.PORT





const phonebookDataFile = process.env.PHONEBOOK_DATA_FILE;

 

// Load phonebook data from file

let phonebook = [];

if (fs.existsSync(phonebookDataFile)) {

  const data = fs.readFileSync(phonebookDataFile);

  phonebook = JSON.parse(data);

} else {

  console.error(`Could not find phonebook data file: ${phonebookDataFile}`);

  process.exit(1);

}

 

// GET all persons

app.get('/persons', (req, res) => {

  res.json(phonebook);

});

 

// GET person by id

app.get('/persons/:id', (req, res) => {

  const id = Number(req.params.id);

  const person = phonebook.find(person => person.id === id);

 

  if (person) {

    res.json(person);

  } else {

    res.status(404).end();

  }

});

 

// POST a new person

app.post('/persons', (req, res) => {

  const body = req.body;

 

  if (!body.name || !body.number) {

    return res.status(400).json({ error: 'name or number missing' });

  }

 

  const person = {

    id: generateId(),

    name: body.name,

    number: body.number

  };

 

  phonebook.push(person);

  res.json(person);

 

  // Save phonebook data to file

  fs.writeFile(phonebookDataFile, JSON.stringify(phonebook), err => {

    if (err) {

      console.error(err);

    }

  });

});

 

// DELETE a person by id

app.delete('/persons/:id', (req, res) => {

  const id = Number(req.params.id);

  phonebook = phonebook.filter(person => person.id !== id);

  res.status(204).end();

 

  // Save phonebook data to file

  fs.writeFile(phonebookDataFile, JSON.stringify(phonebook), err => {

    if (err) {

      console.error(err);

    }

  });

});

 

// PUT (update) a person by id

app.put('/persons/:id'), (req, res) => {

  const id = Number(req.params.id);

  const body = req.body;

}







app.listen(port,()=>{

        console.log(`server is runing at port  ${port}`)

    })