const Joi = require("joi");

const criarProdutoSchema = Joi.object({

    nome: Joi.string()
        .min(3)
        .max(100)
        .required(),

    categoria: Joi.string()
        .min(3)
        .max(100)
        .required(),

    quantidade: Joi.number()
        .integer()
        .min(0)
        .required(),

    preco: Joi.number()
        .min(0)
        .required()

});

module.exports = {

    criarProdutoSchema

};