const router = require('express').Router();
const mysql = require('mysql');

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




router.get('/checkadmin/:id', async (req, res) => {
    const {id} = req.params;
    const query = `SELECT * FROM admins WHERE adminid = '${id}'`;
    client.query(
        query,
        (err, result) => {
            if (result.length === 0) {
                res.json({isAdmin: false});
            } else {
                res.json({isAdmin: true});
            }
        }
      );    
}); 
router.get('/clients', async (req, res) => {
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
router.get('/client/:userid', async (req, res) => {
    try {
        // select all from table users where id = userid
        const {userid} = req.params;
        const query = `SELECT * FROM users WHERE id = '${userid}'`;
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


router.post('/client', async (req, res) => {
    try {
        // insert into table users the values of columns :  'fullname', 'cell_phone', 'email', 'pwd', 'current_balance', 'funds_on_hold', 'withdrawable_balance', 'date_of_birth', 'country', 'company_name', 'account_number', 'btc_wallet', 'bank_name', 'swift', 'iban', 'beneficiary_name', 'beneficiary_address', 'contact_information', 'bank_address'
        const {fullname, email, pwd, current_balance, funds_on_hold, withdrawable_balance ,date_of_birth, country,company_name, account_number, btc_wallet, bank_name, swift, iban, beneficiary_name, beneficiary_address, contact_information, bank_address} = req.body;
        console.log(req.body)
        const query = `INSERT INTO users (fullname, email, pwd, current_balance, funds_on_hold, withdrawable_balance ,date_of_birth, country,company_name, account_number, btc_wallet, bank_name, swift, iban, beneficiary_name, beneficiary_address, contact_information, bank_address) VALUES ('${fullname}', '${email}', '${pwd}', '${current_balance}', '${funds_on_hold}', '${withdrawable_balance}' ,'${date_of_birth}', '${country}', '${company_name}', '${account_number}', '${btc_wallet}', '${bank_name}', '${swift}', '${iban}', '${beneficiary_name}', '${beneficiary_address}', '${contact_information}', '${bank_address}')`;
        client.query(
            query,
            (err, result) => {
                console.log(err)
                res.json(result);
            }
          );
        
    } catch (e) {
        console.log(e)

        res.status(500).json({message: 'Something went wrong'});
    }
});
router.delete('/client/:userid', async (req, res) => {
    try {
        // delete from table users where id = userid
        const {userid} = req.params;
        const query = `DELETE FROM users WHERE id = '${userid}'`;
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

router.put('/client/:userid', async (req, res) => {
    try {
        // update table users where id = userid
        const {userid} = req.params;
        const {fullname, email, pwd, current_balance, funds_on_hold, withdrawable_balance ,date_of_birth, country,company_name} = req.body;
        const query = `UPDATE users SET fullname = '${fullname}', email = '${email}', pwd = '${pwd}', current_balance = '${current_balance}', funds_on_hold = '${funds_on_hold}', withdrawable_balance = '${withdrawable_balance}' ,date_of_birth = '${date_of_birth}', country = '${country}',company_name = '${company_name}' WHERE id = '${userid}'`;
        client.query(
            query,
            (err, result) => {
                res.json(result);
                console.log(err)
            }
            );
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});


module.exports = router;
