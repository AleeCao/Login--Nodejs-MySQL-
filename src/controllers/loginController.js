import { dbconnection } from "../dbconnection.js";
import bcrypt from "bcrypt";

const login = (req, res) => {
  if (req.session.loggedin != true) {
    res.render("login/index");
  }else {
    res.redirect("/home");
  }
}

const register = (req, res) => {
    res.render("login/register");
  }

const loginCheck = async (req, res) => {
  const { email, name, password } = req.body;
  const [rows] = await dbconnection.query('SELECT * FROM Users WHERE (email = ? AND name = ?)', [email, name])
  if (rows.length === 0) {
    res.status(404).render("login/index", { error: 'Error: User not found'});
    return;
  }else {
    rows.forEach(row => {
      bcrypt.compare(password, row.password, (err, result) => {
        if (result) {
          req.session.loggedin = true;
          req.session.email = email;
          req.session.name = name;
          res.redirect("/home");
        } else {
          res.status(404).render("login/index", { error: 'Error: Incorrect password'});
          return;
        };
      })
    });
  }
}

const registerPost = async (req, res) => {
  const { email, name, password } = req.body;
  const rows = await dbconnection.query('SELECT * FROM Users WHERE email = ?', [email])
  if (rows.length === 0) {
    res.status(404).render("login/register", { error: 'Error: User already exists'});
    return;
  }else {
    const cryptPassword = await bcrypt.hash(password, 5)
    const [ rows ] = await dbconnection.query('INSERT INTO Users (email, name, password) VALUES (?, ?, ?)', [email, name, cryptPassword]);
    console.log(rows);
    res.redirect("/login");
  }
}

const home = (req, res) => {
  if (req.session.loggedin != true) {
    res.redirect("/login");
  }else {
    res.render("home", { name: req.session.name });
  }
}

const logout = (req, res) => {
  req.session.loggedin = false;
  res.redirect("/login");
}

export { 
    login,
    register,
    registerPost,
    loginCheck,
    home,
    logout
};