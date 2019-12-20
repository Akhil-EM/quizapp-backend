var express= require('express');
var {userModel}=require('../models/userModel');
var userRoute=express.Router();

function route(){

    userRoute.route('/')
    .get((req, res) => {
        res.send("user route works !!")
    });
   userRoute.route('/signup')
    .post((req, res) => {
        console.log(req.body);
             var user={
                userId:(req.body.firstName+req.body.email+req.body.password+"quizlet_go_id"),
                firstName:req.body.firstName,
                email:req.body.email,
                age:req.body.age,
                password:req.body.password
             }


       var user=new userModel(user);
         user.save((err,result)=>{
             if(err)
             {
                 res.json({status:"error"});
             }
             else{
                 console.log(result);
                 res.json({status:"success"})
             }
         })
    });

    userRoute.route('/login')
    .post((req, res) => {
        console.log(req.body);
        var logcre={
            email:req.body.email,
            password:req.body.password
        }
        
        userModel.findOne(logcre,(err,data)=>{
            if (err) {
                res.json({ status: "Error" });
            }
            else if (!data) {
                res.json({ status: "Invalid" });
            }
            else {
                res.json({ status:data,key:"true"});
            }
        })
    });
    userRoute.route('/edit')
    .post((req, res) => {
        var user={
            userId:(req.body.firstName+req.body.email+req.body.password+"quizlet_go_id"),
            firstName:req.body.firstName,
            email:req.body.email,
            age:req.body.age,
            gender:req.body.gender,
            password:req.body.password
         }
        userModel.findByIdAndUpdate(req.body.id,{$set:user},
            (err,result)=>{
                console.log(req.body.id)
              if(err)
              {
                  res.json({Status:"Error"});
              }
              else{
                  res.json({Status:"Success",data:user});
              }
            });

    });
    return userRoute;

}
module.exports=route;