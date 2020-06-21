const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{

    MongoClient.connect(
        'mongodb+srv://badboiBatra:xqKJ8eWx5V8yuh7V@cluster0-ytx8e.mongodb.net/ProjNode?retryWrites=true&w=majority'
    ).then(client=>{
        console.log("connected");
        _db = client.db();
        callback();
    }).catch(err=>{
        console.log(err);
    });
    
}

const getDB = ()=>{
    if(_db)
    {
        return _db;
    }
    throw 'no database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
