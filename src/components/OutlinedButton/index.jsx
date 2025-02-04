import PropTypes from 'prop-types';
import style from './OutlinedButton.module.css'

export default function OutlinedButton({children, onClick}) {
    return (
        <button
            className={style.btn}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

OutlinedButton.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
}