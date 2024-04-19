import React from "react";
import "./checkout.css";
import { Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import payment from "../../assets/images/payment.svg";

const Checkout = ({ totalAmount }) => {
  const navigate = useNavigate();
  
  const handlePayment = async () => {
    
    navigate("/thank-you");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-gif">
          <img src={payment} alt="Payment GIF" />
        </div>
        <div className="checkout-form">
          <h5>Checkout Information</h5>
          <Form className="checkout-info-form" onSubmit={handlePayment}>
            <FormGroup>
              <input
                type="text"
                placeholder="Card Number"
                id="cardNumber"
                required
              />
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                placeholder="Cardholder Name"
                id="cardHolderName"
                required
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center gap-3">
              <input
                type="text"
                placeholder="Expiration Date"
                id="expirationDate"
                required
              />
              <input type="text" placeholder="CVV" id="cvv" required />
            </FormGroup>
          </Form>
          <h5>Total Amount</h5>
          <span>${totalAmount}</span>
          <Button
            className="btn primary-btn w-100 mt-4"
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
