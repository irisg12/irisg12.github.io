import "./main.css"
import { useInventory } from "./InventoryContext";

export default function Inventory() {
  const { inventory, activeItem, setActiveItem } = useInventory();
  return (
    <div className="inventory">
      {inventory.map((item, index) => (
        <button key={index} className={`inventory-item${activeItem === index ? " selected" : ""}`} 
        style={{
          backgroundImage: `url(${item})`}}
        onClick={() => {
          if (activeItem == index) setActiveItem(-1);
          else setActiveItem(index)
        }}/>
      ))}
    </div>
  )
}