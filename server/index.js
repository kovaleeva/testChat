const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const http = require("http");
const server = http.createServer(app);

const db = require("./db/models");
const Users = db.Users;
const Messages = db.Messages;

const WebSocket = require("ws");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authService = require("./config/auth");

const apiRouter = require("./routes/apiRouter");
const chatRoutes = ["/", "/login", "/logout"];

app.use(chatRoutes, express.static("public"));
app.use(bodyParser.json(), cookieParser(), authService.verifyJWT_MW, apiRouter);

const wss = new WebSocket.Server({ port: 8082, host: '192.168.0.177' });
let users = [];

const colors = [
  "#C9FFE2", "#5A464C", "#767522",
  "#8F9491", "#69140E", "#A44200",
  "#3C787E", "#090C9B", "#D58936",
  "#643173", "#86A59C", "#563F1B",
  "#A64253", "#1A936F", "#BF8B85",
  "#9B1D20", "#63A46C", "#4F6D7A"];

const broadcast = (data, ws) => {
  const json = JSON.stringify(data);

  users.forEach(client => {
    client.ws.send(json);
  });
};

wss.on("connection", (ws, req) => {
  // let color = 1 + Math.random() * (colors.length - 1);
  // color = Math.floor(color);

  ws.on("message", (message) => {
    let { type, data } = JSON.parse(message);
    color = colors[color];

    switch (type) {

      case "SEND_MESSAGE":
        Users.findOne({ where: { id: data.loginID }, raw: true })
          .then(res => {
            if (!res.mute) {
              Messages.create({
                loginID: data.loginID,
                message: data.message
              })
                .then(result => {
                  broadcast({
                    type: "FETCH_MESSAGES",
                    data: {
                      login: data.login,
                      message: result.message,
                      createdAt: result.createdAt
                    }
                  }, ws);
                })
            }
          })
        break;

      case "CONNECTION": {
        const obj = {
          ws: ws,
          user: data
        };
        users.push(obj);
        let dataUsers = users.map(user => user.user).filter(e => e);
        broadcast({ type: "FETCH_USER_LIST", data: dataUsers }, ws);
        break;
      }

      case "FETCH_MUTE_USER": {
        let user = users.find(el => el.user.id == data.id);
        Users.update({ mute: 1 }, { where: { id: data.id }, raw: true });

        let index = users.findIndex(el => el.user.id == data.id);
        users[index].user.mute = 1; 

        user.ws.send(JSON.stringify({ type: "MUTE_USER", data: users.map(item => item.user) }));
        ws.send(JSON.stringify({ type: "FETCH_USER_LIST", data: users.map(item => item.user) }));
        break;        
      }

      case "FETCH_UNMUTE_USER": {
        let user = users.find(el => el.user.id == data.id);
        Users.update({ mute: 0 }, { where: { id: user.user.id }, raw: true });
        user.ws.send(JSON.stringify({ type: "UNMUTE_USER", data: user.user }));
        
        ws.send(JSON.stringify({ type: "FETCH_USER_LIST", data: users.map(item => item.user) }));
        break;        
      }

      case "BAN_USER": {

        let user = users.find(el => el.user.id == data.id);
        Users.update({ ban: 1 }, { where: { id: user.user.id }, raw: true });
        
        // user.ws.send(JSON.stringify({ type: "LOGOUT_USER", data: users = users.filter(user => user.ws !== ws) }));
        user.ws.close();
        break;        
      }

      default:
        break;
    }
  });

  ws.on("close", (event) => {
    let userOut = users.find(user => user.ws === ws);

    Users.update({ status: 0 }, { where: { id: userOut.id }, raw: true });

    users = users.filter(user => user.ws !== ws);

    broadcast({
      type: "FETCH_USER_LIST",
      data: users.map(item => item.user)
    }, null);
  });
});

server.listen(
  8081,
  (listening = () => {
    console.log(`Listen to ${server.address().port} port 🌍 `);
  })
);
