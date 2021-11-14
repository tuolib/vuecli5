/* RESIZE OPTIMIZE IMAGES */
const Jimp = require("jimp");
var path = require("path");
// const sharp = require('sharp');
/**
 * Resize + optimize images.
 *
 * @param Array images An array of images paths.
 * @param Number width A number value of width e.g. 1920.
 * @param Number height Optional number value of height e.g. 1080.
 * @param Number quality Optional number value of quality of the image e.g. 90.
 */
module.exports = async (imagesName, images, width, quality, height = Jimp.AUTO) => {
  let pathCom = "/www/admin/file/compress/";
  if (process.env.NODE_ENV == "development") {
    pathCom = path.join(__dirname, "../../") + "file/compress/";
  }
  await Promise.all(
    images.map(async (imgPath, index) => {
      const image = await Jimp.read(imgPath);
      await image.resize(width, height);
      await image.quality(quality);
      await image.writeAsync(pathCom + imagesName[index]);
    })
  );
};
