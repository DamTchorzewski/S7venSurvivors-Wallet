import { useEffect } from "react";
import css from "./ModalLogout.module.css";

export const ModalLogout = ({ closeModal, handleLogout }) => {
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [closeModal]);

  return (
    <>
      <div className={css.backdrop} onClick={closeModal}></div>
      <div className={css.logoutModal}>
        <div className={css.logoutContent}>
          <p className={css.logoutInfo}>Are you sure you want to sign out?</p>
          <div lassName={css.modalButtons}>
            <button
              type="button"
              text="LOGOUT"
              lassName={css.buttonLogout}
              onClick={handleLogout}
            >
              {" "}
              Yes{" "}
            </button>
            <button
              onClick={closeModal}
              type="button"
              lassName={css.buttonCancel}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
