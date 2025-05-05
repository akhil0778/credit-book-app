const PDFDocument = require('pdfkit');
const db = require('../config/db');  // Ensure you have access to the DB if you need to retrieve any data.

const generateReceipt = async (req, res) => {
  try {
    const repaymentId = req.params.repaymentId;
    // Fetch repayment, loan, and customer details from the database.
    const repayment = await db('repayments').where({ id: repaymentId }).first();
    const loan = await db('loans').where({ id: repayment.loan_id }).first();
    const customer = await db('customers').where({ id: loan.customer_id }).first();

    if (!repayment || !loan || !customer) {
      return res.status(404).json({ error: 'Repayment, loan, or customer not found' });
    }

    // Create PDF document
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=receipt.pdf');

    doc.pipe(res);

    // Content for PDF
    doc.fontSize(18).text('Repayment Receipt', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Customer: ${customer.name}`);
    doc.text(`Phone: ${customer.phone}`);
    doc.text(`Address: ${customer.address}`);
    doc.moveDown();

    doc.text(`Loan Description: ${loan.item_description}`);
    doc.text(`Loan Amount: ₹${loan.amount}`);
    doc.text(`Due Date: ${loan.due_date}`);
    doc.moveDown();

    doc.text(`Repayment ID: ${repayment.id}`);
    doc.text(`Paid Amount: ₹${repayment.amount}`);
    doc.text(`Date: ${repayment.date}`);
    doc.moveDown();

    doc.text('Thank you!', { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ error: 'Error generating receipt' });
  }
};

module.exports = { generateReceipt };
