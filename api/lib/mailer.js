import nodemailer from 'nodemailer';

export const sendAdminEmail = async (orderDetails) => {
  const { items, totalAmount, address, paymentMethod, _id } = orderDetails;

  const emailContent = `
    <h1>New Order Received!</h1>
    <p><strong>Order ID:</strong> ${_id}</p>
    <p><strong>Customer Name:</strong> ${address.name}</p>
    <p><strong>Phone:</strong> ${address.phone}</p>
    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
    <h2>Items:</h2>
    <ul>
      ${items.map(i => `<li>${i.quantity}x ${i.title} - ₹${(i.price * i.quantity).toLocaleString('en-IN')}</li>`).join('')}
    </ul>
    <h3>Total: ₹${totalAmount.toLocaleString('en-IN')}</h3>
  `;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"SHINE & SPARKLE Store" <${process.env.EMAIL_USER}>`,
        to: 'vintagediva1999@gmail.com', // Admin Email
        subject: `New Order! #${_id}`,
        html: emailContent,
      });

      console.log(`[MAILER] Admin notification email sent successfully!`);
    } catch (error) {
      console.error(`[MAILER] Failed to send admin email:`, error.message);
    }
  } else {
    // Mock Mode
    console.log('\n--- MOCK ADMIN EMAIL ---');
    console.log(`To: vintagediva1999@gmail.com`);
    console.log(`Subject: New Order! #${_id}`);
    console.log(`Body (HTML):\n${emailContent}`);
    console.log('------------------------\n');
  }
};

export const sendCustomerEmail = async (orderDetails) => {
  const { items, totalAmount, address, _id } = orderDetails;

  if (!address.email) return; // Cannot send customer email without an address

  const emailContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h1 style="color: #C5A059; text-align: center;">SHINE & SPARKLE</h1>
      <h2 style="text-align: center;">Order Confirmed!</h2>
      <p>Hi ${address.name},</p>
      <p>Thank you for your purchase! We are thrilled to confirm your order <strong>#${_id}</strong>.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <h3>Order Summary</h3>
      <ul style="list-style: none; padding: 0;">
        ${items.map(i => `<li style="margin-bottom: 10px;">${i.quantity}x <strong>${i.title}</strong> - ₹${(i.price * i.quantity).toLocaleString('en-IN')}</li>`).join('')}
      </ul>
      <h3 style="text-align: right;">Total: ₹${totalAmount.toLocaleString('en-IN')}</h3>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p>We will notify you once your exquisite jewelry is shipped to ${address.street}, ${address.city}.</p>
      <p>Warm Regards,<br/><strong>SHINE & SPARKLE Team</strong></p>
    </div>
  `;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"SHINE & SPARKLE" <${process.env.EMAIL_USER}>`,
        to: address.email,
        subject: `Your SHINE & SPARKLE Order Confirmation (#${_id})`,
        html: emailContent,
      });

      console.log(`[MAILER] Customer confirmation email sent to ${address.email} successfully!`);
    } catch (error) {
      console.error(`[MAILER] Failed to send customer email:`, error.message);
    }
  } else {
    // Mock Mode
    console.log('\n--- MOCK CUSTOMER EMAIL ---');
    console.log(`To: ${address.email}`);
    console.log(`Subject: Your SHINE & SPARKLE Order Confirmation (#${_id})`);
    console.log(`Body (HTML):\n${emailContent}`);
    console.log('---------------------------\n');
  }
};
