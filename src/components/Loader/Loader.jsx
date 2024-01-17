import PropTypes from 'prop-types';
import css from './Loader.module.css';

const Loader = ({ isVisible = true }) => {
  return (
    <div className={css.s}>
      <div className={css.Loader} data-text="Wallet">
        <span className={css.Loader__Circle}></span>
        <span className={css.Loader__Circle}></span>
        <span className={css.Loader__Circle}></span>
        <span className={css.Loader__Circle}></span>
      </div>
    </div>
  );
};

Loader.propTypes = {
  isVisible: PropTypes.bool,
};

export default Loader;
