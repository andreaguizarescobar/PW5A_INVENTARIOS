import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getInventory, getInventories } from "../../../services/get";
import { esperar } from "../../../helpers/utils";
import { TOAST_EXITO } from "../../../components/elements/messages/MyToastAlerts";
//FIC: Crear un contexto para compartir datos y funciones, y un componente que contendrá todos los estados y funciones
const InventoriesContext = createContext();
export const InventoriesProvider = ({ children }) => {
  const [Inventories, setInventories] = useState([]);
  const [Inventorysel, setInventorysel] = useState(null);
  const [presentationSel, setPresentationSel] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);
  const [idSelectedRowInventory, setIdSelectedRowInventory] = useState(null);
  const [idSelectedRowPresentation, setIdSelectedRowPresentation] =
    useState(null);
  const showToastExito = (mensaje) => TOAST_EXITO(mensaje);
  useEffect(() => {
    fetchDataInventories();
  }, []);
  const fetchDataInventories = async (id) => {
    setLoadingTable(true);
    await esperar(500);
    try {
      setInventories(await getInventories());
    } catch (error) {
      console.error(`Error al obtener los inventarios`, error);
    }
    setLoadingTable(false);
  };
  const fetchDataInventoryselect = async (id) => {
    setLoadingTable(true);
    await esperar(500);
    try {
      setInventorysel(await getInventory(id));
    } catch (error) {
      console.error(`Error al obtener inventarios:${id}`, error);
    }
    setLoadingTable(false);
  };
  const fetchPresentationSelect = async (id) => {
    setLoadingTable(true);
    try {
      let inventarioSel = await getInventory(id);
      let presentaciones = inventarioSel.cat_prod_serv_presenta;
      let presentacion = presentaciones.find((p) => {
        return p.IdPresentaOK === presentationSel.IdPresentaOK;
      });
      setPresentationSel(presentacion);
    } catch (error) {
      console.error(
        `Error al obtener la presentacion del producto ${id}`,
        error
      );
    }
    setLoadingTable(false);
  };
  //FIC: Pasar los datos y funciones a través del contexto
  const contextValue = {
    Inventories,
    Inventorysel,
    loadingTable,
    idSelectedRowInventory,
    idSelectedRowPresentation,
    presentationSel,
    setInventorysel,
    fetchDataInventories,
    fetchDataInventoryselect,
    showToastExito,
    setIdSelectedRowInventory,
    setIdSelectedRowPresentation,
    setPresentationSel,
    fetchPresentationSelect,
  };
  return (
    <InventoriesContext.Provider value={contextValue}>
      {children} <ToastContainer />
    </InventoriesContext.Provider>
  );
};
//FIC: Crear un hook personalizado para acceder al contexto
export const useInventoriesContext = () => useContext(InventoriesContext);