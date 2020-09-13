/******************** 
* Importações
********************/
const express   = require('express');
const router    = express.Router();
const Produto   = require('../app/models/product');
const Categoria = require('../app/models/category');
const mongoose  = require('mongoose');



/******************** 
* Rota para produto
********************/
/*** 
 * Cadastro de produto 
 * method: Post
 * url: localhost:3000/api/produtos
 ***/
router.post('/', async (req, res) => {
    id = req.body.categoria;
    const { nome, preco, descricao } = req.body;
    const produto = await Produto.create({
        nome,
        preco,
        descricao,
        categoria:id
    });

    await produto.save((error) => {
        if(error)
            res.status(500).json(
                {
                    message: "Error ao tentar salvar um novo produto " + error
                }
            );

        res.status(201).json({message: 'Produto inserido com sucesso'});
    });
});



/*** 
 * Consulta todos os produtos
 * method: Get
 * url: localhost:3000/api/produtos
 ***/
router.get('/', async (req, res) => {
    produtoByCategoria = await Produto.find().populate('categoria');
    res.status(200).json(produtoByCategoria);
});



/*** 
 * Consulta individual do produto 
 * method: Get
 * url: localhost:3000/api/produtos/{id}
 ***/
router.get('/:productId', async (req,res) => {
    const id = req.params.productId;
    const produtoByCategoria = await Produto.findById(id).populate('categoria');
    res.status(200).json(produtoByCategoria);
});



/*** 
 * Atualiza dados do produto 
 * method: Put
 * url: localhost:3000/api/produtos/{id}
 ***/
router.put('/:productId', async (req,res) => { 
    const produto_id    = req.params.productId;
    const categoria_id  = req.body.categoria;

    await Produto.findById(produto_id, (err, produto) => {
        if(err){
            res.status(500).json({
                message: "Erro ao tentar encontrar o produto; Id mal formado"
            });
        } else if(produto == null) {
            res.status(400).json({
                message: "Produto não encontrado para o ID passado"
            });
        } else {
            produto.nome        = req.body.nome;
            produto.preco       = req.body.preco;
            produto.descricao   = req.body.descricao;
            produto.categoria   = req.body.categoria;

            produto.save( (error) => {
                if(error)
                    res.status(500).json(
                        {
                            message:"Erro ao tentar atualizar o produto " + error
                        }
                    );

                res.status(200).json({
                    message: "Produto atualizado com sucesso"
                });
            });
        }
    });
    

});



/*** 
 * Exclusão do produto
 * method: Delete
 * url: localhost:3000/api/produtos/{id}
 ***/
router.delete('/:productId', async (req,res) => { 
    const id = req.params.productId;

    const produtoDelete = await Produto.findByIdAndDelete(id, (err, produto) => {
        if(err)
            res.status(500).json(
                {
                    message: "Erro ao deletar " + err
                }
            );
        else if (produto == null)
            res.status(400).json(
                {
                    message: "Produto não encontrado para o ID passado"
                }
            );

        const response = {
            message: "Produto removido com sucesso",
            id: produto.id
        }
        return res.status(200).send(response);
    });
    
});



/*** 
 * Exporta os métodos
 * ***/
module.exports = router;