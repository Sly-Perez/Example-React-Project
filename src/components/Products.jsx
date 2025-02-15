import { useState, useEffect } from 'react';
import './Products.css';

//utils
import { addToCart } from '../utils/AddToCart';
import { API_URL } from '../utils/API_URL';
import { Link } from 'react-router-dom';

const Products = (props) => {
    const [productsList, setProductsList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

    //if we are going to send parameters, arguments. we indicate the passed-in props
    //in the array as a second parameter
    useEffect(()=>{
        readService(props.categoryId);
    }, [props.categoryId]);

    const readService = (categoryId)=>{
        const serviceUrl = `${API_URL}/productos.php?idcategoria=${categoryId}`;

        fetch(serviceUrl)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            setProductsList(data);
        })
    }

    const readProductOverview = (productId)=>{
        const serviceUrl = `${API_URL}/productos.php?idproducto=${productId}`;

        fetch(serviceUrl)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            setSelectedProduct(data[0]);
        })
    }
    
    const generateModalOverview = ()=>{
        return(
            <div className="modal fade" id="modalOverview" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">
                                {selectedProduct.nombre}
                            </h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const generateGrid = () =>{
        return (
          <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
            {
              productsList.map((product)=>(
                <div key={product.idproducto} className="col">
                  <div className="card h-100">
                    <Link to={`/detailsProduct/${product.idproducto}`}>
                        <img 
                            src=
                            {
                                (product.imagenchica === null)
                                ? `${API_URL}/imagenes/nofoto.jpg`
                                : `${API_URL}/${product.imagenchica}`
                            } 
                            className="card-img-top" alt="..." 
                        />
                    </Link>
                    {
                        product.preciorebajado === "0"
                        ? ""
                        : <span className="on-sale-percentage">
                            {
                                ((1 - product.preciorebajado/product.precio)*100).toFixed(0)
                            }%
                        </span>
                    }

                    <i className="bi bi-eye modal-overview-icon" title="Overview Of Product" data-bs-toggle="modal" data-bs-target="#modalOverview"
                        onClick={()=> readProductOverview(product.idproducto)}></i>

                    <div className="card-body">
                        <h6 className="card-title">{product.nombre}</h6>
                        <p className="card-text">
                            S/ 
                            {
                                product.preciorebajado === "0"
                                ? Number(product.precio).toFixed(2)
                                : Number(product.preciorebajado).toFixed(2)
                            }
                            <span className="former-price">
                                {
                                    product.preciorebajado === "0" 
                                    ? ""
                                    : " S/ " + Number(product.precio).toFixed(2)
                                }
                            </span>
                            <i className="bi bi-basket-fill cart-icon" title="Add To Cart"
                            onClick={ () => addToCart(product, 1) }
                            ></i>
                        </p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )
    }

    

    return (
        <>
            <div className="padded">
                <div className="container">
                    { generateGrid() }
                    { generateModalOverview() }
                </div>
            </div>
        </>
    )
}

export default Products;