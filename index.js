const path = require('path');
const express = require( 'express');
const multer  = require('multer'); 

const app = express();
const PORT = 8000;
//const upload = multer({ dest: 'uploads/' }); //this is a middleware for adding my files from front-end into a file named 'uploads'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });

app.set("view engine","ejs");
app.set("views", path.resolve('./views'));

app.use(express.json()); //parsing incoming requests that have JSON payloads
app.use(express.urlencoded({ extended: false })); //parse the form data

app.get('/', (req,res) => {
    return res.render('homepage');
});

app.post('/upload', upload.single('profileImage'), (req,res)=>{
    return res.redirect('/');
});
app.listen(PORT, ()=>console.log( `Listening on port ${PORT}`));