import "./main.css"
import { useInventory } from "./InventoryContext";

export default function Inventory() {
  const { inventory } = useInventory();
  return (
    <div className="inventory">
      {inventory.map((item, index) => (
        <button key={index} className="inventory-item" 
        style={{
          backgroundImage: `url(${item})`}}/>
      ))}
    </div>
  )
}