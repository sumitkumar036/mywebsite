import './ProductCard.css'; // Custom styles for the card
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ imageSrc, title, price, soldOut, onAddToCart }) => {
  return (
    <div className="card-wrapper product-card-wrapper underline-links-hover">
      <div className="card card--media color-background-1 gradient" style={{ '--ratio-percent': '133.333%' }}>
        <div className="card__inner ratio" style={{ '--ratio-percent': '133.333%' }}>
          <div className="card__media">
            <div className="media media--transparent media--hover-effect">
              <img
                src={imageSrc}
                alt={title}
                className="motion-reduce"
                width="533"
                height="4032"
              />
            </div>
          </div>
          <div className="card__content">
            <div className="card__information">
              <h3 className="card__heading">
                <a href={`/products/${title}`} className="full-unstyled-link">
                  {title}
                </a>
              </h3>
            </div>
            {soldOut && (
              <div className="card__badge bottom left">
                <span className="badge badge--bottom-left color-inverse">Sold out</span>
              </div>
            )}
          </div>
        </div>

        <div className="card__content d-flex flex-column">
          <div className="card__information">
            <h3 className="card__heading h5">
              <a href={`/products/${title}`} className="full-unstyled-link">
                {title}
              </a>
            </h3>
            <div className="price price--sold-out">
              <span className="price__container">
                <span className="price-item price-item--regular">{price}</span>
              </span>
            </div>
          </div>

          {soldOut && (
            <div className="card__badge bottom left">
              <span className="badge badge--bottom-left color-inverse">Sold out</span>
            </div>
          )}

          {/* Add to Cart Button */}
          {!soldOut && (
            <button
               className="btn btn-primary"
                onClick={() => onAddToCart(title, price)} // Handle add to cart
            >
                <FontAwesomeIcon icon={faShoppingCart} />
                Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
