const PDFDocument = require('pdfkit');

const generateReceipt = (res, repayment, loan, customer) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=receipt.pdf');

  doc.pipe(res);

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
};

module.exports = generateReceipt;
