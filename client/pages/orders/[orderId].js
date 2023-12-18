import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);
    
    if (timeLeft < 0) {
        return <div>Order Expired</div>
    }

    return <div>
        Time left to pay: {timeLeft} seconds
        <StripeCheckout 
            token={() => console.log(token)}
            // stripe Publishable key
            stripeKey="pk_test_51OM3ViFtRHBbGRpBx2fdR4kJ2Xvi8yt7wJ91citBPGVUjiXi1Z6WW74EckNo8GB5xFHjknGeSbWMfJ9WcRVR0bbH00rjAwDEC5"
            amount={order.ticket.price * 100}
            email={currentUser.email}
        />
    </div>;
};

OrderShow.getInitialProps = async (context, client) => {
    const {orderId} = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
};

export default OrderShow;