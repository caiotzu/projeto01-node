const express = require('express');
const router = express.Router();
const Produto = require('../app/models/product');
const mongoose = require('mongoose');


// Rotas para Produto
// Post=> localhost:3000/api/produtos
router.post('/', function(req, res) {
    const produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;


    produto.save(function(error) {
        if(error)
            res.send("Error ao tentar salvar um novo produto ", error);

        res.status(201).json({message: 'Produto inserido com sucesso'});
    });
});

// Get=> localhost:3000/api/produtos
router.get('/', function(req, res) {
    Produto.find(function(err, prods) {
        if(err)
            res.send(err);

        res.status(200).json({
            message: "retorno ok de todos os produtos",
            allProducts: prods
        });
    });
});

module.exports = router;