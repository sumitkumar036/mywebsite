import { useState, useEffect } from 'react';
import { Button, Row, Col, Container, Image } from "react-bootstrap";
import './ProductDescription.css';
import LoadingScreen from '../../loadingScreen/LoadingScreen';
import config from '../../../script/config';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const ProductDescription = () => {

  const [product, setProduct] = useState(() => {
    const saved = localStorage.getItem('description');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

  // Fetch product details from the API
  useEffect(() => {
    if(!id) {return;}

         setLoading(true);
         const fetchDescription = async () => {
             try {
                 const params = new URLSearchParams({ Action: 'productdescription' ,ID:Number(id)});
 
                 const apiEndpoint = `${config.apiEndpoint}?${params.toString()}`;
                 console.log('endPoint', apiEndpoint);
 
                 const response = await fetch(apiEndpoint, {
                     method: 'GET',
                 });
 
                 // Handle the response
                 if (!response.ok) {
                     throw new Error(`Error: ${response.statusText}`);
                 }
 
                const result = await response.json();
                setProduct(result.data);
                localStorage.setItem('description', JSON.stringify(result.data));
                toast.success('Product details fetched successfully!');
             } 
             catch (error) {
                 console.error('Error fetching products:', error);
                 toast.success('Error fetching products... Please try again later.');
             } 
             finally {
                 setLoading(false);
             }
         };
 
         fetchDescription();
     }, [id]);



 if (!product || Object.keys(product).length === 0) {
    return <div className="text-center my-5">No product found.</div>;
}

  return (
    // LOADING SCREEN / WELCOME MESSAGE / PRODUCT CARDS
    <Container className="my-5 position-relative">
    { 
     isLoading && (
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(85, 82, 82, 0.15)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
      <LoadingScreen message="Loading products..." />
    </div>
    
  )}



      <Row className="gy-4">
        {/* Images */}
        <Col md={6}>
          <div className="main-image-wrapper mb-3">
            <Image src={product.imageSrc[0]} fluid rounded className="main-image" />
          </div>
          <Row className="g-2">
            <Col xs={6}>
              <Image src={product.imageSrc[1]} fluid rounded className="sub-image" />
            </Col>
            <Col xs={6}>
              <Image src={product.imageSrc[2]} fluid rounded className="sub-image" />
            </Col>
          </Row>
        </Col>

        {/* Details */}
        <Col md={6}>
          <h1>{product.title}</h1>

          <div className="mb-3">
            <strong>Style</strong>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {product.style.map(style => (
                <Button variant="outline-secondary" size="sm" key={style}>{style}</Button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <strong>Length</strong>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {product.length.map(length => (
                <Button variant="outline-secondary" size="sm" key={length}>{length}</Button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <strong>Size</strong>
            <div className="d-flex flex-wrap gap-2 mt-2">
              { product.size.map(size => (
                <Button variant="outline-secondary" size="sm" key={size}>{size}</Button>
              ))}
            </div>
          </div>

          <h4 className="text-muted d-flex align-items-center gap-2">
            {product.price}
            <small className={product.soldOut ? "text-danger" : "text-success"}>
              {product.soldOut ? "Sold out" : "In stock"}
            </small>
          </h4>

          <div className="d-flex align-items-center gap-3 mb-3">
            <Button variant="outline-secondary" size="sm">-</Button>
            <span>1</span>
            <Button variant="outline-secondary" size="sm">+</Button>
          </div>
            {
              product.soldOut
              ? <Button variant="secondary" disabled className="w-100">Sold out</Button>
              :<Button variant="primary" className="w-100">Add to cart</Button> 
            }

          <hr />

          <div>
            <h5>{product.title}:</h5>
            <ul>
              <li>{product.description[0]}</li>
              <li>{product.description[1]}</li>
              <li>{product.description[2]}</li>
              <li>{product.description[3]}</li>
            </ul>
          </div>

          {/* <div>
            <h5>What's Included:</h5>
            <ul>
            <li>10 hand painted gel nails</li>
            <li>NEW: 1 Additional Backup Nail "just in case"</li>
            <li>Application Kit: mini file, mini buffer, cuticle pusher, nail glue, and an alcohol wipe</li>
            </ul>
            </div>
            
            <p>
            For <strong>custom sizing</strong>, please select "Custom" and leave your measurements at checkout in the instruction box: Thumb, Index, Middle, Ring, Pinky – e.g. 17mm, 15mm, 16mm, 12mm, 10mm. If ordering on mobile, send us an email after you check out with your measurements.
            </p>
            
            <small className="text-muted d-block">
            *Buyer is responsible should an international shipping import or custom fee apply.<br />
            *Colours may differ from actual product depending on the viewing screen.<br />
            *Please double-check <a href="#">your nail size</a> before ordering.<br />
            *There may be slight variations as each set is 100% handmade.
            </small> */}
        </Col>
      </Row>
    </Container>

);
};

export default ProductDescription;
