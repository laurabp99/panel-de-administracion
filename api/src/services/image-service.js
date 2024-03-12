const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')

module.exports = class ImageService {
  uploadImage = async images => {
    const result = []
    for (const file of images.file) {
      try {
        const filename = file.originalname.replace(/[_\s]/g, '-')
        const filePath = path.join(__dirname, `../storage/images/gallery/original`, path.parse(filename).name + '.webp')
        const newFilename = await fs.access(filePath).then(async () => {
          return `${path.parse(filename).name}-${new Date().getTime()}.webp`
          console.log("vanpiro esiten")
        }).catch(async () => {
          return `${path.parse(filename).name}.webp`
          console.log("vanpiro no esiten")
        })
        await sharp(file.buffer)
        .webp({ lossless: true })
        .toFile(path.join(__dirname, `../storage/images/gallery/original/${newFilename}`))
  
        await sharp(file.buffer)
        .resize(135, 135)
        .webp({ quality: 80 })
        .toFile(path.join(__dirname, `../storage/images/gallery/thumbnail/${newFilename}`))
        result.push(newFilename) 
      } catch (error) {
        console.log(error)
      }
      return result
    }
  }

  resizeImages = async (images) => {
    
  }

  deleteImages = async filename => {

  }
}