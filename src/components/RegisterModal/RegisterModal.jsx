import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { register, authorize } from "../../utils/auth";

function RegisterModal({ isOpen, onClose, onAuthSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    register(name, email, password)
      .then(() => authorize(email, password))
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        setName("");
        setEmail("");
        setPassword("");
        onAuthSuccess();
      })
      .catch(console.log);
  };

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} title="Sign up">
      <form className="modal__form" onSubmit={handleSubmit}>
        <label className="modal__field">
          Username
          <input
            className="modal__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
          />
        </label>

        <label className="modal__field">
          Email
          <input
            className="modal__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </label>

        <label className="modal__field">
          Password
          <input
            className="modal__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
          />
        </label>

        <button className="modal__submit" type="submit">
          Sign up
        </button>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
