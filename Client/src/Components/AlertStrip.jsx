import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const AlertStrip = ({ msg }) => {
  const [showAlert, setShowAlert] = useState(true);

  // Automatically hide the alert after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showAlert && (
        <Alert variant="success">
          {msg}
        </Alert>
      )}
    </>
  );
};

export default AlertStrip;
