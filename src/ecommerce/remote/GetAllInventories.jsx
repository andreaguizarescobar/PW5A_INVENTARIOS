import axios from "axios";
export function getAllInventories() {
    return new Promise((resolve, reject) => {
      axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/negocio/9001-1101`)
        .then((response) => {
          const data = response.data;

          if (!Array.isArray(data) || data.length === 0) {
            console.error("No se pudo realizar correctamente la petición <<getAllInventories - Services>>", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          }  else {
            const InventoriesData = data.flatMap(item => item.almacenes); 
                    resolve(InventoriesData);
          }
        })
        .catch((error) => {
          console.error("Error en <<getAllInventories - Services>>", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }