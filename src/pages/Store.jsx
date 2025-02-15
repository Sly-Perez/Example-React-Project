import './Store.css';

import PageHeader from '../components/PageHeader';
import { useState, useEffect } from 'react';
import Products from '../components/Products';

import { API_URL } from '../utils/API_URL';

const Store = () => {

    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    
    useEffect(()=>{
        readService();
    }, []);

    const readService = ()=>{
        const serviceUrl = `${API_URL}/categorias.php`;

        fetch(serviceUrl)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            setCategoriesList(data);
            //to set the value (the first category) of the selected category as the default when loading the page
            setSelectedCategory(data[0]);
        })
    }

    const generateList = ()=>{
        return(
            <ul className="list-group" id="categories-list">
                {
                    categoriesList.map((category)=>(
                        <li key={category.idcategoria} 
                            className={`list-group-item ${category.idcategoria == selectedCategory.idcategoria ? "active" : ""}`} 
                            title={category.descripcion}
                            onClick={() => selectCategory(category)} >
                            {category.nombre}

                            <span className="position-absolute top-50 translate-middle badge rounded-pill bg-danger">
                                {category.total}
                            </span>
                        </li>
                    ))
                }
            </ul>
        )
    }

    const selectCategory = (category)=>{
        setSelectedCategory(category);
    }

    return (
        <>
            <PageHeader title="Store" />
            <section className="padded">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-2 col-lg-3 col-md-4">
                            <h3>Categories</h3>
                            { generateList() }
                        </div>
                        <div className="col-xxl-10 col-lg-9 col-md-8">
                            <h3>{selectedCategory.nombre}</h3>
                            < Products categoryId={selectedCategory.idcategoria} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Store;