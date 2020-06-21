const cart = {products : [], totalPrice : 0};

module.exports = class Cart{
   static addProduct(id , productPrice)
   {
        const existingProductIndex = cart.products.findIndex(prod => prod.id == id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        if(existingProduct){
            // updatedProduct = {...existingProduct};
            // updatedProduct.qty++;
            existingProduct.qty++;
        }
        else{
            updatedProduct= {id : id , qty : 1};
            cart.products = [...cart.products , updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        console.log(cart);
   }

   static getCart(){
       return cart;
   }
}