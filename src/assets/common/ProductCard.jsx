import './ProductCard.css'; // Custom styles for the card
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import image from '../modules/images/default.jpg'

const ProductCard = ({ imageSrc, title, price, soldOut, onAddToCart, discountPercent }) => {

  // Function to extract the numeric value from the price string
  // This function removes the "Rs." prefix and any non-numeric characters
  const extractNumber = (str) => {
         const withoutRs = str.replace(/Rs\.?\s*/i, '');
        const cleanedString = withoutRs.replace(/[^0-9.]/g, '');
        const amount = parseFloat(cleanedString);
        return isNaN(amount) ? null : amount;
    };

  // Extract the numeric value from the price string
  // and convert it to a number
  const priceNum = extractNumber(price.toString());
  const discountNum = Number(discountPercent) || 0;
  const validDiscount = isNaN(discountNum) ? 0 : discountNum;
  const discountPrice = priceNum - (priceNum * validDiscount / 100);


  return (
    <div className="card-wrapper product-card-wrapper underline-links-hover">
      <div className="card card--media color-background-1 gradient">
        <div className="card__inner ratio">
          <div className="card__media">
            <div className="media media--transparent media--hover-effect">
              {discountPercent > 0 && (
                  <div className="card__badge">
                    <span className="badge badge--discount">{discountPercent}% OFF</span>
                  </div>
                )}
              <img
                src={imageSrc}
                alt={title}
                className="motion-reduce"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = image;
                }}
              />
            </div>
          </div>
          <div className="card__content">
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

            <div className="price">
                  <div className="price__container">
                      {discountPercent > 0 ? (
                        <>
                          <span className="price--original"> &#8377; {priceNum}</span>
                          <span className="price--discount">
                              &#8377; {discountPrice} ({validDiscount}% OFF)
                          </span>
                        </>
                      ) : (
                        <span className="price-item price-item--regular">{discountPrice.toFixed(2)}</span>
                      )}
                  </div>
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
