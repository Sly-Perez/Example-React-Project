import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';

const Customers = () => {
    const [customersList, setCustomersList] = useState([]);

    useEffect(()=>{
        readService();
    }, []);

    const readService = ()=>{
        const serviceUrl = 'https://servicios.campus.pe/servicioclientes.php';

        fetch(serviceUrl)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            setCustomersList(data);
        })
    }

    const generateTable = ()=>{
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Company</th>
                        <th>Contact Name</th>
                        <th>Contact Title</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Fax</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customersList.map((customer)=>(
                            <tr key={customer.idcliente}>
                                <td>{customer.idcliente}</td>
                                <td>{customer.usuario}</td>
                                <td>{customer.empresa}</td>
                                <td>{customer.nombres}</td>
                                <td>{customer.cargo}</td>
                                <td>{customer.ciudad}</td>
                                <td>{customer.pais}</td>
                                <td>{customer.fax}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

    return (
        <>
            <PageHeader title="Customers"/>
            <section className="padded">
                <div className="container">
                    { generateTable() }
                </div>
            </section>
        </>
    )
}

export default Customers;