const fs = require("fs").promises;
var path = require("path");

class ImageInsideFolder {
  async remove(dir) {
    let listImages = await fs.readdir(dir);
    listImages.forEach((el) => {
      let filePath = path.join(dir, el);
      fs.unlink(filePath);
    });
    return dir;
  }
}

module.exports = new ImageInsideFolder();
