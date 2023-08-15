import React, { useState } from "react";
import "./Components/Pages/css/Header.css";
import "./Components/Pages/css/HomeScreen.css";
import Logo from "./Components/Pages/media/logo.png"

//Screen Imports
import HomeScreen from "./Components/Pages/HomeScreen";
import ProfileScreen from "./Components/Pages/ProfileScreen";
import EditorialScreen from "./Components/Pages/EditorialScreen";
import AboutScreen from "./Components/Pages/AboutScreen";
import ArchiveScreen from "./Components/Pages/ArchiveScreen";
import ContactScreen from "./Components/Pages/ContactScreen";
import SearchScreen from "./Components/Pages/SearchScreen";
import PencilScreen from "./Components/Pages/PencilScreen";

function App() {
  //const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("Home");
  const [currentItem, setCurrentItem] = useState(null);

  const handleButtonClick = (buttonName, item = null) => {
    //setIsMenuBarOpen(false);
    setCurrentScreen(buttonName);
    setCurrentItem(item);
  };

  const handleCardClick = (item) => {
    setCurrentScreen("search");
    setCurrentItem(item);
  };

  return (
    <div className="AppScreen">
      <header>
        <ul className="menu">
        <li title="icon">
            <button
              className="header-btn icon"
              onClick={() => handleButtonClick("Home")}
            >
              menu
            </button>
          </li>
          <li title="home">
            <button
              className="header-btn home"
              onClick={() => handleButtonClick("Home")}
            >
              menu
            </button>
          </li>
          <li title="search">
            <button
              className="header-btn search"
              onClick={() => handleButtonClick("search")}
            >
              search
            </button>
          </li>
          <li title="pencil">
            <button
              className="header-btn pencil"
              onClick={() => handleButtonClick("pencil")}
            >
              pencil
            </button>
          </li>
          <li title="about">
            <button
              className="header-btn about"
              onClick={() => handleButtonClick("about")}
            >
              about
            </button>
          </li>
          <li title="archive">
            <button
              className="header-btn archive"
              onClick={() => handleButtonClick("archive")}
            >
              archive
            </button>
          </li>
          <li title="contact">
            <button
              className="header-btn contact"
              onClick={() => handleButtonClick("contact")}
            >
              contact
            </button>
          </li>
        </ul>
      </header>
      <div className="content">
        {currentScreen === "search" && (
          <SearchScreen currentItem={currentItem} />
        )}
        {currentScreen === "pencil" && <PencilScreen />}
        {currentScreen === "about" && <AboutScreen />}
        {currentScreen === "archive" && <ArchiveScreen />}
        {currentScreen === "contact" && <ContactScreen />}
        {currentScreen === "Home" && (
          <HomeScreen handleCardClick={handleCardClick} />
        )}
        {currentScreen === "profile" && <ProfileScreen />}
        {currentScreen === "editorial" && <EditorialScreen />}
      </div>
    </div>
  );
}

export default App;
