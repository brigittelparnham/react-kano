const sqlite3 = require("sqlite3").verbose();
const util = require('node:util');
const fakerator = require("fakerator")();

//NB. this seeding guarantees identical data when rebuilding the db
fakerator.seed(Number(process.env.FAKERATOR_SEED));

const db = new sqlite3.Database("./database.db", function (err) {
    if (err) {
      console.error(err);
      process.exit(1); //Bail out we can't connect to the DB
    } else {
      console.log("Database connected");
      db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
      createData();
    }
});

const numUsers = 20;

async function createData(){

    try{
        await insertDefaultUser();
        await insertUsers();
        await insertCreations();
        insertReactions();
    }catch(e){
        console.error(e);
    }
    
}

function insertDefaultUser(){

    return new Promise((res,rej)=>{

        //create the user

        const user_id = fakerator.random.hex(32);
        const firstname = "Charlie";
        const surname = "Kano";
        const username = process.env.REACT_APP_TEST_USERNAME;
        const password = process.env.REACT_APP_TEST_PASSWORD;
        const email = fakerator.internet.email(firstname,surname)

        const sql = 'INSERT INTO users (user_id, firstname, surname, username, password, email) VALUES (?,?,?,?,?,?)';

        db.run(sql,[user_id, firstname, surname, username, password, email],function(err){
            if(err){
                rej(err);
            }else{
                res();
            }
        });

    });
}

function insertUsers(){

    return new Promise(res=>{

        const promises = [];
        //create the users
        for(let i = 0; i < numUsers; i++)
        {
            const user_id = fakerator.random.hex(32);
            const firstname = fakerator.names.firstName();
            const surname = fakerator.names.lastName();
            const username = fakerator.internet.userName(firstname,surname);
            const password = fakerator.internet.password(8);
            const email = fakerator.internet.email(firstname,surname)

            const sql = 'INSERT INTO users (user_id, firstname, surname, username, password, email) VALUES (?,?,?,?,?,?)';

            promises.push(

                new Promise((resolve, reject)=>{
                    db.run(sql,[user_id, firstname, surname, username, password, email],function(err){
                        if(err){
                            reject(err)
                        }else{
                            resolve();
                        }
                    });
                })

            )
        }

        Promise.all(promises)
        .then(()=>res())
        .catch(err=>console.error(err));

    });
}

function insertCreations(){

    return new Promise((res,rej)=>{

        const thumbnail = "default-creation-thumb.png";
        const creation_types = ['pixel-motion','kano-code','make-art'];
        const sql = `SELECT user_id FROM users`;
        const promises = [];
    
        db.each(sql, function(err, row){

            //decide how many creations each user should have
            const numCreations = Math.round(fakerator.random.number(10));
            for(let i = 0; i < numCreations; i++){
                const {user_id} = row;
                const title = fakerator.random.boolean() ? "untitled" : fakerator.lorem.word();
                const creation_type = creation_types[Math.round(fakerator.random.number(2))];
                const created = fakerator.date.past(2, new Date);

                const sql = `INSERT into user_creations (user_id, title, creation_type, thumbnail, created) VALUES (?,?,?,?,?)`;

                promises.push(

                    new Promise((resolve, reject)=>{
                        db.run(sql,[user_id, title, creation_type, thumbnail, created], function(err){
                            if(err){
                                reject(err);
                            }else{
                                resolve();
                            }
                        });
                    })

                );
                    
            }


            
        });

        Promise.all(promises)
        .then(()=>res())
        .catch(err=>console.error(err));
 
    })
    
}

async function insertReactions(){

    const usersSql = `SELECT user_id FROM users`;

    //get all the users
    const userIds = await new Promise(res=>db.all(usersSql,(err,rows)=>res(rows)));

    const reaction_types = ['like','love','congrats'];
    const sql = `SELECT creation_id FROM user_creations`;

    db.each(sql,function(err, row){

        const {creation_id} = row;
        
        const numReactions = Math.round(fakerator.random.number(5));
        const userIndexes = fakerator.utimes(fakerator.random.number, numReactions, 0, numUsers-1);
        for(const i of userIndexes){
            const user_id = userIds[i].user_id;
            const reaction_type = reaction_types[Math.round(fakerator.random.number(2))];
            const sql = `INSERT INTO creation_reactions (creation_id, user_id, reaction_type) VALUES (?,?,?)`;
            db.run(sql, [creation_id,user_id,reaction_type],function(err){
                if(err){
                    console.error(err);
                }
            });
        }   
            
    })

}
