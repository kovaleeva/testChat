const apiRouter = require("express").Router();

const db = require("../db/models");
const Users = db.Users;
const Messages = db.Messages;
const bcrypt = require('bcrypt');

const auth = require("../config/auth");
const jwt = require("jsonwebtoken");

apiRouter.get("/messages", (req, res) => {
  Messages.findAll()
    // Messages.findAll({ include: [{
    //     model: Users,
    //     as: 'author'
    //   }]})
    .then(result =>
      res.status(200).json({
        result
      })
    )
    .catch(error =>
      res.status(500).json({
        error
      })
    );
});

apiRouter.get("/users", (req, res) => {
  Users.findAll({ raw: true })
    .then(result =>
      res.status(200).json({
        result
      })
    )
    .catch(error =>
      res.status(500).json({
        error
      })
    );
});

apiRouter.get("/onlineusers", (req, res) => {
  Users.findAll({
    raw: true,
    where: {
      status: true,
      ban: false
    }
  })
    .then(result => result.map((user) => {
      return { login: user.login, id: user.id, mute: user.mute };
    }))
    .then(result =>
      res.status(200).json({
        result
      })
    )
    .catch(error =>
      res.status(500).json({
        error
      })
    );
});

apiRouter.post("/users", (req, res) => {
  let body = req.body;

  Users.findOne({ where: { login: body.login.trim() }, raw: true })
    .then(result => {
      if (!result) {
        // _______ USER NEW _______

        const passwordHash = bcrypt.hashSync(body.password.trim(), 12);

        Users.create({
          login: body.login.trim(),
          password: passwordHash,
          status: 1
        })
          .then(user => user.get())
          .then(user => {
            res.json({
              token: auth.createJWToken(user),
              user: {
                login: user.login,
                id: user.id,
                admin: 0,
                mute: 0,
                ban: 0
              }
            });
          });
      } else {
        // _______ USER ALREADY EXIST _______
        if (!bcrypt.compareSync(body.password, result.password)) {
          res.json({
            error: true,
            message: "Password is Wrong"
          });
        } else {
          if( result.ban ) {
            return res.status(403).send();
          }

          Users.update({ status: 1 }, { where: { id: result.id }, raw: true })
            .then(() => {
              res.json({
                token: auth.createJWToken(result),
                user: {
                  id: result.id,
                  login: result.login,
                  admin: result.admin,
                  mute: result.mute,
                  ban: result.ban,
                }
              });
            })
        }
      }
    })
    .catch(error =>
      res.json({
        error
      })
    );
});

apiRouter.post("/logout", (req, res) => {
  let body = req.body;
  res.clearCookie('token');

  Users.update({ status: 0 }, { where: { id: body.id }, raw: true })
    .then(result => res.json({ result }))
    .catch(error =>
      res.json({
        error
      })
    );
});

apiRouter.put("/ban", (req, res) => {
  let body = req.body;
  Users.update({ ban: 1 }, { where: { id: body.id }, raw: true })
    .then(result => res.json({ result }))
    .catch(error =>
      res.json({
        error
      })
    );
});

apiRouter.put("/mute", (req, res) => {
  let body = req.body;
  Users.update({ mute: 1 }, { where: { id: body.id }, raw: true })
    .then(result => res.json({ result }))
    .catch(error =>
      res.json({
        error
      })
    );
});

apiRouter.post("/messages", (req, res) => {
  Messages.create({
    loginID: req.body.loginID,
    message: req.body.message
  })
    .then(result =>
      res.json({
        result
      })
    )
    .catch(error =>
      res.status(500).json({
        error
      })
    );
});

module.exports = apiRouter;
