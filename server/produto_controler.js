const express = require('express')
const router_prod = express.Router();

const Produto_db = require('./produto');

router_prod.post('/', (req, res) => {
    let prod = new Produto_db({
        name: req.body.name
    });

    prod.save((err, p) => {
        if (err)
            res.status(500).send(err); // se tiver erro
        else
            res.status(200).send(p); // se não tiver erro 
    })
})

router_prod.get('/', (req, res) => {
    Produto_db.find().exec((err, prods) => { // find()função que trás as coisas para mim.
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(prods);
    })
})

router_prod.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id

        await Produto_db.deleteOne({ _id: id })
        res.status(200).send({});
    }
    catch (err) {
        res.status(500).send({ msg: 'Internal error', error: err })
    }

})

router_prod.patch('/:id', (req, res) => {
    Produto_db.findById(req.params.id, (err, prod) => {
        if (err)
            res.status(500).send(err);
        else if (!prod)
            res.status(404).send({});
        else {
            prod.name = req.body.name;

            prod.save()
                .then((p) => res.status(200).send(p))
                .catch((e) => res.status(500).send(e))
        }
    })
})

module.exports = router_prod;