import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, RefreshCw, Truck, FileText } from 'lucide-react';
import './PolicyPage.css';

const policies = {
  shipping: {
    title: 'Shipping Policy',
    icon: <Truck size={32} color="#C5A059" />,
    lastUpdated: '12th April 2026',
    content: (
      <>
        <p>At <strong>SHINE & SPARKLE</strong>, we strive to deliver your luxury Indian jewelry safely and swiftly.</p>
        <h3>1. Processing Time</h3>
        <p>All orders are processed within 1-2 business days. Orders are not processed or shipped on weekends or holidays.</p>
        <h3>2. Shipping Rates & Delivery Estimates</h3>
        <p>We offer <strong>Free Standard Shipping</strong> across India for all orders. Expect delivery within 3-5 business days. Express delivery (1-2 business days) is available at checkout for an additional nominal charge.</p>
        <h3>3. Shipment Confirmation & Order Tracking</h3>
        <p>Presently, order tracking functionality has been disabled as we transition to a new robust logistics partner. Please contact us directly at vintagediva1999@gmail.com with your order ID for live updates.</p>
        <h3>4. Damages</h3>
        <p>SHINE & SPARKLE is strictly liable for any products damaged or lost during shipping. If you received your order damaged, please contact us immediately to file a claim and receive a replacement.</p>
      </>
    )
  },
  returns: {
    title: 'Returns & Exchanges',
    icon: <RefreshCw size={32} color="#C5A059" />,
    lastUpdated: '12th April 2026',
    content: (
      <>
        <p>Your satisfaction is our ultimate goal. If you are not entirely satisfied with your purchase, we're here to help.</p>
        <h3>1. Returns</h3>
        <p>You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused, in the same condition that you received it, and must be in the original packaging.</p>
        <h3>2. Exchanges</h3>
        <p>We only replace items if they are defective, damaged, or tarnished upon arrival. If you need to exchange an item, please send us an email at vintagediva1999@gmail.com with photograph evidence.</p>
        <h3>3. Refunds</h3>
        <p>Once we receive your item, we will inspect it and notify you. If your return is approved, we will initiate a refund to your original method of payment (or provide store credit for Cash on Delivery purchases). You will receive the credit within 5-7 days.</p>
        <h3>4. Non-Refundable Items</h3>
        <p>Custom-made pieces, personalized jewelry, and items purchased during clearance sales cannot be returned or exchanged.</p>
      </>
    )
  },
  terms: {
    title: 'Terms of Use',
    icon: <FileText size={32} color="#C5A059" />,
    lastUpdated: '12th April 2026',
    content: (
      <>
        <p>Welcome to SHINE & SPARKLE. These terms and conditions outline the rules and regulations for the use of our Website.</p>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use SHINE & SPARKLE if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h3>2. Intellectual Property Rights</h3>
        <p>Unless otherwise stated, SHINE & SPARKLE and/or its licensors own the intellectual property rights for all material on SHINE & SPARKLE. All intellectual property rights are reserved.</p>
        <h3>3. User Comments</h3>
        <p>Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas of the website (Testimonials). We do not filter, edit, publish or review Comments prior to their presence on the website.</p>
      </>
    )
  },
  privacy: {
    title: 'Privacy Policy',
    icon: <ShieldCheck size={32} color="#C5A059" />,
    lastUpdated: '12th April 2026',
    content: (
      <>
        <p>At SHINE & SPARKLE, accessible from our live domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.</p>
        <h3>1. Information We Collect</h3>
        <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products, or when you participate in activities on the website.</p>
        <h3>2. How We Use Your Information</h3>
        <p>We use the information we collect in various ways, including to provide, operate, and maintain our website; improve, personalize, and expand our website; understand and analyze how you use our website; process your transactions and send you related information.</p>
        <h3>3. Security of Your Information</h3>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
      </>
    )
  }
};

const PolicyPage = () => {
  const { type } = useParams();
  const policy = policies[type?.toLowerCase()];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  if (!policy) {
    return (
      <div className="policy-page not-found container">
        <h2>Policy Not Found</h2>
        <p>The document you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary" style={{marginTop: '2rem'}}>RETURN HOME</Link>
      </div>
    );
  }

  return (
    <div className="policy-page">
      <div className="policy-header fade-in-up">
        {policy.icon}
        <h1>{policy.title}</h1>
        <p className="policy-updated">Last Updated: {policy.lastUpdated}</p>
      </div>
      <div className="container policy-body fade-in-up" style={{animationDelay: '0.2s'}}>
        <div className="policy-content">
          {policy.content}
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
