// const nodemailer = require('nodemailer');


// const mail = async (email, subject, message,html) => {
//   const transporter = nodemailer.createTransport({host: process.env.MAIL_HOST,
//                                                     port: process.env.MAIL_SERVER_PORT,
//                                                     secure: true,
//                                                     auth: { user:  process.env.MAIL,
//                                                             pass:  process.env.MAIL_PASS
//                                                           }
//                                                   });
//   try {
//       let info = await transporter.sendMail({from:  process.env.MAIL,
//                                                 to: email,
//                                                 subject,
//                                                 html,
//                                                 text: message});

//       return { status: 'SUCCESS',msg: info.response };
//     } catch (err) {
//       return { status: 'ERROR', msg: err.message }
            
//     } 
        
// }
// module.exports = { mail };

const nodemailer = require("nodemailer");

const htmlForgetPass = (reseturl) => {
  return	` <!DOCTYPE html>
                    <html>
                    <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
                    <div
                        style="
                        max-width: 400px;
                        margin: 10px;
                        background-color: #fafafa;
                        padding: 25px;
                        border-radius: 20px;
                        "
                    >
                        <p style="text-align: left;">
                            You sent a password reset request,
                            Copy this code to reset password

                        </p>
                        <a href='${reseturl}' target="_blank">
                        <button
                            style="
                            background-color: #201eaa;
                            border: 0;
                            width: 200px;
                            height: 30px;
                            border-radius: 6px;
                            color: #fff;
                            "
                        >
                            click here
                        </button>
                        </a>
                        <p style="text-align: left;">
                                                        
                         If you did not send the request, you should notify by email and come back and preferably renew your password
                        The giveify team
                        </p>
                        <p style=" font-size: 10px;  text-align: left;" >
                        If you are unable to click the above button, copy paste the below URL into your address bar

                        </p>
                        <a href="${reseturl}" target="_blank">
                            <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">
                                ${reseturl}
                            </p>
                        </a>
                    </div>
                    </body>
                </html>`;
};

const mail = async (email, subject, message, html) => {
	const transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_SERVER_PORT,
		secure: true,
		auth: { user: process.env.MAIL, pass: process.env.MAIL_PASS },
	});
	try {
		let info = await transporter.sendMail({
			from: process.env.MAIL,
			to: email,
			subject:subject,
			html:html,
			text: message,
		});

		return { status: "SUCCESS", msg: info.response };
	} catch (err) {
		return { status: "ERROR", msg: err.message };
	}
};
module.exports = { mail, htmlForgetPass };
