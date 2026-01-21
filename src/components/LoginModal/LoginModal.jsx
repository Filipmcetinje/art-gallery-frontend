import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { authorize } from "../../utils/auth";

function LoginModal({ isOpen, onClose, onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    authorize(email, password)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);

        setEmail("");
        setPassword("");

        onAuthSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} title="Log in">
      <form className="modal__form" onSubmit={handleSubmit}>
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
            placeholder="Enter password"
          />
        </label>

        <button className="modal__submit" type="submit">
          Log in
        </button>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
