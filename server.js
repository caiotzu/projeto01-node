// Importando Pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configurar o app para usar o body-parser e transformar as req em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Persistência
const connectionString = "mongodb+srv://root:root@cluster0.cxibj.mongodb.net/bdpos?retryWrites=true&w=majority";
mongoose.connect(connectionString,  {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

// Definir porta onde o server vai responder 
const port = process.env.PORT || 3000;

// Definindo as Rotas
const router = express.Router(); // intercepta todas as rotas
const productRoute = require('./routes/product-route');
const indexRoute = require('./routes/index-route');
const categoryRoute = require('./routes/category-route');



// Vincular a aplicação (app) com o motor de rotas do express
// '/api' é o caminho padrão para as APIs REST
// Rota principal
app.use('/api', indexRoute);


// Rota para produto
app.use('/api/produtos/', productRoute);
app.use('/api/categorias/', categoryRoute);


app.listen(port, () => {
    console.log('Server is up and running... on port', port);
});