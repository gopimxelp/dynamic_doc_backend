


const express=require('express');
const mongoose=require('mongoose')

const bodyParser = require('body-parser');
const app=express();
const cors=require('cors');
const dbs =require('./Database/db.js')


var router = express.Router(); 
const UserModel =require("./Model/schema")  
const content=require('./Model/content') 


const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const swaggerJSDoc = require('swagger-jsdoc');





app.use(cors())





router.get('/', function(req, res, next) {
    res.render('index', { title: 'add user' });
  });
  


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))



const swaggerAPIDoc=swaggerJSDoc({
  swaggerDefinition:{
    info:{
    title:"Swagger Test",
    version:'1.0.0'
  }
},
apis:['index.js']

})

app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerAPIDoc))






/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> USER API <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */




/**
 * @swagger
 * /users:
 *   get:
 *     description: This is a get api call
 *     responses:
 *       200:
 *         description: Success
 */


app.get('/users',async (req,res)=>{
    res.send(await UserModel.find({}).all())
})


app.post('/add-user', function(req, res, next) {
     
    
     
    var userDetails = new UserModel({
      id: req.body.id,
      name: req.body.name
    });
     
    userDetails.save((err, doc) => {
          if (!err)
              {
             
              res.send({
                "message" : "User added successfully",
                "success" : true,
                userDetails
              });
              }
          else
              console.log('Error during record insertion : ' + err);
    });
 

});


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET CONTENT API <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */


/**
 * @swagger
 * /content:
 *   get:
 *     description: This is a get api call
 *     responses:
 *       200:
 *         description: Success
 */


app.get('/content',async (req,res)=>{
  res.send(await content.find({}).all())
})


app.get('/content/:id', async(req, res) => {
  var id=req.params.id;
  res.send(await content.findById(id));
  
  
})


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> POST CONTENT API <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */


/**
 * @swagger
 * /add-content:
 *   post:
 *     description: This is a post call to save data
 *     responses:
 *       201:
 *         description: Success or Saved
 *       403:
 *         description: Unauthorised
 *     parameters:
 *       - name: Title
 *         in: json
 *         required: true
 *         type: string
 *         description: name of title   
 */


app.post('/add-content', function(req, res, next) {

  var ContentSchema = new content({
    id: req.body.id,
    title: req.body.title,
    subtitle : req.body.subtitles
  });
   
  ContentSchema.save((err, doc) => {
        if (!err)
            {
           
            res.send({
              "message" : "User added successfully",
              "success" : true, 
              ContentSchema
            });
            }
        else
            console.log('Error during record insertion : ' + err);
  });


});


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> UPDATE CONTENT API <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */
/**
 * @swagger
 * /updatecontent/:id:
 *   put:
 *     description: This is a put call to update data
 *     responses: 
 *       200:
 *         description: Success
 */


app.put('/updatecontent/:id', async(req, res) => {
  var id=req.params.id;
  res.send(await content.findByIdAndUpdate(id,req.body));

})


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DELETE CONTENT API <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */
/**
 * @swagger
 * /deletecontent:
 *   delete:
 *     description: This is a delete call to delete data
 *     responses: 
 *       200:
 *         description: Success
 */


app.delete('/deletecontent', async(req, res) => {
  
  res.send(await content.deleteOne());
  
  
})

/**
 * @swagger
 * /deletecontent/:id:
 *   delete:
 *     description: This is a put call to update data
 *     responses: 
 *       200:
 *         description: Success
 */

app.delete('/deletecontent/:id', async(req, res) => {
  var id=req.params.id;
  res.send(await content.findByIdAndDelete(id));
  
  
})




// const DB='mongodb+srv://admin:admin1234@cluster0.d0gi6xn.mongodb.net/?retryWrites=true&w=majority';

// let mongoDB = process.env.MONGODB_URI || DB;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;

// mongoose.connection.on('connected',()=>{
//     console.log('Mongoose connected to db ')
// })
// db.on('error', cons9ole.error.bind(console, 'MongoDB connection error:'));



// db.on('error', console.error.bind(console, 'connection error:'));
 
// db.once('open', function() {
//     console.log("Connection Successful!");
     
   
// });



app.listen(9000,()=>console.log("running at 9000"));