export const addToCart = (product, quantity) =>{
    //we'll add a quantity property to the product dynamically
    product.quantityAdded = quantity;

    let cart = [];

    //if there is already a product saved in our shoppingCart item of sessionStorage, it'll be added to our array
    if(sessionStorage.getItem("shoppingCart")){
        //if our shoppingCart was already set, it'll update our cart array of the function with the object saved in sessionStorage
        cart = JSON.parse(sessionStorage.getItem("shoppingCart"));

        //to add the quantity in case the product is already in the cart
        //this index will allow us to know if the product is in the cart
        let index = -1;
        for (let i = 0; i < cart.length; i++) {
            //the value of index will be different than 1 JUST when the product is found in the cart
            if(cart[i].idproducto === product.idproducto){
                index = i;
                break;
            }
        }

        if(index === -1){
            cart.push(product);
        }
        else{
            cart[index].quantityAdded += quantity;
        }
    }
    //otherwise, it'll have the shoppingCart empty (by default) and it'll add the new product
    else{
        cart.push(product);
    }

    //we save our cart in session (it is lost once you close the tab unlike localStorage)
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
}