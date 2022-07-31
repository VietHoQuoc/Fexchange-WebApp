import React from 'react';
import { Card } from 'react-bootstrap';

const Order = (props) => {
    const { order } = props;
    return (
        <Card className="w-100 mb-3">
            <Card.Body>
                <p>Feedback: {order.feedback} </p>
            </Card.Body>
        </Card>
    );
}

export default Order;