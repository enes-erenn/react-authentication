import { sendEmail } from "../utils/sendEmail";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: "thenesern@gmail.com",
        from: "info@digicafes.com",
        subject: "This is a test email",
        text: "If you're reading this, it's working!",
        html: `<p>hello</p>`,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
