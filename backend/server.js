require("dotenv").config();

const express = require("express"); 
const cors = require("cors"); 
const path = require("path");
const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes.js"); 
const sessionRoutes = require("./routes/sessionRoutes.js"); 
 const questionRoutes =require("./routes/questionRoutes.js");
const protect = require("./middlewares/authMiddleware.js");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController.js");


const app = express();



// console.log("authRoutes:", authRoutes);


// Middleware to handle CORS
// app.use(

// cors ({
//  origin: "*",
// methods: ["GET", "POST", "PUT", "DELETE"], 
// allowedHeaders: ["Content-Type", "Authorization"],
// })
// );

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control", // ✅ added
      "Pragma",        // ✅ added
      "Expires",       // optional, some browsers send this
      "Accept"
    ],
    credentials: true, // optional if using cookies or auth
  })
);



connectDB();

// Middleware
app.use(express.json());

// Routes

 app.use("/api/auth", authRoutes);



app.use('/api/sessions', sessionRoutes);
 app.use('/api/questions', questionRoutes);

app.use('/api/ai/generate-questions', protect, generateInterviewQuestions);
 app.use('/api/ai/generate-explanation', protect, generateConceptExplanation);


// Serve uploads folder
app.use("/uploads", express.static (path.join(__dirname, "uploads"), {}));

//Start Server

const PORT= process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
