import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useImageDimensions from "./useImageDims";
import Inventory from "./Inventory";
import { useInventory } from "./InventoryContext";
import './main.css'

import kitchen from "./assets/room_kitchen.png"
import batter from "./assets/batter.png"
import bread from "./assets/batter.png"
import canOpener from "./assets/can_opener.png"
import drawer from "./assets/drawer.png"
import openDrawer from "./assets/drawer_open.png"
import sardines from "./assets/sardines.png"
import waterCan from "./assets/water_can.png"
import fridgeDoor from "./assets/fridge_door.png"
import fridgeHandle from "./assets/fridge_handle.png"
import button from "./assets/wheel.png"

const images = [
  { id: "batter", src: batter },
  { id: "bread", src: bread },
  { id: "canOpener", src: canOpener },
  { id: "drawer", src: drawer },
  { id: "openDrawer", src: openDrawer},
  { id: "sardines", src: sardines },
  { id: "waterCan", src: waterCan },
  { id: "fridgeDoor", src: fridgeDoor },
  { id: "fridgeHandle", src: fridgeHandle },
  { id: "button", src: button }
];

export default function ProjectsFun() {
  const { widths, heights } = useImageDimensions(images);
  const { addItem, removeItem, checkMatch, puzzleStates, updatePuzzleState } = useInventory();
  const { batterUp, batterPlaced, baked, canOpenerUp, sardinesUp, waterCanUp } = puzzleStates;
  const [doorOpen, setDoor] = useState(false);
  const [drawerOpen, setDrawer] = useState(false);
  const [ovenOpen, setOven] = useState(false);
  const SF = .042;

  const toggleDoor = () => {
    setDoor(!doorOpen);
  }

  //TODO: fix logic/clean 
  const handleBatter = () => {
    if (!batterUp) updatePuzzleState('batterUp', true);
    if (batterPlaced) updatePuzzleState('batterPlaced', false);
    if (baked) addItem(bread);
    else addItem(batter);
  }

  const handleCanOpener = () => {
    updatePuzzleState('canOpenerUp', true);
    addItem(canOpener);
  }

  const toggleDrawer = () => {
    setDrawer(!drawerOpen);
  }

  const toggleOven = () => {
    if (ovenOpen && checkMatch(batter)) {
      updatePuzzleState('batterPlaced', true);
      removeItem(batter);
    } else setOven(!ovenOpen);
  }

  const handleSardines = () => {
    updatePuzzleState('sardinesUp', true);
    addItem(sardines);
  }

  const handleWaterCan = () => {
    updatePuzzleState('waterCanUp', true);
    addItem(waterCan);
  }

  //TODO: place watercan under sink

  const handleOvenButton = () => {
    if (batterPlaced && !ovenOpen) {
      updatePuzzleState('baked', true);
    }
  }

  return (
    <>
      <h1> Personal Projects (not engineering)</h1>
      <p> kitchen </p>
      <div className="room-container" style={{backgroundImage: `url(${kitchen})`}}>
        <Link to="/pic-garden" className="nav-button">&lt;</Link>
        <br />
        <Link to="/about" className="interactive">Leave?</Link>
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
        {doorOpen && !batterUp && <button className="interactive" onClick={handleBatter}
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
        <button className="interactive" onClick={toggleOven}
          style={{
            width: `${ovenOpen ? widths["openDrawer"] * SF : widths["drawer"] * SF}%`,
            aspectRatio: `${ovenOpen ? widths["openDrawer"] / heights["openDrawer"] : widths["drawer"] / heights["drawer"]}`,
            left: "61%",
            top: "66%",
            backgroundImage: `url(${ovenOpen? openDrawer: drawer})`
          }}
        />
        <button className="interactive" onClick={handleOvenButton} 
          style={{
            width: `${widths["button"] * SF *1.3}%`,
            aspectRatio: widths["button"] / heights["button"],
            left: "55%",
            top: "53%",
            backgroundImage: `url(${button})`
          }}>
        </button>
        {ovenOpen && batterPlaced && <button className="interactive" onClick={handleBatter}
          style={{
            width: `${baked? widths["bread"] * SF : widths["batter"] * SF}%`,
            aspectRatio: `${baked ? widths["bread"] / heights["bread"] : widths["batter"] / heights["batter"]}`,
            left: "65%",
            top: "70%",
            backgroundImage: `url(${baked? bread : batter})`
          }}
        />}
        <Inventory/>
      </div>
    </>
  )
}