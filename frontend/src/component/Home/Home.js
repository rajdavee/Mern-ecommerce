import React, { Fragment, useEffect } from "react";
import { CgMouse, CgArrowRight, CgMenu } from "react-icons/cg";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import "./Home.css";
import Product from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <p>Welcome to my ECOMMERCE Website</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse /> {/* Correct usage of a specific icon */}
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products && products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default Home;




