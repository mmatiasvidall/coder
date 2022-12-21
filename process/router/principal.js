import { Router } from "express";

const principal = Router();

principal.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    res.render("main", { layout: "principal", nombre: req.session.user });
  }
});

principal.get("/desloguear", (req, res) => {
  res.render("main", { layout: "desloguear", nombre: req.session.user });
  req.session.destroy();
});

principal.post("/desloguear", (req, res) => {
  res.redirect("/");
});

export default principal;
