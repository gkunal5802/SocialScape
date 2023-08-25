import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/authController.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//? CONFIGURATIONS OR MIDDLEWARES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// !This middleware parses incoming JSON data and makes it available in req.body for further processing.
app.use(express.json());

//! This middleware enables Cross-Origin Resource Sharing (CORS), allowing controlled access to your server's resources from different domains.
app.use(cors());

// !Helmet helps secure your Express application by setting various HTTP headers to protect against common web vulnerabilities.
app.use(helmet());

// !This middleware sets the Cross-Origin Resource Policy (CORP) header to control which origins are allowed to access cross-origin resources.
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// !Morgan is a logging middleware that captures information about incoming HTTP requests and logs it to the console or a log file.
app.use(morgan("common"));

//! This middleware parses incoming JSON data and populates it in req.body, similar to express.json(). The limit option sets a maximum size for the incoming JSON payload.
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// !This middleware parses incoming URL-encoded data and populates it in req.body. The limit option sets a maximum size for the incoming data.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// !This middleware serves static files, such as images, stylesheets, and JavaScript files, from a specified directory (public/assets in this case) when requested through the specified route (/assets in this case).
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// ?FILE STORAGE
const storage = multer.diskStorage({
  // cb: this will save files in speicified destination folder like: public/assets
  destination: function (req, file, cb) {
    cb(null, "public/assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ?ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);

// ?ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
// ?MONGOOSE SETUP
const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(app.listen(PORT, () => console.log(`App running on port ${PORT}`)))
  .catch((error) => console.log(`${error} 💥💥`));
