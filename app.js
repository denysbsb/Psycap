const express = require('express')
const app = express();

const bodyParser = require('body-parser');
var rp = require('request-promise');
const pg = require('pg');

const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});


app.get('/', function(req, res) {
    res.send('Hello Psycap!');
});


app.get('/teste', function(req, res) {
const queryText =
    `CREATE TABLE IF NOT EXISTS
      reflections(
        id UUID PRIMARY KEY,
        success VARCHAR(128) NOT NULL,
        low_point VARCHAR(128) NOT NULL,
        take_away VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
});

app.get('/criaTableUsuarios', function(req, res){
//     client.connect();

//     client.query('create table usuarios (id bigint auto_increment, nome text, email text, telefone text, senha text);', (err, res) => {
//         console.log('Criar tabela', res);
//     });

});

app.get('/verTableUsuarios', function(req, res){
//     client.connect();

//     client.query(`SELECT * FROM usuarios;`, (err, res) => {
//         console.log('Seleciona tabela usuarios res', res);
//         console.log('Seleciona tabela usuarios resrows', res.rows);
//     });

//     client.end();
});

app.post('/inserirUsuario', function(request, response) {
    
    var nome = 'Denys'; 
    var email = 'denys.design@gmail.com';
    var telefone = '984413353';
    var senha = '123456';

    let query = 'INSERT INTO usuarios VALUES '+ '('+ nome +','+ email +','+ telefone +','+ senha +')';

//     client.connect();

//     client.query(query, (err, result) => {
//         console.log('result insert', result);
//     });

//     client.end();

});

var porta = process.env.PORT || 8080;
app.listen(porta, () => console.log('Example app listening on port 3000!'))
