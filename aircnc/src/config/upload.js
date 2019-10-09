const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //file é o arquivo q estou enviando e o cb é callback e deve ser chamada logo q recebe o arquivo
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            //nome do arquivo + data de hoje
            cb(null, `${name}-${Date.now()}${path.extname(file.originalname)}`);
        },
    }),
}