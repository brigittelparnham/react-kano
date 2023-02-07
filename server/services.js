const sqlite3 = require("sqlite3").verbose();
const assert = require('assert');
const jwt = require('jsonwebtoken');

const db = new sqlite3.Database("./database.db", function (err) {
    if (err) {
      console.error(err);
      process.exit(1); //Bail out we can't connect to the DB
    } else {
      console.log("Database connected");
      db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
    }
});

/**
 * loginUser
 * Fetches the user from the database based on username
 * Check passwords match 
 * NB. This is a very naive implementation
 * 
 * @param {string} username 
 * @param {string} password
 * @returns the database record for the user
 */

async function loginUser(username, password){

    //Find the user from the db
    const user = await getUserFromUsername(username);

    //If they don't exist and the password doesn't match throw an error
    assert(user, "user not found");
    assert(user.password === password, "incorrect password");

    //Create a web token and return it
    const {user_id, firstname, surname} = user;

    const token = jwt.sign(
        {user_id, firstname, surname, username}, 
        process.env.REACT_APP_SECRET, 
        {expiresIn: process.env.JWT_EXP_HOURS + "h"}
    );

    return token;
}

/////////////////////////////////// HELPERS //////////////////////////////////

/**
 * Get a user record given their username
 */
function getUserFromUsername(username){
    const sql = `SELECT * FROM users WHERE username = ?`
    return new Promise ((resolve, reject)=>{
        db.get(sql,[username],function(err,row){
            if(err){
                reject(err)
            }else{
                resolve(row);
            }
        })
    });
}

module.exports = {loginUser};