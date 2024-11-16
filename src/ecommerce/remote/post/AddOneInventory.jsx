import axios from "axios";

export function AddOneInventory(Inventory) {
    
    console.log("<<EJECUTA>> API <<AddOneInventory>> Requiere:", Inventory)
    return new Promise((resolve, reject) => {

      axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/negocio/9001-1101/almacen`, Inventory)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneInventory", Inventory)
          const data = response.data;
          //console.log("<<RESPONSE>> DATA:", data);
          if (!data || data.error) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneInventory>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneInventory>>", error);
          reject(error); 
        });     
    });
 }