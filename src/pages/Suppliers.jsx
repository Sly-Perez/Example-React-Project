import { useState, useEffect } from 'react';

import PageHeader from '../components/PageHeader';
import { API_URL } from '../utils/API_URL';
import { addToSelSuppliers } from '../utils/AddToSelSuppliers';

const Suppliers = () => {

    const [suppliersList, setSuppliersList] = useState([]);

    //in order to make the web service be called just once, we use useEffect
    useEffect(()=>{
        readService();
    }, []);

    const readService = () =>{
        const serviceUrl = `${API_URL}/proveedores.php`;

        fetch(serviceUrl)
        .then((response) => {
            return response.json();
        })
        .then((data)=>{
            setSuppliersList(data);
        })
    }

    const generateTable = () =>{
        return (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Company</th>
                            <th>Contact Name</th>
                            <th>Title</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            suppliersList.map((supplier)=>(
                                <tr key={supplier.idproveedor} onClick={() => addToSelSuppliers(supplier)}>
                                    <td>{supplier.idproveedor}</td>
                                    <td>{supplier.nombreempresa}</td>
                                    <td>{supplier.nombrecontacto}</td>
                                    <td>{supplier.cargocontacto}</td>
                                    <td>{supplier.ciudad}</td>
                                    <td>{supplier.pais}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        )
    }
    

    return (
        <>
            <PageHeader title="Suppliers" />
            <section className="padded">
                <div className="container">
                    { generateTable() }
                </div>
            </section>
        </>
    )
}

export default Suppliers;