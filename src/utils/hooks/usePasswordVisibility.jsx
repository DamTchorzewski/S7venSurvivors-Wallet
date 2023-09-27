import { useState, useRef } from "react";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const usePasswordVisibility = (initialState = false) => {
  const [passwordVisibility, setPasswordVisibility] = useState(initialState);
  const passwordRef = useRef();

  const PasswordIcon = ({ className }) => (
    <IconContext.Provider value={{ className }}>
      {passwordVisibility ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
    </IconContext.Provider>
  );

  PasswordIcon.propTypes = {
    className: PropTypes.string.isRequired,
  };

  const togglePasswordVisibility = () => {
    const passwordInput = passwordRef.current;
    const type = passwordInput.getAttribute("type");

    switch (type) {
      case "password":
        passwordInput.setAttribute("type", "text");
        setPasswordVisibility(true);
        break;
      case "text":
        passwordInput.setAttribute("type", "password");
        setPasswordVisibility(false);
        break;
      default:
        toast.error("Oops, something went wrong ⚠");
    }
  };

  return {
    PasswordIcon,
    passwordRef,
    togglePasswordVisibility,
  };
};

export default usePasswordVisibility;
