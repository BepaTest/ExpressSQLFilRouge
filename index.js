const express = require ('express');
const app = express();
const port = 5000;
const connection = require ('./conf');
const bodyParser = require ('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res)=>{
    res.send('Hello World!');
});

app.listen(port, (err)=> {
    if (err) {
        throw new Error('Error happened..')
    }
    console.log(`Server is listening on port ${port}`);
});

// app.get('/api/students', (req, res) =>{
//   connection.query('SELECT * FROM student', (err, results)=>{
//       if (err){
//           console.log(err)
//           res.status(500).send('Erreur lors de la récupération des etudiants');
//       } else{
//           res.json(results);
//       }
//   });
// });

app.get('/api/students/names', (req, res) =>{
  connection.query('SELECT name FROM student', (err, results)=>{
      if (err){
          console.log(err)
          res.status(500).send('Erreur lors de la récupération des prenoms');
      } else{
          res.json(results);
      }
  });
});

app.get('/api/students/filteredNames', (req, res) =>{
  connection.query(`SELECT * FROM student WHERE name like '%u'`, (err, results)=>{
      if (err){
          console.log(err)
          res.status(500).send('Erreur lors de la récupération des prenoms filtrés');
      } else{
          res.json(results);
      }
  });
});

app.get('/api/students/Bnames', (req, res) =>{
  connection.query(`SELECT * FROM student WHERE name like 'b%'`, (err, results)=>{
      if (err){
          console.log(err)
          res.status(500).send('Erreur lors de la récupération des prenoms commencant par b');
      } else{
          res.json(results);
      }
  });
});

app.get('/api/students/?', (req, res) =>{
  const level=req.query.level
  console.log(level)
  if (level) {
  connection.query(`SELECT * FROM student WHERE level > ${level}`, (err, results)=>{
      if (err){
          console.log(err)
          res.status(500).send('Erreur lors de la récupération des niveau > ?');
      } else{
          res.json(results);
      }
  });
}
else { 
    connection.query('SELECT * FROM student', (err, results)=>{
              if (err){
                  console.log(err)
                  res.status(500).send('Erreur lors de la récupération des etudiants');
              } else{
                  res.json(results);
              }
          });
}
});

app.get('/api/students/namesOrderd', (req, res) =>{
    connection.query(`SELECT * FROM student ORDER BY name`, (err, results)=>{
        if (err){
            console.log(err)
            res.status(500).send('Erreur lors de la récupération des prenoms DESC');
        } else{
            res.json(results);
        }
    });
  });

  app.post('/api/students', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO student SET?', formData, (err, results)=>{
        if (err){
            console.log(err);
            res.status(500).send("Erreur lors de la suavgarde d'un etudiant");
        } else {
            res.sendStatus(200);
        }
    });
});

app.put('/api/students/:id', (req, res) =>{
  const idStudent=req.params.id;
  const formData=req.body;
  connection.query('UPDATE student SET? WHERE id = ?', [formData, idStudent], err =>{
      if(err){
          console.log(err);
          res.status(500).send("Erreur lors de la modification d'un employé");
      } else {
          res.sendStatus(200);
      }
  });
});

app.delete('/api/students/:id', (req,res) =>{
  const idStudent = req.params.id;
  connection.query('DELETE FROM student WHERE id = ?', [idStudent], err =>{
      if(err){
          console.log(err);
          res.status(500).send("Erreur lors de la suppression d'un etudiant");
      } else {
          res.sendStatus(200);
      }
  });
});

app.delete('/api/students/accepted/?', (req,res) =>{
  const isAccepted = req.query.accepted;
  console.log(isAccepted)
  connection.query(`DELETE FROM student WHERE accepted = ${isAccepted}`, err =>{
      if(err){
          console.log(err);
          res.status(500).send("Erreur lors de la suppression d'un etudiant");
      } else {
          res.sendStatus(200);
      }
  });
})
