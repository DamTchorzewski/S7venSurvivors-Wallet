import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';

import s from './RegistrationForm.module.scss';

const PasswordStrenghtMeter = ({ password }) => {
    const testResult = zxcvbn(password);
    const num = (testResult.score * 100) / 4;

    const funcProgressColor = () => {
        switch (testResult.score) {
        case 0:
            return '#FF6596';
        case 1:
            return '#FF6596';
        case 2:
            return '#FF6596';
        case 3:
            return '#24CCA7';
        case 4:
            return '#24CCA7';
        default:
            return 'none';
        }
    };

    const createPasswordLabel = () => {
        switch (testResult.score) {
        case 0:
            return '';
        case 1:
            return 'Weak';
        case 2:
            return 'Fear';
        case 3:
            return 'Good';
        case 4:
            return 'Strong';
        default:
            return '';
        }
    };

    const changeStyleProgress = () => ({
        width: '100%',
        height: '4px',
        marginTop: '-10px',
    });

    const changePasswordColor = () => ({
        width: `${num}%`,
        height: '4px',

        background: funcProgressColor(),
        boxShadow: '0px 1px 8px rgba(36, 204, 167, 0.5)',
        borderRadius: '4px',
    });

    return (
        <>
            <div className={s.progress} style={changeStyleProgress()}>
                <div className="progress-bar" style={changePasswordColor()}></div>
            </div>

            <p className={s.Text} style={{ color: funcProgressColor() }}>
                {createPasswordLabel()}
            </p>
        </>
    );
};

export default PasswordStrenghtMeter;

PasswordStrenghtMeter.propTypes = {
    password: PropTypes.string.isRequired,
};
