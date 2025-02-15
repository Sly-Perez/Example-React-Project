import React from 'react';
import { useState, useEffect } from 'react';

import PageHeader from '../components/PageHeader';
import { API_URL } from '../utils/API_URL';

const Employees = () => {

  const [employeesList, setEmployeesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  //in order to make the web service be called just once, we use useEffect
  useEffect(()=>{
      readService();
  }, []);

  const readService = () =>{
      const serviceUrl = `${API_URL}/empleados.php`;

      fetch(serviceUrl)
      .then((response) => {
          return response.json();
      })
      .then((data)=>{
          setEmployeesList(data);
          setIsLoading(false);
      })
  }

  const generateGrid = () =>{
    return (
      <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
        {
          employeesList.map((employee)=>(
            <div key={employee.idempleado} className="col">
              <div className="card h-100">
                <img src={`${API_URL}/fotos/${employee.foto}`} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{employee.nombres} {employee.apellidos}</h5>
                  <p className="card-text">{employee.cargo}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  const generateLoader = ()=>{
    return (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    )
  }

  return (
    <>
      <PageHeader title="Employees" />
      <section className="padded">
          <div className="container">
              { isLoading ? generateLoader() : generateGrid() }
          </div>
      </section>
    </>
  )
}

export default Employees;