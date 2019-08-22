const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send("Server Running");
});

app.get('/send-email', (req,res) => {
    const { recipient, sender, topic, text } = req.query;

    const msg = {
        to: recipient,
        from: sender,
        subject: topic,
        text: text,
    }

    sgMail.send(msg)
    .then((msg) => console.log(text));
});

app.listen(4000, () => console.log("Running on Port 4000"));
