/******************** 
* Importações
********************/
const express = require('express');
const router = express.Router();
const Produto = require('../app/models/product');
const Categoria = require('../app/models/category');
const mongoose = require('mongoose');



/******************** 
* Rota para categoria
********************/
/*** 
 * Cadastro de Categoria 
 * method: Post
 * url: localhost:3000/api/categorias
 ***/
router.post('/', async (req, res) => {
    const { nome, descricao } = req.body;
    const categoria = await Categoria.create({
        nome,
        descricao
    });

    await categoria.save((error) => {
        if(error)
            res.status(500).json(
                {
                    message: "Error ao tentar salvar uma nova categoria " + error
                }
            );

        res.status(201).json({message: 'Categoria inserida com sucesso'});
    });
});



/*** 
 * Consulta todos as categorias
 * method: Get
 * url: localhost:3000/api/categorias
 ***/
router.get('/', async (req, res) => {
    categorias = await Categoria.find();
    res.status(200).json(categorias);
});



/*** 
 * Consulta individual da categoria
 * method: Get
 * url: localhost:3000/api/categorias/{id}
 ***/
router.get('/:categoryId', async (req,res) => {
    const id = req.params.categoryId;
    const categoria = await Categoria.findById(id);
    res.status(200).json(categoria);
});



/*** 
 * Atualiza dados da categoria 
 * method: Put
 * url: localhost:3000/api/categorias/{id}
 ***/
router.put('/:categoryId', async (req,res) => { 
    const categoria_id    = req.params.categoryId;

    await Categoria.findById(categoria_id, (err, categoria) => {
        if(err){
            res.status(500).json({
                message: "Erro ao tentar encontrar a categoria; Id mal formado"
            });
        } else if(categoria == null) {
            res.status(400).json({
                message: "Categoria não encontrada para o ID passado"
            });
        } else {
            categoria.nome        = req.body.nome;
            categoria.descricao   = req.body.descricao;

            categoria.save( (error) => {
                if(error)
                    res.status(500).json(
                        {
                            message:"Erro ao tentar atualizar a categoria " + error
                        }
                    );

                res.status(200).json({
                    message: "Categoria atualizada com sucesso"
                });
            });
        }
    });
});



/*** 
 * Exclusão da categoria
 * method: Delete
 * url: localhost:3000/api/categorias/{id}
 ***/
router.delete('/:categorytId', async (req,res) => { 
    const categoria_id = req.params.categorytId;

    const categoriaDelete = await Categoria.findByIdAndDelete(categoria_id, (err, categoria) => {
        if(err)
            res.status(500).json(
                {
                    message: "Erro ao deletar " + err
                }
            );
        else if (categoria == null)
            res.status(400).json(
                {
                    message: "Categoria não encontrada para o ID passado"
                }
            );

        const response = {
            message: "Categoria removida com sucesso",
            id: categoria.id
        }
        return res.status(200).send(response);
    });
});



module.exports = router;