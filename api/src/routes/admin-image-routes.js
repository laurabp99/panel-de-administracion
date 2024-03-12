module.exports = (app, upload) => {
  const router = require('express').Router()
  const controller = require('../controllers/admin/image-controller.js')
  const uploadFiles = require('../middlewares/upload-files.js')

  router.post('/', [uploadFiles], controller.create)
  router.get('/', controller.findAll)
  router.get('/:filename', controller.findOne)
  router.put('/:filename', controller.update)
  router.delete('/:filename', controller.delete)

  app.use('/api/admin/images', router)
}