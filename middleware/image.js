const multer =require('multer');
var upload = multer({dest:'images/'});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
      },
    filename: function (req, file, cb) {
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('img');
module.exports=uploadImg;
