import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useImageDimensions from "./useImageDims";
import Inventory from "./Inventory";
import { useInventory } from "./InventoryContext";
import './main.css'

import kitchen from "./assets/room_kitchen.png"
import batter from "./assets/batter.png"
import canOpener from "./assets/can_opener.png"
import drawer from "./assets/drawer.png"
import openDrawer from "./assets/drawer_open.png"
import sardines from "./assets/sardines.png"
import waterCan from "./assets/water_can.png"
import fridgeDoor from "./assets/fridge_door.png"
import fridgeHandle from "./assets/fridge_handle.png"

const images = [
  { id: "batter", src: batter },
  { id: "canOpener", src: canOpener },
  { id: "drawer", src: drawer },
  { id: "openDrawer", src: openDrawer},
  { id: "sardines", src: sardines },
  { id: "waterCan", src: waterCan },
  { id: "fridgeDoor", src: fridgeDoor },
  { id: "fridgeHandle", src: fridgeHandle },
];

export default function ProjectsFun() {
  const { widths, heights } = useImageDimensions(images);
  const { addItem, removeItem } = useInventory();
  const [doorOpen, setDoor] = useState(false);
  const [batterPlaced, setBatter] = useState(true);
  const [canOpenerUp, setCanOpener] = useState(false);
  const [drawerOpen, setDrawer] = useState(false);
  const [sardinesUp, setSardines] = useState(false);
  const [waterCanUp, setWaterCan] = useState(false);
  const SF = .042;

  const toggleDoor = () => {
    setDoor(!doorOpen);
  }

  const handleBatter = () => {
    setBatter(false);
    addItem(batter);
  }

  const handleCanOpener = () => {
    setCanOpener(true);
    addItem(canOpener);
  }

  const toggleDrawer = () => {
    setDrawer(!drawerOpen);
  }

  const handleSardines = () => {
    setSardines(true);
    addItem(sardines);
  }

  const handleWaterCan = () => {
    setWaterCan(true);
    addItem(waterCan);
  }

  return (
    <>
      <h1> Personal Projects (not engineering)</h1>
      <p> kitchen </p>
      <div className="room-container" style={{backgroundImage: `url(${kitchen})`}}>
        <Link to="/pic-garden" className="nav-button">&lt;</Link>
        <br />
        <Link to="/about" className="nav-button">Leave?</Link>
        <br />
        <Link to="/projects" className="nav-button">&gt;</Link>
        <button className="interactive" onClick={toggleDoor} 
          style={{
            width: `${doorOpen ? widths["fridgeDoor"] * SF : widths["fridgeHandle"] * SF}%`,
            aspectRatio: `${doorOpen ? widths["fridgeDoor"] / heights["fridgeDoor"] : widths["fridgeHandle"] / heights["fridgeHandle"]}`,
            left: `${doorOpen ? 21 : 36}%`,
            top: "52%",
            backgroundImage: `url(${doorOpen ? fridgeDoor : fridgeHandle})`
          }}
        />
        <button className="interactive" onClick={toggleDrawer}
          style={{
            width: `${drawerOpen ? widths["openDrawer"] * SF : widths["drawer"] * SF}%`,
            aspectRatio: `${drawerOpen ? widths["openDrawer"] / heights["openDrawer"] : widths["drawer"] / heights["drawer"]}`,
            left: "43%",
            top: "66%",
            backgroundImage: `url(${drawerOpen? openDrawer: drawer})`
          }}
        />
        {doorOpen && batterPlaced && <button className="interactive" onClick={handleBatter}
          style={{
            width: `${widths["batter"] * SF}%`,
            aspectRatio: `${widths["batter"] / heights["batter"]}`,
            left: "28%",     
            top: "67%",
            backgroundImage: `url(${batter})`
          }}
        />}
        {drawerOpen && !canOpenerUp && 
        <button className="interactive" onClick={handleCanOpener}
          style={{
            width: `${widths["canOpener"] * SF}%`,
            aspectRatio: `${widths["canOpener"] / heights["canOpener"]}`,
            left: "45%",
            top: "68%",
            backgroundImage: `url(${canOpener})`
          }}
        />}
        {doorOpen && !sardinesUp && 
        <button className="interactive" onClick={handleSardines}
          style={{
            width: `${widths["sardines"] * SF}%`,
            aspectRatio: `${widths["sardines"] / heights["sardines"]}`,
            left: "27%",
            top: "55%",
            backgroundImage: `url(${sardines})`
          }}
        />}
        {!waterCanUp && <button className="interactive" onClick={handleWaterCan}
          style={{
            width: `${widths["waterCan"] * SF}%`,
            aspectRatio: `${widths["waterCan"] / heights["waterCan"]}`,
            left: "57%",
            top: "10%",
            backgroundImage: `url(${waterCan})`
          }}
        />}
        <Inventory/>
      </div>
    </>
  )
}