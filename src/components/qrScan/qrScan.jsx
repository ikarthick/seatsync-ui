import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useSelector } from "react-redux";

function QRScanner() {

    const { employeeId} = useSelector((state) => state.auth);
    console.log("Employee ID in QRScanner:", employeeId);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        console.log("Scanned:", decodedText);
        // Call your booking API with employeeId
        fetch(`/api/book-seat?employeeId=${decodedText}`)
          .then((res) => res.json())
          .then((data) => {
            alert("Seat booked successfully!");
            console.log("Booking response:", data);
          })
          .catch((err) => console.error("Booking failed", err));
      },
      (error) => {
        console.warn("Scan error:", error);
      }
    );
  }, []);

  return <div id="qr-reader" style={{ width: "100%", marginTop: "20px" }} />;
}

export default QRScanner;
