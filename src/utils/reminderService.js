const sendReminder = (customer, loan) => {
    const message = `
  📢 Reminder for ${customer.name}
  --------------------------
  🛒 Item: ${loan.item_description}
  💰 Due Amount: ₹${loan.balance}
  📅 Due Date: ${loan.due_date}
  
  Please make the payment as soon as possible. Thank you!
    `.trim();
  
    console.log(`\n[Mock SMS/WhatsApp Sent to ${customer.phone}]:\n${message}\n`);
  };
  
  module.exports = sendReminder;
  