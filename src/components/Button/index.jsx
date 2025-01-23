import PropTypes from 'prop-types';
import style from './Button.module.css'

export default function Button({children, onClick}) {
    return (
        <button
            className={style.btn}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
}