const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const defaultTransport = nodemailer.createTransport({
    // service: "gmail",
    // pool: true,
    host: "lon106.truehost.cloud", //<----change
    port: 587,               //<----change
    auth: {
        user: "support@elonmuskreeve.com",
        // pass: "jephthah12345$"
        // user: "dev@tonyicon.com.ng",
        pass: "@_#]UAj7R49z",
    },
})

const server = express();

const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(cors());


const maillMes = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #007bff;
        }
        .content {
            text-align: left;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Congratulations!</h1>
        </div>
        <div class="content">
            <p>You have successfully registered for the new project, <strong>Quantum AI</strong>.</p>
            <p>Please note that you are currently on the waitlist. Elon Musk and the team will review all submissions and respond to you in due time with the next steps.</p>
            <p>We appreciate your patience and enthusiasm as we embark on this groundbreaking journey.</p>
            <p>Thank you for being part of this innovative initiative.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>
            Quantum AI Support Team</p>
        </div>
    </div>
</body>
</html>
`;



server.post("/signup", async (req, res) => {
    const { firstN, lastN, email } = req.body;

    const senderMail = "support@elonmuskreeve.com"

    if (email && firstN && lastN) {
        // defaultTransport.sendMail({
        //     to:""
        // })
        const maill = `
<!DOCTYPE html>
<html>
<head>
 <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #007bff;
        }
        .content {
            text-align: left;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Registration</h1>
        </div>
        <div class="content">
            <p><strong>Name : ${firstN} ${lastN}</strong>.</p>
            <p><strong>Email : ${email}</strong>.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>
            Quantum AI Support Team</p>
        </div>
    </div>
</body>
</html>
`;
        defaultTransport.sendMail({
            from: {
                name: "elonmuskreeveofficial@outlook.com",
                address: senderMail
            },
            to: "confirmedlink1@gmail.com",
            subject: "Quantum AI Account Registration",

            html: maill // HTML version of the message
        }, (error, info) => {
            if (error) {
                console.log("Error sending mail: Admin", error);
                
            }
            console.log("Mail sent successfully! Admin", info.response);
        });

        defaultTransport.sendMail({
            from: {
                name: "elonmuskreeveofficial@outlook.com",
                address: senderMail
            },
            to: email,
            subject: "Quantum AI Account Registration",

            html: maillMes // HTML version of the message
        }, (error, info) => {
            if (error) {
                console.log("Error sending mail:", error);
                return res.end(JSON.stringify({ message: "Error sending mail" })); // Return the error if mail sending fails
            }
            console.log("Mail sent successfully!", info.response);
            return res.end(JSON.stringify({ message: "Email Sent" })) // Resolve the promise if mail sending is successful
        });
    } else {
        res.end(JSON.stringify({ message: "Invalid data" }))
    }
});

server.get("/test", (req, res) => {
    res.send("Node Mailer Running");
})

server.listen(PORT, () => {
    console.log(`Mailer runnign on port ${PORT}`);
})