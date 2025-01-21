import PropTypes from 'prop-types';

export default function StarList({average}) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= average)
        stars.push(<StarIcon key={i} color={"#009C9D"}/>);
      else
        stars.push(<StarIcon key={i} />);
    }
    return (stars);
  }
  
  function StarIcon({width = 16, height = 16, color = "#DEDEDE"}) {
      return (
          <svg width={width} height={height} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
              <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
          </svg>
      );
  }
  
  StarIcon.propTypes = {
      width: PropTypes.number,
      height: PropTypes.number,
      color: PropTypes.string,
  };