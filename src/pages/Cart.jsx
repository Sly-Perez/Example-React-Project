import './Cart.css';

import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const Cart = () => {

    const [itemsList, setItemsList] = useState([]);
    const [cartTotals, setCartTotals] = useState(0);

    useEffect(()=>{
        readCartData();
    }, [])

    const readCartData = ()=>{
        const cartData = JSON.parse(sessionStorage.getItem("shoppingCart"));
        setItemsList(cartData);
        
        if(cartData !== null && cartData.length > 0){
            calculateCartTotals(cartData);
        }
    }

    const emptyCart = ()=>{
        sessionStorage.removeItem("shoppingCart");
        setItemsList([]);
        setCartTotals(0);
    }

    const deleteItemFromCart = (item)=>{
        //filter function returns all the elements from an array that match the condition indicated:
        //it will return all the items but the one that's going to be deleted
        const updatedItemsList = itemsList.filter(i => i.idproducto !== item.idproducto);
        //now, we update the value of our ItemsList
        setItemsList(updatedItemsList);
        //finally, we "update"/overwrite our shoppingCart item set in session storage
        sessionStorage.setItem("shoppingCart", JSON.stringify(updatedItemsList));

        calculateCartTotals(updatedItemsList);
    }

    const calculateCartTotals = (cartData)=>{
        //in the itemsList.reduce((accumulator variable, item traversed from the list) => the value returned, initial value)
        let cartTotals = cartData.reduce((returnedTotal, item) => returnedTotal + (item.precio * item.quantityAdded), 0);
        setCartTotals(cartTotals);
    }


    const updateQuantityAdded = (id, updatedQuantityAdded)=>{
        const updatedItemsList = itemsList.map(item =>{
            if(item.idproducto === id){
                item.quantityAdded = updatedQuantityAdded;
            }
            return item;
        })

        setItemsList(updatedItemsList);
        sessionStorage.setItem("shoppingCart", JSON.stringify(updatedItemsList));
        calculateCartTotals(updatedItemsList);
    }

    const generateTable = () =>{

        return (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th className="text-end">Price</th>
                            <th className="text-end">Quantity</th>
                            <th className="text-end">Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (itemsList != null && itemsList.length > 0)
                            ? itemsList.map((item)=>(
                                <tr key={item.idproducto}>
                                    <td>{item.idproducto}</td>
                                    <td>{item.nombre}</td>
                                    <td className="text-end">{Number(item.precio).toFixed(2)}</td>
                                    <td className="text-end">
                                        <input type="number" min="1" className="form-control text-end ms-auto quantity-added-input" 
                                            value={item.quantityAdded} 
                                            onChange={(event) => updateQuantityAdded(item.idproducto, Number(event.target.value))}
                                        />
                                    </td>
                                    <td className="text-end">{Number(item.precio * item.quantityAdded).toFixed(2)}</td>
                                    <td>
                                        <i className="bi bi-x-square-fill delete-icon" 
                                            title="Delete from Cart" 
                                            onClick={() => deleteItemFromCart(item)}
                                        ></i>
                                    </td>
                                </tr>
                            ))
                            : <tr>
                                <td colSpan="6">No products in the cart</td>
                            </tr>
                        }
                    </tbody>
                </table>
        )
    }

    return (
        <>
            <PageHeader title="Shopping Cart" />
            <section className="padded">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-10">
                            { generateTable() }
                            <button className="btn btn-danger"
                                onClick={ ()=> emptyCart() }>
                                Empty Cart
                            </button>
                        </div>
                        <div className="col-lg-2">
                            <div className="card border-dark mb-3">
                                <div className="card-header">
                                    Cart Totals
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Total</th>
                                                <td className="text-end">
                                                    S/ {cartTotals.toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
}

export default Cart;