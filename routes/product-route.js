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

// GetAll=> localhost:3000/api/produtos
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

// GetById=> localhost:3000/api/produtos/{id}
router.get('/:productId', function(req, res) {
    const id = req.params.productId;

    Produto.findById(id, function(err, produto) {
        if(err){
            res.status(500).json({
                message: "Erro ao tentar encontrar produto; ID mal formado"
            });
        } else if(produto == null){
            res.status(400).json({
                message: "Produto não encontrado para o ID passado"
            });
        } else {
            res.status(200).json({
                message: "Produto encontrado",
                produto: produto
            });
        }
    });
});

// Put=> localhost:3000/api/produtos/{id}
router.put('/:productId', function(req, res) {
    const id = req.params.productId;
    Produto.findById(id, function(err, produto) {
        if(err){
            res.status(500).json({
                message: "Erro ao tentar encontrar o produto; Id mal formado"
            });
        } else if(produto == null) {
            res.status(400).json({
                message: "Produto não encontrado para o ID passado"
            });
        } else {
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;

            produto.save(function(error) {
                if(error)
                    res.send("Erro ao tentar atualizar o produto", error);

                res.status(200).json({
                    message: "Produto atualizado com sucesso"
                });
            });
        }
    });
});


module.exports = router;