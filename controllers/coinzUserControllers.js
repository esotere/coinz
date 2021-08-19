let User = require("../model/users.jsx");
let bcrypt = require("bcrypt");
// let UserInfo = require("../model/userInfo.jsx");
let path = require('path');
let home = "../coinz/public/index.html";
let signIn = "../coinz/public/signIn.html";
let signUp = "../coinz/public/signup.html"


module.exports = app => {
    app.get('/favicon.ico', (req, res) => res.status(204)); // (to stop favicon error)

    //Added next three lines for app to land on signin/sign up page
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(signIn)) //, { root: __dirname }));
    });

    app.get('/signin', (req, res) => {
        res.sendFile(path.resolve(signIn)) //, { root: __dirname }));
    });
    
    app.get('/signup', (req, res) => {
        res.sendFile(path.resolve(signUp)) //, { root: __dirname }));
    });
    
    app.get('/home', (req, res) => {
        res.sendFile(path.resolve(home)) //, { root: __dirname }));
    });

    // app.post('/api/users/login', (req, res) => {
         
    // });

    app.get('/api/test', (req, res) => {
        let data = req.body
        console.log(JSON.stringify(data));
        res.json(JSON.stringify(data));
    });

    app.get("/api/users", (req,res) => {
        console.log(req.body);
        User.find({}, (err, users) => {
            if (err) {
                res.status(500).send({error: `Could Not Get Information Of All Users`});
            } else {
                res.status(200).send(users);
            }
        })
    });

    app.get("/api/users/user/:phoneNumber", (req,res) => {
        console.log(req.body);
        User.findOne({"phoneNumber": req.params.phoneNumber}, (err, user) => {
            if (err) {
                res.status(500).send({error: `Could Not Get User Information`});
            } else {
                res.status(200).send(user);
            }
        })
    });

    app.get("/api/users/user/email/:email", (req,res) => {
        console.log(req.body);
        User.findOne({"email": req.params.email}, (err, user) => {
            if (err) {
                res.status(500).send({error: `Could Not Get User Information`});
            } else {
                res.status(200).send(user);
            }
        })
    });

    // Added 'san' System Account Number
    app.get("/api/users/user/san/:system_account_number", (req,res) => {
        console.log(req.params);
        // let objectFound = false;
        // let newListOfUsers = [];
        User.findOne({"system_account_number": req.params.system_account_number}, (err, user) => {
            if (err) {
                res.status(500).send({error: `Account Number Not Found!`});
                
            } else {
                // objectFound = true;
                res.status(200).send(user);
            }
            //  if (!objectFound) {
                //      res.status(500).send({error: `System Account Number Not Found!`})
                //  } else {
                    //      res.status(200).send(users)
                    //  }
                })            
            });
            
            // Get sum of all users account balance 
            app.get("/api/users/total", (req,res) => {
                // console.log(req.params);
                // let totalBalance = req.body.totalBalance;
                let accountBalance = req.body.accountBalance
                console.log(accountBalance);
                // if (!accountBalance || accountBalance === "") {
                    //     res.status(500).send({error: `Cannot Get Balance!`})
                    // } else {
                        User.aggregate([{$sum: accountBalance}], (err, total) => {
                            if (err) {
                                res.status(500).send({error: `Could Not Get Total Balance`});
                            } else {
                                res.status(200).send(total);
                            }            
                     })
             // }
        });
        
        app.post("/api/users", async (req,res) => {
            try {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                console.log(salt);
                console.log(hashedPassword);
                let user =  new User({
                    title: req.body.title,
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName, 
                    address: req.body.address,
                    countryCode: req.body.countryCode, 
                    phoneNumber: req.body.phoneNumber, 
                    email: req.body.email,
                    bank_name: req.body.bank_name,
                    bank_account_number: req.body.bank_account_number, 
                    bvn: req.body.bvn,
                    system_account_number: req.body.system_account_number, 
                    // accountBalance: req.body.accountBalance,
                    password: hashedPassword,
                    // creation_date: req.body.creation_date
            });
            console.log(user)
            user.save({user},(err,savedUser) => {
                if (err) {
                   return res.status(500).send(err);
                } else {
                    res.status(200).send(`successfully saved, ${savedUser}`);
                    // res.redirect("../public/signIn.html");
                }
            })
        } catch {
             res.status(500).send(`something went wrong`);
            //  return res.redirect("../public/signIn.html");

        }
    });

    // test **************************
    app.post("/api/users/login/:firstName", async (req,res) => {
      try {
          let data = {
              firstName: req.params.firstName,
              password: req.body.password
          };
        let user = await User.findOne({"firstName": data.firstName}).exec();
                if (!user) {
                return res.status(400).send({error: "Could NOT find user information!"});
            }
            if (!bcrypt.compareSync(data.password, user.password)) {
                return res.status(400).send({message:`Unsuccessful, incorrect username and password combination`});
                    // res.send("Success!");
                } 
                res.send({ message: `Welcome ${user.firstName}, Successfully logged in correct password!`});
                // res.redirect("../public/index.html")
            } catch (error){
                res.status(500).send(`aweful stuff ${error}`);
                
            }
        });

        app.post("/api/users/login/:username", async (req,res) => {
            try {
                let data = {
                    username: req.params.username,
                    password: req.body.password
                };
                let user = await User.findOne({"userName": data.username}).exec();
                     if (!user) {
                         return res.status(400).send({error: `Could Not Get User Information`});
                     }
                    if (!bcrypt.compareSync(data.password, user.password)) {
                        return res.status(400).send({message:`Unsuccessful, incorrect username and password combination`});
                        // res.send("Success!");
                    } 
                    res.send({ message: `Welcome ${user.firstName}, Successfully logged in correct password!`});
                    // res.redirect("../public/index.html")
                } catch (error){
                    // res.status(500).redirect(`../public/signUp`);
                    res.status(500).send(`aweful stuff ${error}`);
                    
                }            
            });

            app.post("/api/users/login/:phoneNumber", async (req,res) => {
                try {
                    let data = {
                        phoneNumber: req.params.phoneNumber,
                        password: req.body.password
                    };
                    let user = await User.findOne({"phoneNumber": data.phoneNumber}).exec();
                         if (!user) {
                             return res.status(400).send({error: `Could Not Get User Information`});
                         }
                        if (!bcrypt.compareSync(data.password, user.password)) {
                            return res.status(400).send({message:`Unsuccessful, incorrect phoneNumber and password combination`});
                            // res.send("Success!");
                        } 
                        res.send({ message: `Welcome ${user.firstName}, Successfully logged in correct password!`});
                        // res.redirect("../public/index.html")
                    } catch (error){
                        res.status(500).send(`aweful stuff ${error}`);
                        
                    }            
                });

            

    //     app.post("/api/users/login/:email", async (req,res) => {
    //         try {
    //             let data = {
    //                 email: req.params.email,
    //                 password: req.body.password
    //             };
    //             let user = await User.findOne({"email": data.email}).exec();
    //                  if (!user) {
    //                      return res.status(400).send({error: `Could Not Get User Information`});
    //                  }
    //                 if (!bcrypt.compare(data.password, user.password)) {
    //                     return res.status(400).send({message:`Unsuccessful, incorrect username and password combination`});
    //                     // res.send("Success!");
    //                 } 
    //                 res.send({ message: `Welcome ${user.firstName}, Successfully logged in correct password!`});
    //                 // res.redirect("../public/index.html")
    //             } catch (error){
    //                 res.status(500).send(`aweful stuff ${error}`);
                    
    //             }            
    //         });



    //     // *********************************

    // app.post("/api/users/user/email/:email", async (req,res) => {
    //     console.log(req.body);
    //     User.findOne({"email": req.params.email}, async (err, user) => {
    //         if (err) {
    //             return res.status(400).send({error: `Could Not Get User Information`});
    //         // } else {
    //         //     res.send(user);
    //         }
    //         try {
    //             if (await bcrypt.compare(req.body.password, User.password)) {
    //                 res.send(`successfully signed in, ${user}`);
    //                 // res.send("Success!");
    //             } else {
    //                res.send("Incorrect password! Access Denied!");
    //             }
    //         } catch {
    //             res.status(500).send("aweful stuff forbidden");
    //             return;
    //         }
    //     })
    // });

    app.post("/api/users/login", async (req,res) => {
        try {
        let user = await User.findOne({"firstName": req.body.firstName, "lastName": req.body.lastName}).exec();
                if (!user) {
                return res.status(400).send({error: "Could NOT find user information!"});
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).send({message:`Unsuccessful, incorrect username and password combination`});
                    // res.send("Success!");
                } 
                res.send({ message: `Welcome ${user.firstName} Successfully logged in correct password!`});
               
            } catch (error){
                res.status(500).send(`aweful stuff ${error}`);
                
            }
        });

    // app.post("/api/users/login", async (req,res) => {
    //    try {
    //    let user = await User.findOne({"firstName": req.body.firstName, "lastName": req.body.lastName}, (err,savedUser) => {
    //         console.log(req.body.firstName);
    //         console.log(req.body.lastName);
    //         console.log(req.body.password);
    //             if (err || req.body.firstName === null) {
    //                 return res.status(400).send({error: "Could NOT find user information!"});
    //             }
    //              if ( bcrypt.compare(req.body.password, user.password)) {
    //                     res.send(`successfully found, ${savedUser}`);
    //                     // res.send("Success!");
    //                 } else {
    //                     res.send("Incorrect password!");
    //                 }
    //             })
    //             } catch (error) {
    //                 res.status(500).send("aweful stuff");
    //                 return;
    //             }
              
    //         })
            
   
        // Added 'san' System Account Number
    app.put("/api/users/user/san/:system_account_number", (req,res) => {
        let changable = {
            title: req.body.title,
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            address: req.body.address,
            countryCode: req.body.countryCode, 
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            bank_name: req.body.bank_name,
            bank_account_number: req.body.bank_account_number, 
            bvn: req.body.bvn
            
        };
        if (!changable || changable === "") {
            res.status(500).send({error: `Cannot Update User!`});
            return;
        } else {
            // let objectFound = false;
            User.updateOne({"system_account_number": req.params.system_account_number}, {$set:{title: req.body.title,
                firstName: req.body.firstName,
                lastName: req.body.lastName, 
                address: req.body.address,
                countryCode: req.body.countryCode, 
                phoneNumber: req.body.phoneNumber, 
                email: req.body.email,
                bank_name: req.body.bank_name,
                bank_account_number: req.body.bank_account_number, 
                bvn: req.body.bvn,}}, (err, balance) => {
                if (err) {
                    res.status(500).send({error: `Unable to update!`});
                    
                } else {
                    // objectFound = true;
                    res.status(200).send(balance);
                }
            })
        }
    });

    app.patch("/api/users/user/:phoneNumber", (req, res) => {
        console.log(req.params);
        let newBalance = req.body.accountBalance;
        console.log(newBalance);
        if (!newBalance || newBalance === "") {
            res.status(500).send({error: `Cannot Update Balance!`})
        } else {
                User.updateOne({"phoneNumber": req.params.phoneNumber}, {$set:{"accountBalance": newBalance}}, (err, balance) => {
                    if (err) {
                        res.status(500).send({error: `Unable to update!`});
                        
                    } else {
                        // objectFound = true;
                        res.status(200).send(balance);
                    }
                 })
                }
            })
    app.delete("/api/users/user/:system_account_number", (req,res) => {
        console.log(req.params);
        // let objectFound = false;
        // let newListOfUsers = [];
        User.deleteOne({"system_account_number": req.params.system_account_number}, (err, users) => {
            if (err) {
                res.status(500).send({error: `Unable to update!`});
                
            } else {
                // objectFound = true;
                res.status(200).send(users);
            }
        })            
    });    
};