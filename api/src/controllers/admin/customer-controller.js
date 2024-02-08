const db = require('../../models');
const Customer = db.Customer;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  Customer.create(req.body)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al insertar el cliente.'
      });
    });
};

exports.findAll = (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.size) || 10;
  const offset = (page - 1) * limit;

  Customer.findAndCountAll({
    attributes: [
      'id',
      'name',
      'telephone',
      'email',
      'createdAt',
      'updatedAt'
    ],
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page
      };

      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los clientes.'
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar el cliente con la id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Algún error ha surgido al recuperar la id=${id}.`
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { id }
  })
    .then(([numberRowsAffected]) => {
      if (numberRowsAffected === 1) {
        res.status(200).send({
          message: 'El cliente ha sido actualizado correctamente.'
        });
      } else {
        res.status(404).send({
          message: `No se puede actualizar el cliente con la id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Algún error ha surgido al actualizar la id=${id}.`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { id }
  })
    .then((numberRowsAffected) => {
      if (numberRowsAffected === 1) {
        res.status(200).send({
          message: 'El cliente ha sido borrado correctamente.'
        });
      } else {
        res.status(404).send({
          message: `No se puede borrar el cliente con la id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Algún error ha surgido al borrar la id=${id}.`
      });
    });
};
