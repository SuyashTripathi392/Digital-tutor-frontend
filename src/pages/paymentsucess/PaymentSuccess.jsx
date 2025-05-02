import React, { useEffect } from "react";
import "./paymentsuccess.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const razorpay_payment_id = searchParams.get("razorpay_payment_id");
      const razorpay_order_id = searchParams.get("razorpay_order_id");
      const razorpay_signature = searchParams.get("razorpay_signature");

      if (!razorpay_order_id) return;

      try {
        const { data } = await axios.post(
          `http://localhost:3000/api/verification/${params.id}`,
          {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          },
          { withCredentials: true }
        );
        console.log(data.message);
      } catch (error) {
        console.log("Payment verification failed", error.response.data.message);
      }
    };

    verifyPayment();
  }, [params.id, searchParams]);

  return (
    <div className="payment-success-page">
      {user && (
        <div className="success-message">
          <h2>Payment successful</h2>
          <p>Your course subscription has been activated</p>
          <p>Reference no - {params.id}</p>
          <Link to={`/${user._id}/dashboard`} className="common-btn">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
