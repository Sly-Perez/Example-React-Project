import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { API_URL } from "../utils/API_URL";

import { addToCart } from '../utils/AddToCart'

const DetailsProduct = () => {

    const params = useParams();

    const [selectedProduct, setSelectedProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    
    useEffect(()=>{
            readService(params.productId);
        }, []);
    
        const readService = ()=>{
            const serviceUrl = `${API_URL}/productos.php?idproducto=${params.productId}`;
    
            fetch(serviceUrl)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                console.log(data);
                setSelectedProduct(data[0]);
            })
        }

    return (
        <section className="padded">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                            <img className="img-fluid" 
                                src=
                                {
                                    (selectedProduct.imagengrande === null)
                                    ? `${API_URL}/imagenes/nofoto.jpg`
                                    : `${API_URL}/${selectedProduct.imagengrande}`
                                } 
                                alt="" 
                            />
                    </div>
                    <div className="col-md-6">
                        <h2>
                            {selectedProduct.nombre}
                        </h2>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Stock</th>
                                    <td>{selectedProduct.unidadesenexistencia}</td>
                                </tr>
                                <tr>
                                    <th>Details</th>
                                    <td>{selectedProduct.detalle}</td>
                                </tr>
                                <tr>
                                    <th>Category</th>
                                    <td>{selectedProduct.categoria}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td>
                                        S/ 
                                        {
                                            selectedProduct.preciorebajado === "0"
                                            ? Number(selectedProduct.precio).toFixed(2)
                                            : Number(selectedProduct.preciorebajado).toFixed(2)
                                        }
                                        <span className="former-price">
                                            {
                                                selectedProduct.preciorebajado === "0" 
                                                ? ""
                                                : " S/ " + Number(selectedProduct.precio).toFixed(2)
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Supplier</th>
                                    <td>{selectedProduct.proveedor}</td>
                                </tr>
                                <tr>
                                    <th>Country of origin</th>
                                    <td>{selectedProduct.pais}</td>
                                </tr>
                                <tr>
                                    <th>Customer attention</th>
                                    <td>{selectedProduct.telefono}</td>
                                </tr>
                                <tr>
                                    <th>Quantity Added</th>
                                    <td>
                                        <input type="number" className="form-control" 
                                        defaultValue="1" name="" min="1" 
                                        value={quantity} onChange={(event)=> setQuantity(event.target.value)}
                                        />
                                        <button className="btn btn-primary mt-2"
                                            onClick={() => addToCart(selectedProduct, quantity)}
                                        >Add to Cart</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/*<!--To interpret external html expressions (it says dangerous because it is dangerous if we pull the html code from an anonymous supplier)-->*/}
                        <h3>Description</h3>
                        <div dangerouslySetInnerHTML={{__html: selectedProduct.descripcion}}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DetailsProduct;