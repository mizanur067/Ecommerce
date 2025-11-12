import React, { useState } from 'react'
import '../CSS/UserPayment.css'
import { useRecoilState } from 'recoil'
import SelectedAddressAtom from '../Recoils/SelectedAddressAtom'
import DetailsProductAtom from '../Recoils/DetailsProductAtom'
import { useNavigate, useLocation } from 'react-router-dom'
const UserPaymentCard = () => {
    const [selectedAddress, setSelectedAddress] = useRecoilState(SelectedAddressAtom);
    const [detailsProduct, setDetailsProduct] = useRecoilState(DetailsProductAtom);
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState('cod');
    const channels = [
        { id: 'card', title: 'Credit / Debit Card', subtitle: 'Visa, MasterCard, Rupee' },
        { id: 'upi', title: 'UPI', subtitle: 'Google Pay, PhonePe, Paytm' },
        { id: 'netbanking', title: 'Net Banking', subtitle: 'All major banks' },
        { id: 'wallet', title: 'Wallets', subtitle: 'Paytm, Amazon' },
        { id: 'cod', title: 'Cash on Delivery', subtitle: 'Pay at delivery' }
    ];
    // Card form state
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');


    // UPI state
    const upiApps = ['Google Pay', 'PhonePe', 'Paytm', 'Other'];
    const [selectedUpiApp, setSelectedUpiApp] = useState(upiApps[0]);
    const [upiId, setUpiId] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [showMessage ,setShowMessage] = useState('')

    const validateCard = () => {
        const num = cardNumber.replace(/\s+/g, '');
        if (!/^\d{16}$/.test(num)) {
               setShowMessage(" Card number must be 16 digits.")
                setShowAlert(true)
                return;
        }

        if (!cardName.trim()){
            setShowMessage(" Cardholder name required.")
                setShowAlert(true)
                return;
        } 
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)){
            setShowMessage(" Expiry must be MM/YY.")
                setShowAlert(true)
                return;} 
        if (!/^\d{3,4}$/.test(cardCvv)){
            setShowMessage(" CVV must be 3 or 4 digit")
                setShowAlert(true)
                return;
        } 
        return null;
    };


    const validateUpi = () => {
        if (selectedUpiApp === 'Other') {
            if (!upiId.includes('@')) {
                setShowMessage(" Enter valid UPI ID (example: name@bank).")
                setShowAlert(true)
                return;
                
            }
        }
        return null;
    };


    const handlePay = () => {
        if (selected === 'card') {
            const err = validateCard();
            if (err) return alert(err);
            // Replace with real payment call
            setShowMessage(" This Service is not available Now .Please Select Cash On Delivery")
            setShowAlert(true)
            return;
            //return alert(`Paying with card ****${cardNumber.replace(/\s+/g, '').slice(-4)} for ${cardName}`);
        }


        else if (selected === 'upi') {
            const err = validateUpi();
            if (err) return alert(err);
            // Demo: if app selected, assume deep-link handled elsewhere
            setShowMessage(" This Service is not available Now .Please Select Cash On Delivery")
            setShowAlert(true)
            return;
            //return alert(`Paying via ${selectedUpiApp}${selectedUpiApp === 'Other' ? ` using ${upiId}` : ''}`);
        }
        else if (selected === 'netbanking' || selected ==='wallet'){
            setShowMessage(" This Service is not available Now .Please Select Cash On Delivery")
            setShowAlert(true)
            return;
        }
        


        // Generic flows for other methods
       // alert(`Proceeding with ${selected}`);
    };


    const formatCardNumber = (val) => {
        // keep only digits and insert spaces every 4
        return val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    };

    return (
        <div>
            {showAlert && (
            <div className=" modal-overlay">
                <div className="modal">
                    <span className="alert-text"><strong>{showMessage}</strong></span>
                    <button className="alert-close" onClick={() => setShowAlert(false)}>✕</button> </div>

            </div>
        )}
            <div className="paymentContainer_UserPayment">
                <h2 className="paymentHeader_UserPayment">Select Payment Method</h2>

                <div className="paymentGrid_UserPayment">
                    <div className="paymentOptions_UserPayment">
                        {channels.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className={`paymentOption_UserPayment ${selected === item.id ? 'active_UserPayment' : ''}`}
                                onClick={() => setSelected(item.id)}
                            >
                                <div className="optionText_UserPayment">
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="paymentDetails_UserPayment">
                        <h3 className="detailsTitle_UserPayment">{channels.find((c) => c.id === selected)?.title}</h3>
                        <p className="detailsSubtitle_UserPayment">{channels.find((c) => c.id === selected)?.subtitle}</p>

                        {/* Card form */}
                        {selected === 'card' && (
                            <form
                                className="cardForm_UserPayment"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handlePay();
                                }}
                            >
                                <label className="fieldLabel_UserPayment">
                                    Card number
                                    <input
                                        inputMode="numeric"
                                        autoComplete="cc-number"
                                        className="inputField_UserPayment"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                    />
                                </label>

                                <label className="fieldLabel_UserPayment">
                                    Cardholder name
                                    <input
                                        className="inputField_UserPayment"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        placeholder="Name on card"
                                    />
                                </label>

                                <div className="row_UserPayment">
                                    <label className="fieldLabel_UserPayment small_UserPayment">
                                        Expiry (MM/YY)
                                        <input
                                            className="inputField_UserPayment"
                                            value={cardExpiry}
                                            onChange={(e) => setCardExpiry(e.target.value)}
                                            placeholder="MM/YY"
                                            maxLength={5}
                                        />
                                    </label>

                                    <label className="fieldLabel_UserPayment small_UserPayment">
                                        CVV
                                        <input
                                            inputMode="numeric"
                                            className="inputField_UserPayment"
                                            value={cardCvv}
                                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                            placeholder="123"
                                            maxLength={4}
                                        />
                                    </label>
                                </div>

                                <div style={{ marginTop: 12 }}>
                                    <button type="submit" className="payButton_UserPayment">Pay</button>
                                </div>
                            </form>
                        )}

                        {/* UPI form */}
                        {selected === 'upi' && (
                            <div className="upiForm_UserPayment">
                                <div className="fieldLabel_UserPayment">Choose UPI app</div>
                                <div className="upiApps_UserPayment">
                                    {upiApps.map((app) => (
                                        <label key={app} className="upiOption_UserPayment">
                                            <input
                                                type="radio"
                                                name="upiApp"
                                                checked={selectedUpiApp === app}
                                                onChange={() => setSelectedUpiApp(app)}
                                            />
                                            <span>{app}</span>
                                        </label>
                                    ))}
                                </div>

                                {selectedUpiApp === 'Other' && (
                                    <label className="fieldLabel_UserPayment" style={{ marginTop: 10 }}>
                                        Enter UPI ID
                                        <input
                                            className="inputField_UserPayment"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            placeholder="name@bank or mobile@upi"
                                            autoComplete="off"
                                        />
                                    </label>
                                )}

                                <div style={{ marginTop: 12 }}>
                                    <button
                                        type="button"
                                        className="payButton_UserPayment"
                                        onClick={() => {
                                            const err = validateUpi();
                                            if (err) return alert(err);
                                            handlePay();
                                        }}
                                    >
                                        Pay with UPI
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Placeholder for other channels */}
                        {selected !== 'card' && selected !== 'upi' && (
                            <div style={{ marginTop: 10 }}>
                                <p style={{ margin: 0 }}>Quick checkout using <strong>{channels.find((c) => c.id === selected)?.title}</strong>.</p>
                                <div style={{ marginTop: 12 }}>
                                    <button className="payButton_UserPayment" onClick={handlePay}>Proceed</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    )
}




export default UserPaymentCard