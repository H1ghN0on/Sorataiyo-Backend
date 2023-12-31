import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";

import "./config/db";
import { passport } from "./config/passport";

import { ApplicationController, SessionController, UserController } from "./controllers";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "secret cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//User Controller
app.get("/auth/me", passport.authenticate("jwt", { session: false }), UserController.getMe);
app.post("/auth/check-email", UserController.checkEmailExistence);
app.post("/auth/login", UserController.loginUser);
app.post("/auth/register", UserController.registerUser);

//Application Controller
app.get(
  "/applications/get-instruments",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.getInstruments
);
app.post(
  "/applications/create",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.createApplication
);
app.get(
  "/applications/get",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.getApplications
);
app.get(
  "/applications/admin/get",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.getAdminApplications
);
app.get(
  "/applications/get/:id",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.getApplicationById
);
app.post(
  "/applications/status/update",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.updateApplicationStatus
);
app.post(
  "/applications/update",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.updateApplication
);
app.get(
  "/applications/complete/:id",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.completeApplication
);
app.delete(
  "/applications/delete/:id",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.deleteApplication
);

//Session Controller
app.get(
  "/results/sessions",
  passport.authenticate("jwt", { session: false }),
  SessionController.getUserSessions
);
app.get(
  "/results/sessions/:id",
  passport.authenticate("jwt", { session: false }),
  SessionController.getSessionResults
);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server deployed");
});
