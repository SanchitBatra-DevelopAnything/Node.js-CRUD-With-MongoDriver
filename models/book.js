const mongoData = require('../util/database');
const getDB = mongoData.getDB;
const mongodb = require('mongodb');
const books = [];

module.exports = class Book{
    constructor(t , price , id){
        this.title = t;
        this.price = price;
        this._id = id;
    }

    save(){
        const db = getDB();
        let dbOp;
        if(this._id)
        {
            dbOp = db.collection('books').updateOne({_id : new mongodb.ObjectId(this._id)},{$set : this});
        }
        else
        {
            dbOp = db.collection('books').insertOne(this);
        }
        return dbOp.then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(err);
        })
    }

    static fetchAll(){
        const db = getDB();
        return db.collection('books').find().toArray().then(
            books=>{
                console.log(books);
                return books;
            }
        ).catch(err=>{
            console.log(err);
        })
    }

    static findById(id){
        const db = getDB();
        return db.collection('books').find({_id:new mongodb.ObjectId(id)}).next().then(book=>{
            console.log("book found");
            return book;
        }).catch(err=>{
            console.log(err);
        });
    }

    static deleteById(prodId)
    {
        const db = getDB();
        return db.collection('books').deleteOne({_id : new mongodb.ObjectId(prodId)}).then(result=>{
            console.log("Deleted successfully!");
        }).catch(err=>{
            console.log(err);
        });
    }

}