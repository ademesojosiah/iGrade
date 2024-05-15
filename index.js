require("dotenv").config();
const express = require("express");
const { isAuthorized } = require("./middleware/authentication")
const userRouter = require("./router/user.router")
const app = express();

app.use(express.json())


// Set up express-session middleware
app.use(session({
    secret: process.env.PASSWORD, // Replace with a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));


app.use("/api",isAuthorized,userRouter)


app.get("/", (req,res)=>{
    res.status(200).json({status:true, message:"hello"})
})

app.post('/login', async (req, res) => {
    const { token } = req.body;
  
    try {
      if (token !== process.env.PASSWORD) {
        return res.status(401).send('Invalid credentials');
      }
  
      // Save user data to the session
      req.session.isAuthorized = true;
  
      res.status(200).send('Login successful');
    } catch (err) {
      console.error('Error during login', err);
      res.status(500).send('Internal server error');
    }
  });


  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout', err);
        return res.status(500).send('Internal server error');
      }
  
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).send('Logout successful');
    });
  });

app.use("*",(req,res)=>{
    res.status(404).send('page not found');
})



app.listen(4000,()=>{
    console.log("server listening to port 4000");
} )