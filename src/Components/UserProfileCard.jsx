import React, { use, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import '../CSS/UserProfile.css'
const UserProfileCard = () => {
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const [showSidebar, setShowSidebar] = useState(false);
    const [edit_personal_data, setEditPersonalData] = useState(false);
    const [showUserDetailUpdated, setShowUserDetailUpdated] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [OtpBox, setOtpBox] = useState(false);
    const [showUserEmailUpdated, setShowUserEmailUpdated] = useState(false);
    const [edit_user_phone_number, set_edit_user_phone_number] = useState(false)
    const [show_user_phone_number_updated, set_show_user_phone_number_updated] = useState(false)
    // for personal data update
    const first_name_ref = useRef();
    const last_name_ref = useRef();
    const email_ref = useRef();
    const otp_ref = useRef();
    const phone_number_ref = useRef();

    const [gender_data, setGenderData] = useState('');

    if (!email) {
        navigate("/user-login", { state: { from: location }, replace: true });
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const formData = { email: email };
                console.log(formData);

                const response = await fetch("http://127.0.0.1:8000/Mizanur/get_user_details/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                console.log(data);
                const name = data.user_data.name.trim().split(/\s+/);
                const user_data__ = {
                    first_name: name[0],
                    last_name: name[1],
                    email: data.user_data.email,
                    phone_number: data.user_data.phone_number,
                    Gender: data.user_data.Gender
                };
                setUserData(user_data__);
                // console.log("first",userData)
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [email]); // Add email as dependency

    const handle_name_gender_submit = (e) => {
        e.preventDefault();
        // Logic to submit name
        const first_name = first_name_ref.current?.value.trim() || "";
        const last_name = last_name_ref.current?.value.trim() || "";
        const full_name = `${first_name} ${last_name}`.trim();

        console.log("name", full_name || userData.first_name + " " + userData.last_name);
        const formData = {
            email: email,
            name: full_name || userData.first_name + " " + userData.last_name,
            Gender: gender_data || userData.Gender
        };
        console.log("Form data", formData)
        fetch("http://127.0.0.1:8000/Mizanur/update_user_details/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === "success") {
                    setEditPersonalData(false);
                    setShowUserDetailUpdated(true);
                }


            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const handle_name_Send_otp = (e) => {
        e.preventDefault();
        const formData = { new_email: email_ref.current?.value };
        fetch("http://127.0.0.1:8000/Mizanur/send_email_update_otp/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === "success") {
                    setEditEmail(false);
                    setOtpBox(true);
                }

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    const handle_Update_email = (e) => {
        e.preventDefault();
        const formData = {
            email: email,
            new_email: email_ref.current?.value,
            otp: otp_ref.current?.value
        };
        fetch("http://127.0.0.1:8000/Mizanur/update_user_email/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === "success") {
                    setShowUserEmailUpdated(true);
                    setOtpBox(false);
                    localStorage.removeItem('email');
                }

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const handle_user_phone_number_submit = (e) => {
        e.preventDefault();
        const formData = {
            email: email,
            phone_number: phone_number_ref.current?.value
        };
        fetch("http://127.0.0.1:8000/Mizanur/update_user_phone/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === "success") {
                    set_show_user_phone_number_updated(true);
                    set_edit_user_phone_number(false);
                }

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <>
            {showUserDetailUpdated && (
                <div className=" modal-overlay">
                    <div className="modal">
                        <span className="alert-text"><strong>Your Details Updated successfully!</strong></span>
                        <button className="alert-close" onClick={() => setShowUserDetailUpdated(false)}>✕</button> </div>

                </div>
            )}
            {showUserEmailUpdated && (<div className=" modal-overlay">
                <div className="modal">
                    <span className="alert-text"><strong>Your Email Updated successfully!</strong></span>
                    <button className="alert-close" onClick={() => setShowUserEmailUpdated(false)}>✕</button> </div>

            </div>)}
            {
                show_user_phone_number_updated && <div className=" modal-overlay">
                    <div className="modal">
                        <span className="alert-text"><strong>Your Phone Number Updated successfully!</strong></span>
                        <button className="alert-close" onClick={() => set_show_user_phone_number_updated(false)}>✕</button> </div>

                </div>
            }
            <div className="container_user_profile">

                {/* Header only visible in mobile */}
                <div className="mobile_header_user_profile">
                    <button
                        className="menu_toggle_user_profile"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        ☰
                    </button>
                    <h2>My Account</h2>
                </div>

                {/* Sidebar */}
                <aside
                    className={`sidebar_user_profile ${showSidebar ? "active_user_profile_sidebar" : ""
                        }`}
                >
                    <div className="profile_header_user_profile">
                        <div className="avatar_user_profile">
                            <img src="../../Image/Person-Emoji.png" alt="" />
                        </div>
                        <p className="hello_text_user_profile">Hello</p>
                    </div>

                    <div className="menu_section_user_profile">
                        <h4>MY ORDERS</h4>
                    </div>

                    <div className="menu_section_user_profile">
                        <h4>ACCOUNT SETTINGS</h4>
                        <ul>
                            <li className="active_user_profile">Profile Information</li>
                            <li>Update Password</li>
                            <li>Manage Addresses</li>
                            <li>PAN Card Information</li>
                        </ul>
                    </div>

                    <div className="menu_section_user_profile">
                        <h4>PAYMENTS</h4>
                        <ul>
                            <li>
                                Gift Cards <span className="amount_user_profile">₹0</span>
                            </li>
                            <li>Saved UPI</li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="content_user_profile">
                    <h3 className="section_title_user_profile">
                        Personal Information <span className="edit_link_user_profile" onClick={() => setEditPersonalData(true)}>Edit</span>
                    </h3>

                    <div className="form_row_user_profile">
                        <input type="text" ref={first_name_ref} defaultValue={edit_personal_data ? "" : userData.first_name} disabled={!edit_personal_data} placeholder="First Name" />
                        <input type="text" ref={last_name_ref} defaultValue={edit_personal_data ? "" : userData.last_name} disabled={!edit_personal_data} placeholder="Last Name" />

                    </div>

                    <div className="gender_section_user_profile">
                        <label>Your Gender</label>
                        <div className="radio_group_user_profile">
                            <label><input type="radio" name='Gender' checked={userData.Gender === "Male"} disabled={!edit_personal_data} onChange={() => {
                                setGenderData("Male")
                                userData.Gender = "Male"
                            }
                            } /> Male</label>
                            <label><input type="radio" name='Gender' checked={userData.Gender === "Female"} disabled={!edit_personal_data} onChange={() => {
                                setGenderData("Female")
                                userData.Gender = "Female"
                            }
                            } /> Female</label>
                        </div>
                        {edit_personal_data &&
                            <div>
                                <button className="save_button_user_profile"
                                    onClick={handle_name_gender_submit} >Save</button>
                                <button className="save_button_user_profile"
                                    onClick={() => setEditPersonalData(false)} >Cancel</button>
                            </div>
                        }
                    </div>

                    <h3 className="section_title_user_profile">
                        Email Address <span className="edit_link_user_profile" onClick={() => setEditEmail(true)}>Edit</span>
                    </h3>
                    <input type="email" ref={email_ref} defaultValue={editEmail ? "" : userData.email} disabled={!editEmail} className="input_block_user_profile" placeholder='Enter Your Email' />
                    {editEmail &&
                        <div>
                            <button className="save_button_user_profile"
                                onClick={handle_name_Send_otp} >Send OTP</button>
                            <button className="save_button_user_profile"
                                onClick={() => setEditEmail(false)} >Cancel</button>
                        </div>
                    }
                    {OtpBox &&
                        <div >
                            <input type="text" className="input_block_user_profile" placeholder='Enter OTP' ref={otp_ref} />
                            <button className="save_button_user_profile" onClick={handle_Update_email}>Verify</button>
                        </div>
                    }

                    <h3 className="section_title_user_profile">
                        Mobile Number <span className="edit_link_user_profile" onClick={() => set_edit_user_phone_number(true)}>Edit</span>
                    </h3>

                    <input type="tel" ref={phone_number_ref} defaultValue={edit_user_phone_number ? "" : userData.phone_number} disabled={!edit_user_phone_number} className="input_block_user_profile" placeholder='Enter Your Phone Number' />
                    {edit_user_phone_number &&
                        <div>
                            <button className="save_button_user_profile"
                                onClick={handle_user_phone_number_submit} >Save</button>
                            <button className="save_button_user_profile"
                                onClick={() => set_edit_user_phone_number(false)} >Cancel</button>
                        </div>
                    }
                </main>
            </div>
        </>
    );
}

export default UserProfileCard