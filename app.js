var express 			= require("express"),
		bodyParser		= require("body-parser"),
		nodemailer		= require("nodemailer"),
		flash 				= require("connect-flash"),
	  app 					= express();


app.set("view engine", "ejs");

// app.use(express.static(__dirname + '/public'));
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static('css'));

const port = 3000 || process.env.PORT;

//Flash
app.use(flash());

app.use(require("cookie-session")({
	secret: "Chester is awesome",
	resave: false,
	saveUninitialized: false
}));



//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Root Route
app.get("/", function(req, res){
  res.render("index");
});

app.get("/contact", function(req, res){
 	res.render("contact", {message: req.flash("success")});
});

app.get("/about", function(req, res){
 	res.render("about");
});

app.get("/water", function(req, res){
	res.render("water");
});

app.get("/news", function(req, res){
	res.render("news");
});



app.post('/send-email', (req,res) => {
	const output = `
	<p>You have a new contact request</p>
	<h3>Contact Details</h3>
	<ul>
		<li>Name: ${req.body.name}</li>
		<li>Email: ${req.body.email}</li>
		<li>Phone: ${req.body.phone}</li>
	</ul>
	<h3>Message</h3>
	<p>${req.body.message}</p>
	`;

	let transporter = nodemailer.createTransport({
        host: "mail.eccentrictoad.com",
        port: 465, //587
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAILUSER, // generated ethereal user
            pass: process.env.MAILPASSWORD // generated ethereal password
        },
				tls: {
					rejectUnauthorized:false
				}
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Eccentric Toad Contact Form" <wayne@eccentrictoad.com>', // sender address
        to: 'wayne@eccentrictoad.com', // list of receivers
        subject: 'Toad Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
						return console.log(error);
						req.flash("error", "There was an error! Please try again later");
						res.redirect("back");

        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

				// res.sendStatus(200);
				req.flash("success", "Thank you " + req.body.name + ". Mail successfully sent! We will contact you shortly!");
				res.redirect("back");
    });
});

app.listen(port, process.env.IP, function(){
  console.log("Wayne's Server has started");
});
