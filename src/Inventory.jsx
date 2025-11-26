import "./main.css"
import { useInventory } from "./InventoryContext";

import canOpener from "./assets/can_opener.png"
import sardines from "./assets/sardines.png"
import openSardines from "./assets/sardines.png"

export default function Inventory() {
  const { inventory, addItem, removeItem, activeItem, setActiveItem, checkMatch } = useInventory();
  return (
    <div className="inventory">
      {inventory.map((item, index) => (
        <button key={index} className={`inventory-item${activeItem === index ? " selected" : ""}`} 
        style={{
          backgroundImage: `url(${item})`}}
        onClick={() => {
          //TODO: consider changing mechanics
          if (checkMatch(canOpener) && item === sardines) {
            removeItem(sardines);
            addItem(openSardines);
            removeItem(canOpener);
            return;
          }
          if (activeItem == index) setActiveItem(-1);
          else setActiveItem(index)
        }}/>
      ))}
    </div>
  )
}