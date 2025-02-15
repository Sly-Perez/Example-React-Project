import './Directors.css';

import { useState, useEffect } from 'react';

import PageHeader from '../components/PageHeader';
import { API_URL } from '../utils/API_URL';

const Directors = () => {

    const [directorsList, setDirectorsList] = useState([]);

    //in order to make the web service be called just once, we use useEffect
    useEffect(()=>{
        readService();
    }, []);

    const readService = () =>{
        const serviceUrl = `${API_URL}/directores.php`;

        fetch(serviceUrl)
        .then((response) => {
            return response.json();
        })
        .then((data)=>{
            setDirectorsList(data);
        })
    }

    const generateTable = () =>{
        return (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Director</th>
                            <th>Directed Movie</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            directorsList.map((director)=>(
                                <tr key={director.iddirector}>
                                    <td>{director.iddirector}</td>
                                    <td>{director.nombres}</td>
                                    <td>{director.peliculas}</td>
                                    <td>
                                        <i className="bi bi-pencil-square" title="Edit"></i>
                                    </td>
                                    <td>
                                        <i className="bi bi-trash3-fill" title="Delete"></i>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        )
    }
    

    return (
        <>
            <PageHeader title="Directors" />
            <section className="padded" id="section-directors">
                <div className="container">
                    <button className="btn btn-primary">
                        Add Director
                    </button>
                    { generateTable() }
                </div>
            </section>
        </>
    )
}

export default Directors;