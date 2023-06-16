
import PropTypes from 'prop-types';
import css from './Button.module.css';



export function LoadButton({onLoadMore}) {
  return (
    <>
      <button className={css.Button} onClick={onLoadMore} type="button">Load more</button>
    </>
  );
}


LoadButton.propType = {
  onLoadMore: PropTypes.func.isRequired,
}