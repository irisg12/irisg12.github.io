import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState(new Array(6).fill(""));
  const [activeItem, setActiveItem] = useState(-1);
  const [puzzleStates, setPuzzleStates] = useState({
    // About states
    seedsUp: false,
    planted: false,
    grown: false,
    // Pic garden states
    threadUp: false,
    // Personal project states
    batterUp: false,
    batterPlaced: false,
    baked: false,
    canOpenerUp: false,
    sardinesUp: false,
    waterCanUp: false,
    // Project states
    wheelPlaced: false,
    letterUp: false,
    starUp: true,
    buttonPlaced: false,
    threadPlaced: false,
    // Guestbook states
    mailPlaced: false,
    star2Up: true
  })

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

  function updatePuzzleState(key, value) {
    setPuzzleStates(prev => ({ ...prev, [key]: value }));
  }

  return (
    <InventoryContext.Provider value={{ inventory, setInventory, addItem, removeItem, activeItem, setActiveItem, checkMatch, puzzleStates, updatePuzzleState }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}