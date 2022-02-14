const mongoose=require('mongoose');
// for field
const contactSchema= new mongoose.Schema({
    name: {
        type:String,
        required:true                                         
    }, 
    Mobile_NO:{   type:String,
       required:true
     }                                       
});
// for the collection & group of collections are called database
// naming convention first letter is capital,contact is named inside dataBase
const Contact=mongoose.model('Contact',contactSchema);

module.exports=Contact;