const express = require('express')
const app = express();

const bodyParser = require('body-parser');
var rp = require('request-promise');
const pg = require('pg');

const { Client } = require('pg');


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

app.get('/', function(req, res) {
    res.send('Hello Psycap!');
});


app.get('/teste', function(req, res) {
  pg.connect(conString, function(err, client2, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client2.query('SELECT $1::int AS number', ['1'], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].number);
    });
  
  });
  
});

app.get('/criaTableUsuarios', function(req, res){
    client.connect();

    client.query('create table usuarios (id bigint auto_increment, nome text, email text, telefone text, senha text);', (err, res) => {
        console.log('Criar tabela', res);
    });

});

app.get('/verTableUsuarios', function(req, res){
    client.connect();

    client.query(`SELECT * FROM usuarios;`, (err, res) => {
        console.log('Seleciona tabela usuarios res', res);
        console.log('Seleciona tabela usuarios resrows', res.rows);
    });

    client.end();
});

app.post('/inserirUsuario', function(request, response) {
    
    var nome = 'Denys'; 
    var email = 'denys.design@gmail.com';
    var telefone = '984413353';
    var senha = '123456';

    let query = 'INSERT INTO usuarios VALUES '+ '('+ nome +','+ email +','+ telefone +','+ senha +')';

    client.connect();

    client.query(query, (err, result) => {
        console.log('result insert', result);
    });

    client.end();

});

var porta = process.env.PORT || 8080;
app.listen(porta, () => console.log('Example app listening on port 3000!'))
