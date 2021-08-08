let User = require("../model/users.jsx");
// let UserInfo = require("../model/userInfo.jsx");
let path= require('path');
let home = "../coinz/public/index.html";
let signIn = "../coinz/public/signIn.html";


module.exports = app => {
    app.get('/favicon.ico', (req, res) => res.status(204)); // (to stop favicon error)
 
    //Added next three lines for app to land on signin/sign up page
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(signIn)) //, { root: __dirname }));
    });

    app.get('/home', (req, res) => {
        res.sendFile(path.resolve(home)) //, { root: __dirname }));
    });

    app.get('/api/test', (req, res) => {
        let data = req.body
        console.log(JSON.stringify(data));
        res.json(JSON.stringify(data));
    });
   
    app.get("/api/users", (req,res) => {
        console.log(req.body);
        User.find({}, (err, users) => {
            if (err) {
                res.status(500).send({error: `Could not get user information`});
            } else {
                res.status(200).send(users);
            }
        })
    });
    app.get("/api/users/user/:phoneNumber", (req,res) => {
        console.log(req.body);
        User.findOne({"phoneNumber": req.params.phoneNumber}, (err, user) => {
            if (err) {
                res.status(500).send({error: `Could not get user information`});
            } else {
                res.status(200).send(user);
            }
        })
    });
    app.get("/api/users/user/:email", (req,res) => {
        console.log(req.body);
        User.findOne({"email": req.params.email}, (err, user) => {
            if (err) {
                res.status(500).send({error: `Could not get user information`});
            } else {
                res.status(200).send(user);
            }
        })
    });
    
    // Get sum of all users account balance 
    app.get("/api/users/total", (req,res) => {
        console.log(req.params);
        let totalBalance = req.body.totalBalance;
        console.log(totalBalance);
        if (!totalBalance || totalBalance === "") {
            res.status(500).send({error: `Cannot Get Balance!`})
        } else {
        User.aggregate({$sum: accountBalance}, (err, total) => {
            if (!err) {
                res.status(500).send({error: `Could not get user information`});
            } else {
                res.status(200).send(total);
            }
            
        })
        }
    });

    app.get("/api/users/user/:system_account_number", (req,res) => {
        console.log(req.params);
        // let objectFound = false;
        // let newListOfUsers = [];
        User.findOne({"system_account_number": req.params.system_account_number}, (err, user) => {
            if (err) {
                res.status(500).send({error: `Unable to get information!`});
                
            } else {
                // objectFound = true;
                res.status(200).send(user);
            }
        })            
    });

    app.post("/api/users", (req,res) => {
        let user = User({
            title: req.body.title,
            name: req.body.name, 
            address: req.body.address,
            countryCode: req.body.countryCode, 
            phoneNumber: req.body.phoneNumber, 
            email: req.body.email,
            bank_name: req.body.bank_name,
            bank_account_number: req.body.bank_account_number, 
            bvn: req.body.bvn,
            system_account_number: req.body.system_account_number, 
            accountBalance: req.body.accountBalance,
            creation_date: req.body.creation_date
        });
        user.save((err,savedUser) => {
            if (err) {
                res.status(500).send({error: "Could NOT save user information!"});
            } else {
                res.status(200).send(`successfully saved, ${savedUser}`);
            }
        })
    });

    app.put("/api/users/user/:system_account_number", (req,res) => {
        let changable = {
            title: req.body.title,
            name: req.body.name, 
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
                name: req.body.name, 
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