
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export const generateGatePassPDF = async (gatePassData) => {
  console.log(gatePassData)
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Add college logo/header styling
  doc.setFillColor(66, 38, 130); // College purple
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  // doc.addImage("./assets/logo.png", "PNG", 15, 5, 25, 25); // Adjust logo size and position
  
  doc.text("RGIPT GATE PASS", 105, 15, { align: "center" });
  doc.setFontSize(14);
  doc.text("OFFICIAL DOCUMENT", 105, 25, { align: "center" });

  // Reset text color for the rest of the document
  doc.setTextColor(0, 0, 0);

  // Add gate pass information
  doc.setFontSize(16);
  doc.text("Gate Pass Details", 15, 45);

  doc.setFontSize(12);
  doc.text(`Pass ID: ${gatePassData._id}`, 15, 60);
  // doc.text(`From Date: ${gatePassData.fromDate}`, 15, 70);
  // doc.text(`To Date: ${gatePassData.toDate}`, 15, 70);
  // doc.text(`Address: ${gatePassData.address} `, 15, 80);
  // doc.text(`Reason: ${gatePassData.reason}`, 15, 90);
  
  // Add student information
  // doc.setFontSize(16);
  // doc.text("Student Information", 15, 110);
  doc.setFontSize(12);
  doc.text(`Student ID: ${gatePassData.student}`, 15, 135);

  // Add approval information
  doc.setFontSize(16);
  doc.text("Approval Information", 15, 155);
  doc.setFontSize(12);
  doc.text(`Approved By: ${gatePassData.issuedBy}`, 15, 170);
  doc.text(`Approved On: ${gatePassData.issuedAt}`, 15, 180);

  // Generate QR Code (contains pass ID and student ID)

  // const qrCodeDataUrl = await QRCode.toDataURL(gatePassData.qrData);
  
  // Add QR code to the document (positioned at the right side)
  doc.addImage(gatePassData.qrData, "PNG", 130, 110, 50, 50);

  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("This gate pass must be presented at the security gate when exiting the campus.", 105, 270, { align: "center" });
  doc.text("Valid only for the date and time mentioned above.", 105, 275, { align: "center" });

  // Return the PDF as a data URL
  console.log(doc.output("dataurlstring"))
  return doc.output("dataurlstring");
};
