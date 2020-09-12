const express = require('express');
const router = express.Router();

// Padrão Middleware
// Middleware
router.use(function(req, res, next){
    console.log("Interceptação pelo middleware ok"); // Log,validações/, autenticações
    next();
});

router.get('/', (req, res) => res.send("rota teste ok"));

module.exports = router;