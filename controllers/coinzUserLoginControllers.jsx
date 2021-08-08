// let UserInfo = require("../model/userInfo.jsx");

// module.exports = userApp => {
    // app.get('/', (req, res) => {
    //     res.sendFile('../public/signIn.html', { root: __dirname });
    // });

    // app.get('/index.html', (req, res) => {
    //     res.sendFile('./index.html', { root: __dirname });
    // });
    

    // app.get('/', (req, res) => {
    //     res.sendFile('../signIn.html', { root: __dirname });
    // });

    // app.get('/index', (req, res) => {
    //     res.sendFile('./index.html', { root: __dirname });
    // });


    // app.post("/api/users", (req,res) => {
    //     let user = new User({
    //         title: req.body.title,
    //         name: req.body.name, 
    //         address: req.body.address, 
    //         phoneNumber: req.body.phoneNumber, 
    //         email: req.body.email,
    //         bank_name: req.body.bank_name,
    //         bank_account_number: req.body.bank_account_number, 
    //         bvn: req.body.bvn,
    //         system_account_number: req.body.system_account_number, 
    //         accountBalance: req.body.accountBalance,
    //         creation_date: req.body.creation_date
    //     });
    //     user.save((err,savedUser) => {
    //         if (err) {
    //             res.status(500).send({error: "Could NOT save user information!"});
    //         } else {
    //             res.status(200).send(`successfully saved, ${savedUser}`);
    //         }
    //     })
    // });
    // app.get("/api/users", (req,res) => {
    //     console.log(req.body);
    //     User.find({}, (err, users) => {
    //         if (err) {
    //             res.status(500).send({error: `Could not get user information`});
    //         } else {
    //             res.status(200).send(users);
    //         }
    //     })
    // });
    // app.get("/api/users:phoneNumber", (req,res) => {
    //     console.log(req.body);
    //     User.findOne({"phoneNumber": req.params.phoneNumber}, (err, user) => {
    //         if (err) {
    //             res.status(500).send({error: `Could not get user information`});
    //         } else {
    //             res.status(200).send(user);
    //         }
    //     })
    // });
    // app.put("/api/users/:system_account_number", (req,res) => {
    //     let changable = {
    //         title: req.body.title,
    //         name: req.body.name, 
    //         address: req.body.address, 
    //         phoneNumber: req.body.phoneNumber, 
    //         email: req.body.email,
    //         bank_name: req.body.bank_name,
    //         bank_account_number: req.body.bank_account_number, 
    //         bvn: req.body.bvn
            
    //     };
    //     if (!changable || changable === "") {
    //         res.status(500).send({error: `Cannot Update User!`});
    //         return;
    //     } else {
    //         // let objectFound = false;
    //         User.updateOne({"system_account_number": req.params.system_account_number}, {$set:{title: req.body.title,
    //             name: req.body.name, 
    //             address: req.body.address, 
    //             phoneNumber: req.body.phoneNumber, 
    //             email: req.body.email,
    //             bank_name: req.body.bank_name,
    //             bank_account_number: req.body.bank_account_number, 
    //             bvn: req.body.bvn,}}, (err, balance) => {
    //             if (err) {
    //                 res.status(500).send({error: `Unable to update!`});
                    
    //             } else {
    //                 // objectFound = true;
    //                 res.status(200).send(balance);
    //             }
    //         })
    //         // if (!objectFound) {
    //         //     res.status(500).send({error: `ID Not Found!`})
    //         // } else {
    //         //     res.status(200).send(user)
    //         // }
    //     }
    // });
    // // Get sum of all users account balance 
    // app.get("/api/users:total", (req,res) => {
    //     console.log(req.params);
    //     let totalBalance = req.body.totalBalance;
    //     console.log(totalBalance);
    //     if (!totalBalance || totalBalance === "") {
    //         res.status(500).send({error: `Cannot Get Balance!`})
    //     } else {
    //     User.aggregate({$sum: accountBalance}, (err, total) => {
    //         if (err) {
    //             res.status(500).send({error: `Could not get user information`});
    //         } else {
    //             res.status(200).send(total);
    //         }
            
    //     })
    //     }
    // });
    
    // app.patch("/api/users/:phoneNumber", (req, res) => {
    //     console.log(req.params);
    //     let newBalance = req.body.accountBalance;
    //     console.log(newBalance);
    //     if (!newBalance || newBalance === "") {
    //         res.status(500).send({error: `Cannot Update Balance!`})
    //     } else {
    //         // let objectFound = false;
    //     // User.findOne({"phoneNumber": req.params.phoneNumber}, (err, accountBalance) => {
    //     //     accountBalance = req.body.accountBalance;
    //     //     if (err) {
    //     //         res.status(500).send({error: `Could Not Find Item`});
                
    //     //     } else {
    //             User.updateOne({"phoneNumber": req.params.phoneNumber}, {$set:{"accountBalance": newBalance}}, (err, balance) => {
    //                 if (err) {
    //                     res.status(500).send({error: `Unable to update!`});
                        
    //                 } else {
    //                     // objectFound = true;
    //                     res.status(200).send(balance);
    //                 }
    //             })
    //                 // if (!objectFound) {
    //                 //     res.status(500).send({error: `Account Not Found!`});
    //                 // } else {
    //                 //     res.status(200).send(user)
    //                 // }
    //             }
    //         })
    // //     }
    // // })
    // app.delete("/api/users/:system_account_number", (req,res) => {
    //     console.log(req.params);
    //     // let objectFound = false;
    //     // let newListOfUsers = [];
    //     User.deleteOne({"system_account_number": req.params.system_account_number}, (err, users) => {
    //         if (err) {
    //             res.status(500).send({error: `Unable to update!`});
                
    //         } else {
    //             // objectFound = true;
    //             res.status(200).send(users);
    //         }
    //     })
    //         // if (!objectFound) {
    //         //     res.status(500).send({error: `ID Not Found!`})
    //         // } else {
    //         //     res.status(200).send(users)
    //         // }
    
        
    // });
//     userApp.post("/api/userInfo", (req,res) => {
//         let userInfo = new UserInfo({
//             userName: req.body.userName, 
//             phoneNumber: req.body.phoneNumber, 
//             email: req.body.email,
//             password: req.body.password,
//             bank_name: req.body.bank_name,
//             bank_account_number: req.body.bank_account_number, 
//             bvn: req.body.bvn,
//             creation_date: req.body.creation_date
//         });
//         userInfo.save((err,savedUser) => {
//             if (err) {
//                 res.status(500).send({error: "Could NOT save user information!"});
//             } else {
//                 res.status(200).send(`successfully saved, ${savedUser}`);
//             }
//         })
//     });
// };