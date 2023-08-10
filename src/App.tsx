import "./App.css";
import Battle from "./components/Battle/battle.tsx";
import CharacterCustomize from "./components/CharacterCustomize/characterCustomize.tsx";
import CharacterInfo from "./components/CharacterInfo/characterInfo.tsx";
import Map from "./components/Map/map.tsx";

function App() {
  return (
    <div id="main-window" style={{display: "flex", height: "100%"}}>
      <div id="left-panel" style={{height: "100%", width: "400px", display: "flex", flexDirection: "column"}}>
        <CharacterInfo/>
        <Battle/>
        <Map/>
      </div>
      <div id="right-panel" style={{height: "100%", flex: "1"}}>
        <CharacterCustomize/>
      </div>
    </div>
  );
}

export default App;
