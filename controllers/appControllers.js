const Book = require('../models/book');
const Cart = require('../models/cart');
const mongodb = require('mongodb');

exports.getHome = (req,res,next)=>{
    res.render('home.ejs',{path:'/'});
};

exports.getAddProduct = (req,res,next)=>{
    Book.fetchAll().then((books)=>{
        res.render('add.ejs' , {books : books , path: '/add'});
    });
};

exports.postEditProduct = (req,res,next)=>{
  const updatedPrice = req.body.updatedPrice;
  const updatedTitle = req.body.updatedTitle;
  const bid = req.params.bookId;

  const book = new Book(updatedTitle , updatedPrice , new mongodb.ObjectId(bid));

  book.save().then(result=>{
    console.log("update successfull");
    res.redirect("/add");
  }).catch(err=>{
    console.log(err);
  });
 
};

exports.getEditProduct = (req,res,next)=>{
    const bid = req.params.bookId;
    Book.findById(bid).then(book=>{
        res.render('editForm.ejs',{book : book});
    }).catch(err=>{
        console.log(err);
    })
};


exports.postAddProduct = (req,res,next)=>{
    const book = new Book(req.body.bookTitle , req.body.price);
    book.save().then(result=>{
        console.log("Result received is  : " + result);
        console.log("Book added");
        res.redirect('/add');
    });
};

exports.postDeleteProduct = (req,res,next)=>{
    const bookId = req.params.bookId;
    Book.deleteById(bookId).then((_)=>{
        res.redirect("/add");
    }).catch(err=>{
        console.log(err);
    })
};

exports.details = (req,res,next)=>{
    const bid = req.params.bookID;
    const book = Book.findById(bid).then(book=>{
        res.render('detail.ejs',{product : book});
    });
};

exports.postCart = (req,res,next)=>{
    const bookId = req.body.bookid;
    const foundBook = Book.findById(bookId);
    Cart.addProduct(bookId, foundBook.price);
    res.redirect('/cart');
};

exports.getCart = (req,res,next)=>{
    const cart = Cart.getCart();
    res.render('cart.ejs' , {cart : cart});
}

