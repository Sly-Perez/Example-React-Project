import './Directors.css';

import { useState, useEffect } from 'react';

import PageHeader from '../components/PageHeader';
import { API_URL } from '../utils/API_URL';

const Directors = () => {

    const [directorsList, setDirectorsList] = useState([]);
    const [names, setNames] = useState("");
    const [movies, setMovies] = useState("");
    const [directorId, setDirectorId] = useState("");

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
                                        <i className="bi bi-pencil-square" title="Edit"
                                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasUpdate"
                                            onClick={() => selectDirector(director)}
                                        ></i>
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
    
    const generateOffCanvasInsert = () =>{
        return (
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasInsert" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Add Director</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">

                    <form onSubmit={(event) => insertDirector(event)}>
                        <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Names" 
                            value={names} required minLength="2"
                            onChange={(event) => setNames(event.target.value)}    
                        />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Movies" 
                            value={movies} required minLength="3"
                            onChange={(event) => setMovies(event.target.value)}
                        />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        )
    }

    const generateOffCanvasUpdate = () =>{
        return (
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasUpdate" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Update Director</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">

                    <form onSubmit={(event) => updateDirector(event)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" 
                                value={directorId} readOnly
                            />
                        </div>
                        <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Names" 
                            value={names} required minLength="2"
                            onChange={(event) => setNames(event.target.value)}    
                        />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Movies" 
                            value={movies} required minLength="3"
                            onChange={(event) => setMovies(event.target.value)}
                        />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        )
    }

    const selectDirector = (director)=>{
        setDirectorId(director.iddirector);
        setNames(director.nombres);
        setMovies(director.peliculas);
    }

    const insertDirector = (event) =>{
        event.preventDefault();

        const serviceUrl = API_URL + "/directoresinsert.php";

        const formData = new FormData();
        formData.append("nombres", names);
        formData.append("peliculas", movies);

        fetch(serviceUrl, {
            method: "POST",
            body: formData
        })
        .then((response) =>{
            return response.json();
        })
        .then((data) =>{
            readService();

            setMovies("");
            setNames("");
            document.querySelector('#offcanvasInsert .btn-close').click();
        })
    }

    const updateDirector = (event)=>{
        event.preventDefault();
        
        const serviceUrl = API_URL + "/directoresupdate.php";

        const formData = new FormData();
        formData.append("iddirector", directorId);
        formData.append("nombres", names);
        formData.append("peliculas", movies);

        fetch(serviceUrl, {
            method: "POST",
            body: formData
        })
        .then((response) =>{
            return response.json();
        })
        .then((data) =>{
            readService();

            //This is not necessary because these values will always change based on the clicked row
            setDirectorId("");
            setMovies("");
            setNames("");
            //This is not necessary because these values will always change based on the clicked row

            document.querySelector('#offcanvasUpdate .btn-close').click();
        })
    }

    return (
        <>
            <PageHeader title="Directors" />
            <section className="padded" id="section-directors">
                <div className="container">
                    <button className="btn btn-primary" 
                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasInsert" 
                    >
                        Add Director
                    </button>
                    { generateTable() }
                </div>
            </section>
            { generateOffCanvasInsert() }
            { generateOffCanvasUpdate() }
        </>
    )
}

export default Directors;