import Head from 'next/head';
import { useState, useContext } from 'react';
import { getData } from '../../utils/fetchData';
import { DataContext } from '../../store/GlobalState';
import { addToCart } from '../../store/Action';

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0); //click images

  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const isActive = (index) => {
    if (tab === index) return ' active';
    return 'isActive';
  };

  return (
    <div className="row detail_page">
      <Head>
        <title>Detail Product</title>
      </Head>

      <div className="col-md-6">
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          className="d-block img-thumbnail rounded mt-4 w-100"
          style={{ height: '350px' }}
        />

        <div className="row mx-0" style={{ cursor: 'pointer' }}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className={` img-thumbnail rounded ${isActive(index)}`}
              style={{ height: '80px', width: '25%' }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>
      <div className="col-md-6 mt-3">
        <h2 className="text-uppercase"> {product.title}</h2>
        <h5 className="text-muted">${product.price}</h5>

        <div className="row mx-0 d-flex justify-content-between">
          {product.inStock > 0 ? (
            <h6 className="text-second">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-muted">Out Stock</h6>
          )}
          <h6 className="text-muted">Sold: {product.sold}</h6>
        </div>
        <div className="my-2">{product.description}</div>
        <div className="my-2">{product.content}</div>

        <button
          type="button"
          className="btn btn btn-danger d-block my-3 px-5 "
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);

  //server side rendering

  return {
    props: { product: res.product }, // will be passed to the page component as props
  };
}

export default DetailProduct;
