import { IconContext } from "react-icons";
import { BiLoaderAlt } from "react-icons/bi";
import PropTypes from "prop-types";

const useAuthPending = () => {
  const AuthPendingIcon = ({ className }) => (
    <IconContext.Provider value={{ className }}>
      <BiLoaderAlt />
    </IconContext.Provider>
  );

  AuthPendingIcon.propTypes = {
    className: PropTypes.string.isRequired,
  };

  return { IconContext, AuthPendingIcon };
};

export default useAuthPending;
