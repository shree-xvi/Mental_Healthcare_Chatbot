const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:[true,'Please Enter a name']
    },
    password:{
        type:String,
        require:[true,'Please Enter a password']
    },
    email:{
        type:String,
        require:[true,'Please Enter a email'],
        uniqUe:true
    }
},{
    timestamp:true
})

module.exports=mongoose.model("User",userSchema)