const express = require('express');
var goodfamilyRouter = express.Router();
var nodemailer = require('nodemailer');

function route() {

    goodfamilyRouter.route("/").post((req, res) => {
        //res.send('hello')
        let transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
                user: 'swaroopdas1234@yahoo.com',
                pass: 'jkrureuycxbficxu',
            },
        });
        var message=`
                    <div style="width:max-content;height:100%;padding:10px;background-color:#ff0457;">
                       <h1 style="font-family: Arial;color:#fff;text-align: center;">Good Family</h1>
                       <div style="width:max-content;height:min-content;;border-radius:5px;border:1px solid #fff;padding:20px">
                          <h3 style="font-family: Arial;color:#fff;line-height:2px;">${req.body.subject}</h3>
                          <h4 style="font-family: Arial;color:#fff;">${req.body.message}</h4>
                          <br>
                          <p style="line-height:2px;font-size: medium;color:#fff;font-weight: bold;">${req.body.name}</p>
                          <p style="line-height:2px;font-size: medium;color:#fff;font-weight: bold;">${req.body.email}</p>
                        </div>
                        <div style="text-align: center;padding:20px">
                            <img style="margin-bottom:0px;" src="https://good-family-test.web.app/assets/img/logo-white.png" width="60" height="60">
                            <p style="color:white;margin-top:0px;">Good Family Enterprises Ltd</p>
                        </div>
                   </div>`
        var messageUser=`
                    <div style="width:max-content;height:100%;padding:10px;background-color:#ff0457;">
                       <h1 style="font-family: Arial;color:#fff;text-align: center;">Good Family</h1>
                       <div style="width:max-content;height:min-content;padding:20px;border-radius:5px;border:1px solid #fff">
                          <h3 style="font-family: Arial;color:#fff;line-height:2px;">Hello ${req.body.name} ,</h3>
                          <h3 style="font-family: Arial;color:#fff;line-height:2px;">Thank you for contacting us ! We will get back to you shortly.</h3>
                        </div>
                        <div style="text-align: center;padding:20px">
                            <img style="margin-bottom:0px;" src="https://good-family-test.web.app/assets/img/logo-white.png" width="60" height="60">
                            <p style="color:white;margin-top:0px;">Good Family Enterprises Ltd</p>
                        </div>
                   </div>` 
        transporter.sendMail({
            from: 'swaroopdas1234@yahoo.com',
            to: "swaroopdas1234@yahoo.com",
            subject: "You have a message from "+req.body.name,
            html:message
        }, (err, info) => {
            console.log(info);
            if (err) {
                
                return res.json({ Status: "erorr" });
            }
            else {
                 
                            transporter.sendMail({
                                            from: 'swaroopdas1234@yahoo.com',
                                            to:req.body.email,
                                            subject: "Thank you "+req.body.name,
                                            html:messageUser
                                            }, (err, info) => {
                                            console.log(info);
                                                if (err) {return res.json({ Status: "error"}); }
                                                else {return res.json({ Status: "success",Info:info});}
                                           });
                   }
        });
    
    
    });

    return goodfamilyRouter;
}

module.exports = route;
