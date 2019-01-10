const bcrypt = require("bcryptjs");

module.exports = {
  async register(req, res) {
    const { email, password } = req.body;
    const db = req.app.get("db");
    const accountArray = await db.find_acc_email({ email });
    if (accountArray[0]) {
      return res.status(200).send({ message: "Email already in use" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let newAccArr = await db.create_acc({ email, hash });
    const { acc_id, acc_email } = newAccArr[0];
    req.session.user = { id: acc_id, email: acc_email };
    res.status(200).send({ message: "logged in", userData: req.session.user, loggedIn: true });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const db = req.app.get("db");
    const accountArray = await db.find_acc_email({ email });
    const { acc_id, acc_email, acc_hash } = accountArray[0];
    if (!accountArray[0]) {
      return res.status(200).send({ message: "Email not found" });
    }
    const result = bcrypt.compareSync(password, acc_hash);
    if (!result) {
      return res.status(401).send({ message: "Password incorrect" });
    }
    req.session.user = { id: acc_id, email: acc_email };
    res.status(200).send({ message: "logged in", userData: req.session.user, loggedIn: true });
  }, 

  

  userData(req, res) {
    if(req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(401).send('Please log in.')
    }
  }
}; 
