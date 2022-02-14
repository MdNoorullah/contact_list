//npm init to get json and npm install --save to install express as we have new node then npm install express to get express frameWork
//1
const express=require('express');
const path=require('path');//path is an inbuilt module so no need to npm install

const port=8000;
//13 attach with dataBase
const db=require('./config/mongoose');
const Contact=require('./models/contact');
//now app get all the library that express have
const app=express();
//2 to set ejs is our template engine it helps to give the template required for different people using same piece of code
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));// this will directry with the name views inside cwd i.e contacts list
//9 app.post gives req{ body{key in form like name:xyz,phone:123} }
///parser or middleWare converts the data into key value  pair  encoding before every controller   to parse the data and update contact list we use below
app.use(express.urlencoded());
//11 self made middeware called by browser before any controller
 /*app.set(function(req,res,next)
 {
    console.log("mw called");
    next();// call next middlw ware if present in stack else controler called
 })*/
 //12 use static folder for images storage,css,html js etc using inbuilt middleware
 app.use(express.static('assets'));// find assets folder
//6
var contactList=[
   {
      name:"Md Noorullah",
      Mobile_NO:"9155381910"
   },
   {
      name:"Md Ataullah",
      Mobile_NO:"9525839692"   
   },
   { 
      name:"Md Waliullah",
     Mobile_NO:"9798076927"
   }
];
// switch case k jagah app.get(cases) will work
//7
app.get('/',function(req,res)
{  //16 fetching from DB
    Contact.find({},function(err,contacts)
    {// in above find{} no query but we can do via find by id, name etc like {name:"aftab"} etc
       if(err)
       {
          console.log('Error in fetching contacts from DB');
          return;
       }
       return res.render('home',{
         title:"Contact list",
         contact_list:contacts
         });
    })
  //better to return from function res.send('<h1> cool,it is running! or is it?</h1>'
  /* commenting for fetching from DB
  return res.render('home',{
   title:"Contact list",
   contact_list:contactList
   });*/
                                         
});
//5 use of ejs
app.get('/practice',function(req,res)
{
   return res.render('practice',{title:"let's play with ejs"})
})
//4
app.get('/profile',function(req,res)
{

   res.send('<h1>My Name Is Md Norullah</h1><p> i am presently in 3rd year from jadavpur university production engg dept.</p>'
      // automatic it detect the type of send
   );                                       
});
 /*  14 commenting out as we want to keep them into DataBase
//8 update the array using form
app.post('/create-contact',function(req,res)
// render finds an ejs file and render it
{  //redirect takes us to the url or route
  // console.log(req.body);
   //console.log(req.body.name); we get via it and update array
 
  contactList.push({
      name:req.body.Name,
      Mobile_NO:req.body.Mobile_NO
   }); 
  
   // alterNate of above push contactList.push(req.body);
   return res.redirect('/');
   // alternative res.redirect('back'); if url is long
});*/
// 15 populating dataBase
app.post('/create-contact',(req,res)=>
{
   //15 populating dataBase
   Contact.create({
      name: req.body.Name,
      Mobile_NO: req.body.Mobile_NO
   },function(err,newContact){
     
      if(err)
      {
         console.log('error in creating a contact!');
         return; 
      }
      console.log('******',newContact);
      //***** showind as a name of 2d vector
      return res.redirect('back');
   });
});
//10 gets updated array but once server kill all the added contacts goes
//11 Delete contact from list
 //app.get('delete-contacts/:Mobile_NO',function(req,res)
 app.get('/delete-contacts',function(req,res)
 {  // we use query param & strig param
   // let Mobile_NO=req.params.Mobile_NO;
  // last DB delete we commented above to delet from datBase we need id from query in the UL
     let id=req.query.id;
     // find the contact in the dataBase using the id and delet it 
     Contact.findByIdAndDelete(id,function(err)
     {
        if(err)
        {
           console.log('error in deleting an object from Database');
           return;
        }
        return res.redirect('back');
     });
/* let contactIndex =contactList.findIndex(contact=>contact.Mobile_NO==Mobile_NO);
   if(contactIndex!=-1)
   {
      contactList.splice(contactIndex,1);
   }*/
  // return res.redirect('back');
 });
//3
app.listen(port,function(err)
{
 if(err)  {console.log('Error in Running the server',arr);}    
  console.log('yup! My Express Server Is Running on Port',port);
});