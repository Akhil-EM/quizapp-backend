/// requiring needed modules
var express = require('express');
var chalk=require('chalk');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var cors=require('cors');
const path=require('path');

var app = new  express();

//// requiring routers to use them
const userRouter=require('./src/routers/user')();
const adminRouter= require('./src/routers/admin')();
const qustiRouter=require('./src/routers/question')();
const fameRoute=require('./src/routers/wallOfFame')();
const SmaterialRoute=require('./src/routers/Smaterials')();

app.use(express.static(path.join(__dirname,"/public")));
/////using body parser to handle requestes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

/// telling wich router must use on corressponding requestes

app.use('/users',userRouter);
app.use('/admin',adminRouter);
app.use('/question',qustiRouter);
app.use('/famewall',fameRoute);
app.use('/material',SmaterialRoute);

app.get('/', function (req, res) {
  res.send('node works fine !');
});


////checking mongo db connection 
//mongoose.connect("mongodb://localhost:27017/Quizlet_go");
mongoose.connect("mongodb+srv://akhilem:9539770998@cluster0-rmbxp.mongodb.net/quizletGo?retryWrites=true&w=majority");
mongoose.set('useFindAndModify', false);
var db=mongoose.connection;
db.on('error',(error)=>{
    console.log(chalk.redBright(error));
});
db.once('open',()=>{
    console.log( chalk.greenBright( " Success"));
})

// app.listen(4040, function () {
//   console.log(chalk.yellowBright("port 4040 is now active !!!"));
// });
app.listen(process.env.PORT||3000,()=>{
    console.log(chalk.yellowBright(`port ${chalk.redBright(process.env.PORT)} is active`))
});
