import { useEffect, useState } from "react";
import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import CollectionPage from "../CollectionPage/CollectionPage.jsx";

import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";

import SavedPage from "../SavedPage/SavedPage.jsx";
import ProfilePage from "../ProfilePage/ProfilePage.jsx";

import { getSavedArtworks, saveArtwork, deleteArtwork } from "../../utils/api";

import { Routes, Route } from "react-router-dom";

import ImagePreviewModal from "../ImagePreviewModal/ImagePreviewModal.jsx";

import { checkToken } from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("jwt"));
  });
  const [currentUser, setCurrentUser] = useState(null);

  const [saved, setSaved] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleCardClick = (artwork) => setSelectedArtwork(artwork);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    getSavedArtworks()
      .then((items) => setSaved(items))
      .catch(console.log);
  }, []);

  const openLoginModal = () => setActiveModal("login");
  const openRegisterModal = () => setActiveModal("register");
  const closeModal = () => setActiveModal(null);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    closeModal();
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    closeModal();
  };

  const handleSaveArtwork = (artwork) => {
    saveArtwork(artwork)
      .then((savedItem) => {
        setSaved((prev) => [savedItem, ...prev]);
      })
      .catch(console.log);
  };

  const handleRemoveSaved = (savedId) => {
    deleteArtwork(savedId)
      .then(() => {
        setSaved((prev) => prev.filter((item) => item._id !== savedId));
      })
      .catch(console.log);
  };

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={openLoginModal}
        onRegisterClick={openRegisterModal}
        onLogoutClick={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/collection"
          element={
            <CollectionPage
              isLoggedIn={isLoggedIn}
              onSaveArtwork={handleSaveArtwork}
              onCardClick={handleCardClick}
            />
          }
        />

        <Route
          path="/saved"
          element={
            <SavedPage
              saved={saved}
              onRemove={handleRemoveSaved}
              onCardClick={handleCardClick}
            />
          }
        />

        <Route
          path="/profile"
          element={<ProfilePage currentUser={currentUser} />}
        />
      </Routes>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onAuthSuccess={handleAuthSuccess}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onAuthSuccess={handleAuthSuccess}
      />

      <ImagePreviewModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </div>
  );
}

export default App;
