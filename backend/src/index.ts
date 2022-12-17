import path from "path";
import express, { Application } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dbConfig from "./config/dbConn";
import corsOptions from "./config/corsOptions";
import { Server } from "socket.io";
import https from "https";
import users from "./routes/users";
import globalChat from "./routes/global-chat";
import conversations from "./routes/conversations";
import initializePassport from "./config/passportConfig";
import passport from "passport";
import session from "express-session";
import credentials from "./middleware/credentials";
import cookieParser from "cookie-parser";
import fs from "fs";
require("dotenv").config();

const app: Application = express();

app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());

initializePassport(passport);
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", users);
app.use("/global-chat", globalChat);
app.use("/conversations", conversations);

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "../cert/key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "../cert/cert.pem")),
  },
  app
);

export const io = new Server(server, { cors: corsOptions });

mongoose
  .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`API server listening at https://localhost:${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB", error));
