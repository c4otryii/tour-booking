import React from 'react';
import './payment.css'; // Import CSS file for payment page styling
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import payment from '../../assets/images/payment.svg';

const Payment = ({ totalAmount }) => {
        const navigate = useNavigate();

        // Function to handle payment
        const handlePayment = async () => {
                // Code to process payment
                // Redirect to thank you page after successful payment
                navigate("/thank-you");
        }

        return (
                <div className='payment-container'>
                        <div className="payment-content">
                                <h3>Total Amount: ${totalAmount}</h3>
                                <img src={payment} alt="Payment GIF" className="payment-gif" />
                                <div className="payment-form">
                                        <h5>Payment Information</h5>
                                        <Form className='payment-info-form' onSubmit={handlePayment}>
                                                <FormGroup>
                                                        <input
                                                                type="text"
                                                                placeholder='Card Number'
                                                                id='cardNumber'
                                                                required
                                                        />
                                                </FormGroup>
                                                <FormGroup>
                                                        <input
                                                                type="text"
                                                                placeholder='Cardholder Name'
                                                                id='cardHolderName'
                                                                required
                                                        />
                                                </FormGroup>
                                                <FormGroup className='d-flex align-items-center gap-3'>
                                                        <input
                                                                type="text"
                                                                placeholder='Expiration Date'
                                                                id='expirationDate'
                                                                required
                                                        />
                                                        <input
                                                                type="text"
                                                                placeholder='CVV'
                                                                id='cvv'
                                                                required
                                                        />
                                                </FormGroup>
                                        </Form>
                                </div>

                                <div className="payment-bottom">
                                        <ListGroup>
                                                <ListGroupItem className='border-0 px-0 total'>
                                                        <h5>Total Amount</h5>
                                                        <span>${totalAmount}</span>
                                                </ListGroupItem>
                                        </ListGroup>

                                        <Button className='btn primary-btn w-100 mt-4' onClick={handlePayment}>Pay Now</Button>
                                </div>
                        </div>
                </div>
        )
}

export default Payment;
