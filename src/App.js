import "./styles.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { chocolatesData } from "./chocolates"; // A local JSON file that contains the data of the chocolates

function Chocolate({ name, image, price, onIncChange, onDecChange, quantity }) {
  const increment = () => {
    onIncChange(name);
  };

  const decrement = () => {
    onDecChange(name);
  };

  return (
    <div className="chocolate">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <div className="quantity">
        <Button variant="outline-dark" onClick={decrement}>
          -
        </Button>
        <span>{quantity}</span>
        <Button variant="outline-dark" onClick={increment}>
          +
        </Button>
      </div>
    </div>
  );
}

// A component that renders a list of chocolates and allows customers to build a custom pack
function CustomPack() {
  // A state that stores the total number of items in the custom pack
  const [totalItems, setTotalItems] = useState(0);

  // A state that stores the total price of the custom pack
  const [totalPrice, setTotalPrice] = useState(0);

  const [chocolates, setChocolates] = useState(null);

  // A useEffect hook that sets the data of the chocolates from the local JSON file once the component mounts
  useEffect(() => {
    setChocolates(chocolatesData);
  }, []);

  const handleIncChange = (name) => {
    for (let i = 0; i < chocolates.length; i++) {
      if (chocolates[i].name === name) {
        if (totalItems < 8) {
          chocolates[i].quantity = chocolates[i].quantity + 1;
          setTotalItems(totalItems + 1);
          setTotalPrice(totalPrice + chocolates[i].price);
        }
      }
    }
  };

  const handleDecChange = (name) => {
    for (let i = 0; i < chocolates.length; i++) {
      if (chocolates[i].name === name) {
        if (totalItems > 0 && chocolates[i].quantity > 0) {
          chocolates[i].quantity = chocolates[i].quantity - 1;
          setTotalItems(totalItems - 1);
          setTotalPrice(totalPrice - chocolates[i].price);
        }
      }
    }
  };

  return (
    <Container className="custom-pack">
      <h1>Build Your Custom Pack</h1>
      <p>Select a combination of 8 chocolates for your custom pack.</p>
      <Row>
        {chocolatesData.map((chocolate) => (
          <Col md={3} key={chocolate.name}>
            <Chocolate
              name={chocolate.name}
              image={chocolate.image}
              price={chocolate.price}
              onIncChange={handleIncChange}
              onDecChange={handleDecChange}
              quantity={chocolate.quantity}
            />
          </Col>
        ))}
      </Row>
      <div className="summary">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        {totalItems === 8 ? (
          <Button variant="success">Proceed to Checkout</Button>
        ) : (
          <p>
            You need to {totalItems > 8 ? "remove" : "add"}{" "}
            {Math.abs(8 - totalItems)} more items to your custom pack.
          </p>
        )}
      </div>
    </Container>
  );
}

export default CustomPack;
