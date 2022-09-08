const multer =require('multer');
var upload = multer({dest:'files/'});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files');
      },
    filename: function (req, file, cb) {
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const uploadFile = multer({storage: storage}).single('pdf');
module.exports=uploadFile;
