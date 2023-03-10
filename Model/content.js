const mongooes= require('mongoose')
const Schema=mongooes.Schema


const ContentSchema=new Schema({
    id:{
        type:Number
    },
    title:{
        type:String
    },
    subtitle:[
        {
            
            subtitlename:{
                type:String,
                required:true
            },
            content:{
                type:String,
                required:true
            }
        }
    ]

})

ContentSchema.pre('save',async function(next){
    try{
      next()
    }catch(error){
        next(error);
    }
})


ContentSchema.post('save',async function(next){
    try{
      
    }catch(error){
        next(error);
    }
})
const User=mongooes.model('content',ContentSchema)
module.exports=User;