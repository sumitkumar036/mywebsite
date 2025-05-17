import React from "react";
import config from '../../script/config'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

const generatePDF = () => {

    const input = document.getElementById('invoice');
    html2canvas(input, { useCORS: true, allowTaint: false }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");

      toast.info("Pdf downloaded successfully");

    });
  };


const sendMail = ()=> {
    toast.info("Coming soon...");
}

const Invoice = ({ invoiceData }) => {
  const {
    company,
    customer,
    invoiceNumber,
    invoiceDate,
    dueDate,
    items,
    notes,
    terms,
  } = invoiceData;

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div>
    <div id="invoice" style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.companyInfo}>
          <img
            src={company.logoUrl}
            alt={`${company.name} Logo`}
            style={styles.logo}
          />
          <div>
            <h2 style={styles.companyName}>{company.name}</h2>
            <p style={styles.companyText}>{company.address}</p>
            <p style={styles.companyText}>{company.email}</p>
            <p style={styles.companyText}>{company.phone}</p>
          </div>
        </div>

        <div style={styles.invoiceInfo}>
          <h1 style={styles.invoiceTitle}>INVOICE</h1>
          <p><strong>Invoice #:</strong> {invoiceNumber}</p>
          <p><strong>Date:</strong> {invoiceDate}</p>
          <p><strong>Due Date:</strong> {dueDate}</p>
        </div>
      </header>

      {/* Bill To */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Bill To</h3>
        <p style={styles.customerText}>{customer.name}</p>
        <p style={styles.customerText}>{customer.address}</p>
        <p style={styles.customerText}>{customer.email}</p>
        <p style={styles.customerText}>{customer.phone}</p>
      </section>

      {/* Items Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.th}>Item Description</th>
            <th style={{ ...styles.th, textAlign: "center" }}>Qty</th>
            <th style={{ ...styles.th, textAlign: "right" }}>Price</th>
            <th style={{ ...styles.th, textAlign: "right" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={i}
              style={i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
            >
              <td style={styles.td}>{item.description}</td>
              <td style={{ ...styles.td, textAlign: "center" }}>{item.quantity}</td>
              <td style={{ ...styles.td, textAlign: "right" }}>
                {config.rupeeSymbol}{item.price.toFixed(2)}
              </td>
              <td style={{ ...styles.td, textAlign: "right" }}>
                {config.rupeeSymbol}{(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <section style={styles.summary}>
        <div>
          <p style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>{config.rupeeSymbol}{subtotal.toFixed(2)}</span>
          </p>
          <p style={styles.summaryRow}>
            <span>Tax (10%):</span>
            <span>{config.rupeeSymbol}{tax.toFixed(2)}</span>
          </p>
          <p style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span>Total:</span>
            <span>{config.rupeeSymbol}{total.toFixed(2)}</span>
          </p>
        </div>
      </section>

      {/* Notes and Terms */}
      {notes && (
        <section style={styles.notes}>
          <h4>Notes</h4>
          <p>{notes}</p>
        </section>
      )}

      {terms && (
        <section style={styles.terms}>
          <h4>Terms & Conditions</h4>
          <p>{terms}</p>
        </section>
      )}

     
    </div>

    <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-primary" onClick={generatePDF}>Download Invoice</button>
        <button className="btn btn-primary" onClick={sendMail}>Send Mail </button>
    </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: "30px auto",
    padding: 30,
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    borderRadius: 12,
    color: "#333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "3px solid #4a90e2",
    paddingBottom: 20,
    marginBottom: 30,
  },
  companyInfo: {
    display: "flex",
    gap: 15,
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    objectFit: "contain",
  },
  companyName: {
    margin: 0,
    color: "#4a90e2",
    fontWeight: 700,
    fontSize: 24,
  },
  companyText: {
    margin: "2px 0",
    fontSize: 14,
    color: "#555",
  },
  invoiceInfo: {
    textAlign: "right",
  },
  invoiceTitle: {
    margin: 0,
    fontSize: 32,
    color: "#4a90e2",
    fontWeight: 700,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10,
    color: "#4a90e2",
  },
  customerText: {
    margin: "3px 0",
    fontSize: 15,
    color: "#444",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 30,
  },
  tableHeaderRow: {
    backgroundColor: "#4a90e2",
    color: "#fff",
  },
  th: {
    padding: "12px 15px",
    fontWeight: 600,
    fontSize: 15,
  },
  tableRowEven: {
    backgroundColor: "#f7faff",
  },
  tableRowOdd: {
    backgroundColor: "#eaf2ff",
  },
  td: {
    padding: "12px 15px",
    fontSize: 14,
    color: "#333",
  },
  summary: {
    textAlign: "right",
    marginBottom: 30,
    fontSize: 16,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    fontWeight: 700,
    fontSize: 18,
    color: "#4a90e2",
  },
  notes: {
    backgroundColor: "#f0f5ff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    color: "#2e3a59",
  },
  terms: {
    backgroundColor: "#e6f0ff",
    padding: 20,
    borderRadius: 8,
    color: "#2e3a59",
  },
};

export default Invoice;
