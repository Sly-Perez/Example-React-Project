import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";


const SelectedSuppliers = () => {

    const [selSuppliersList, setSelSuppliersList] = useState([]);

    useEffect(()=>{
        readSelSuppliersData();
    }, []);

    const readSelSuppliersData = ()=>{
        const selSuppliersData = JSON.parse(sessionStorage.getItem("selectedSuppliers"));
        setSelSuppliersList(selSuppliersData);
    }

    const emptySelSuppliers = ()=>{
        sessionStorage.removeItem("selectedSuppliers");
        setSelSuppliersList([]);
    }

    const deleteFromSelSuppliers = (supplier)=>{
        const updatedSelSuppliers = selSuppliersList.filter(s => s.idproveedor !== supplier.idproveedor);

        setSelSuppliersList(updatedSelSuppliers);

        sessionStorage.setItem("selectedSuppliers", JSON.stringify(updatedSelSuppliers));
    }

    const generateTable = ()=>{
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (selSuppliersList != null && selSuppliersList.length > 0)
                        ? selSuppliersList.map((supplier)=>(
                            <tr key={supplier.idproveedor}>
                                <td>{supplier.idproveedor}</td>
                                <td>{supplier.nombreempresa}</td>
                                <td>{supplier.nombrecontacto}</td>
                                <td>{supplier.cargocontacto}</td>
                                <td>{supplier.ciudad}</td>
                                <td>{supplier.pais}</td>
                                <td>
                                    <i className="bi bi-x-square-fill delete-icon" 
                                        title="Delete from Cart" 
                                        onClick={() => deleteFromSelSuppliers(supplier)}
                                    ></i>
                                </td>
                            </tr>
                        ))
                        : <tr>
                            <td colSpan="6">No suppliers selected</td>
                        </tr>
                    }
                </tbody>
            </table>
        )
    }
    

    return (
        <>
            < PageHeader title="Selected Suppliers" />
            <section className="padded">
                <div className="container">
                    { generateTable() }
                    <button className="btn btn-danger"
                        onClick={ ()=> emptySelSuppliers() }>
                        Empty List
                    </button>
                </div>
            </section>
        </>
    )
}

export default SelectedSuppliers;