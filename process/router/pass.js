import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { Router } from "express";
import contenedor from "../contenedores/contenedor.js";

const DBU = new contenedor("usuarios", {
  username: String,
  password: String,
});

passport.use(
  "register",
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const userExist = await DBU.findOne({ username, password });
        if (userExist) return done(null, false);
        const user = { username, password: password };
        const createUser = await DBU.save(user);
        return done(null, createUser);
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.use(
  "login",
  new Strategy(async (username, password, done) => {
    try {
      const user = await DBU.findOne({ username, password });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);

/////////////////////////////////////////////
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await DBU.findByid(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});
///////////////////////////////////////////

const pass = new Router();

pass.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/errorlogin" }),
  (req, res) => {
    req.session.user = req.body.username;
    res.redirect("/");
  }
);

pass.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/errorregister" }),
  (req, res) => {
    req.session.user = req.body.username;
    res.redirect("/");
  }
);

pass.get("/login", (req, res) => {
  if (req.session.user) res.redirect("/");
  if (!req.session.user) res.render("main", { layout: "login" });
});

pass.get("/register", (req, res) => {
  if (req.session.user) res.redirect("/");
  if (!req.session.user) res.render("main", { layout: "register" });
});

pass.get("/errorlogin", (req, res) => {
  res.render("main", { layout: "errorlogin" });
});

pass.get("/errorregister", (req, res) => {
  res.render("main", { layout: "errorregister" });
});

export default pass;
