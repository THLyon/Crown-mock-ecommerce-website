import { createContext, useState, useEffect } from 'react'; 
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
export const ProductsContext = createContext({
    products: [], 
}); 



export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getCategoriesMap = async () => {
           const categoryMap = await getCategoriesAndDocuments();
           console.log(categoryMap);  
        }
        getCategoriesMap(); 
    }, [])

    const value = {products}; 
    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
};


    //!COMMENTED OUT TO ONLY BE DONE ONCE. ALREADY RAN AND DONT WANT IT TO RUN AGAIN. 
    // import SHOP_DATA from '../shop-data.js'; 

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA); 
    // }, []);
