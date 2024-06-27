import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./UserForm.css";
import Footer from "../Footer/Footer";

function UserForm(props) {
  const {
    user,
    onSave,
    onCancel,
    isEditing,
    successMessage,
    errorMessage,
    setErrorMessage,
    isEditingProfile,
  } = props;

  const [email, setEmail] = useState(user ? user.email : "");
  const [fullname, setFullname] = useState(user ? user.fullname : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTempMessage, setShowTempMessage] = useState(false);
  const [tempMessage, setTempMessage] = useState("");

  useEffect(() => {
    if (isEditing) {
      setEmail(user.email);
      setFullname(user.fullname);
      setPassword(user.password || "");
      setConfirmPassword(user.password || "");
    }
  }, [user, isEditing]);

  const handleSave = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    onSave({ email, fullname, password });
    setTempMessage(
      isEditingProfile ? "User Updated" : "Registration Successful"
    );
    setShowTempMessage(true);
    setTimeout(() => {
      setShowTempMessage(false);
    }, 3000);
  };

  const handleCancel = () => {
    onCancel();
    setShowTempMessage(false); // Reset the temp message state on cancel
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="user-form">
      <h2>Keeper App</h2>
      {showTempMessage && <div className="temp-message">{tempMessage}</div>}
      {successMessage ? (
        <div>
          <p className="success-message">{successMessage}</p>
          <p data-testid="confirmation-return-link" className="return-link">
            {isEditingProfile ? "Return to Keeper App" : "Return to Login"}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEditing}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              data-testid="toggle-password-span"
              onClick={toggleShowPassword}
              className="toggle-password"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span onClick={toggleShowPassword} className="toggle-password">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="user-form-buttons">
            <button type="submit">Save</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      )}
      <Footer />
    </div>
  );
}

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
  isEditingProfile: PropTypes.bool,
};

export default UserForm;
