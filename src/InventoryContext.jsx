import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState(new Array(6).fill(""));
  const [activeItem, setActiveItem] = useState(-1);

  function addItem(item) {
    const empty = inventory.indexOf("");
    console.log(empty);
    if (empty !== -1) {
      const newInventory = [...inventory];
      newInventory[empty] = item;
      setInventory(newInventory);
    } 
    //TODO else, if already in array or no space 
  }

  function removeItem(item) {
    const index = inventory.indexOf(item);
    if (index !== -1) {
      const newInventory = [...inventory];
      newInventory[index] = "";
      setInventory(newInventory);
    }
  }

  function checkMatch(item) {
    return inventory[activeItem] === item;
  }

  return (
    <InventoryContext.Provider value={{ inventory, setInventory, addItem, removeItem, activeItem, setActiveItem, checkMatch }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}