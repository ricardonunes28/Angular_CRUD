const express = require('express')
const router = express.Router();

const Departament_db = require('./departament');

router.post('/', (req, res) => {
    let dep = new Departament_db({
        name: req.body.name
    });

    dep.save((err, d) => {
        if (err)
            res.status(500).send(err); // se tiver erro
        else
            res.status(200).send(d); // se não tiver erro 
    })
})

router.get('/', (req, res) => {
    Departament_db.find().exec((err, deps) => { // find()função que trás as coisas para mim.
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(deps);
    })
})

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id

        await Departament_db.deleteOne({ _id: id })
        res.status(200).send({});
    }
    catch (err) {
        res.status(500).send({ msg: 'Internal error', error: err })
    }

})

router.patch('/:id', (req, res) => {
    Departament_db.findById(req.params.id, (err, dep) => {
        if (err)
            res.status(500).send(err);
        else if (!dep)
            res.status(404).send({});
        else {
            dep.name = req.body.name;

            dep.save()
                .then((d) => res.status(200).send(d))
                .catch((e) => res.status(500).send(e))
        }
    })
})

module.exports = router;