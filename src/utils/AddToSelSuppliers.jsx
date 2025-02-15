export const addToSelSuppliers = (supplier) => {

    let suppliers = [];

    if(sessionStorage.getItem("selectedSuppliers")){
        suppliers = JSON.parse(sessionStorage.getItem("selectedSuppliers"));

        let index = -1;

        for (let i = 0; i < suppliers.length; i++) {
            if(supplier.idproveedor === suppliers[i].idproveedor){
                index = i;
                break;
            }
        }

        if(index === -1){
            suppliers.push(supplier);
        }

    }
    else{
        suppliers.push(supplier);
    }

    sessionStorage.setItem("selectedSuppliers", JSON.stringify(suppliers));
}
