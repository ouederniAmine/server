    const router = require('express').Router();
    //require mysql
    const mysql = require('mysql');
    const {check, validationResult} = require('express-validator');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const {users} = require('../database');
    require('dotenv').config();
    var client = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Med1212809@",
        database: "rst"
      });
  
    router.post('/signup', [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password').isLength({min: 6})
    ], async (req, res) => {
        
        try {
            //console log req.body
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({errors: errors.array(), message: 'Invalid data'});
            }
            const {email, password} = req.body;
                //check user email in mysql database
               
                async function send() {const hashedPassword = await bcrypt.hash(password, 12);
                    //const user to create user in database
                    // create user in postgres database
                 
                    const query = `INSERT INTO users (email, pwd , current_balance, funds_on_hold ,withdrawable_balance) VALUES ('${email}', '${hashedPassword}' , 0 , 0 , 0)`;
                    const result = await client.query
                    (query);
                    console.log(result);
                    // create jwt token
                    const token = jwt.sign(
                        {email},
                        process.env.JWT_SECRET,
                        {expiresIn: '1h'}
                    );
                    console.log(token);
                    res.json({token});}
                    
               
                const query1 = `SELECT * FROM users WHERE email = '${email}'`;
                client.query(
                    query1,
                    (err, result) => {
                      if (result.length > 0) {
                        if (err) {
                          throw err;
                        }
                        let isNewMail = result[0] === undefined;
                        console.log(result[0]);
                        if (isNewMail) {
                        send();
                        } else{console.log("email already exists");}
                      }else{
                        send();
                      }
                    }
                  ); } catch (e) {
                    console.log(e);
                    res.status(500).json({message: 'Something went wrong'});
                }
         
    });

    router.get('/users', async (req, res) => {
        try {
            const query = `SELECT * FROM users`;
            client.query(
                query,
                (err, result) => {
                    res.json(result);
                }
              );
          
        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    });

    router.post('/login', async (req, res) => {
        try {
            const {email, password} = req.body;
            //check user email in database
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            let candidate;
            
            function send() {
                const isMatch = bcrypt.compare(password, candidate.pwd);
                let userid = candidate.id;
                if (!isMatch) {
                    return res.status(400).json({message: 'Invalid password'});
                }
                const token = jwt.sign(
                    {email},
                    process.env.JWT_SECRET,
                    {expiresIn: '1h'}
                );
                res.json({token ,  userid});
            }
            client.query(
                query,
                (err, result) => {
                    console.log(result);
                 candidate = result[0];
                 if (!candidate) {
                    return res.status(400).json({message: 'User not found'});
                }else{
                    send();
                }
                }
              ); 

          
        
        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    }); 
module.exports = router;
