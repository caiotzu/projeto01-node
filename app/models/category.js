const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    nome: String,
    descricao: String,
    produto :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
});

module.exports = mongoose.model("Category", categorySchema);