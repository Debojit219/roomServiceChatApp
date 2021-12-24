const express = require("express")
const app = express()
const path=require("path");
const port = process.env.PORT || 3000;
const server = require('http').Server(app);
const io = require('socket.io')(server);
const userInfo = require("./Database/model/dataModel.js");
require("./Database/db/conn.js");


const views_path=path.join(__dirname,"./templates/views");
app.set("view engine", "ejs");
app.set("views", views_path);

const currentOnlineUsers = {}
const rooms = {};
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.render("index");
})
app.get("/about", function(req,res){
    res.render("about.ejs")
})
app.post("/room", function (req, res) {
    try {
        const d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        let ms = d.getMilliseconds();
        var randomID = (h < 10 ? ("0" + h) : h) + "" + (m < 10 ? ("0" + m) : m) + "" + (s < 10 ? ("0" + s) : s) + "" + (ms < 10 ? ("00" + ms) : (ms < 100 ? ("0" + ms) : ms));
        var userName = req.body.Username;
        var meetingTitle = req.body.meetingTitle;
        var owner = true;
        const newUserInfo = new userInfo({
            userName: userName,
            roomID: randomID,
            meetingTitle: meetingTitle,
            creator: owner
        })
        newUserInfo.save();
        io.emit("creator-info", userName, meetingTitle);
        console.log(randomID);
        res.redirect('/' + randomID + '?username=' + userName + '&meetingTitle=' + meetingTitle);
    } catch (error) {
        res.status(400).send(error);
    }

})

app.post("/joinRoom", function (req, res) {
    userInfo.findOne({
        roomID: req.body.roomID
    }, async function (err, doc) {
        if (doc == null) {
            res.send("NO PAGE!");
            return;
        }else{
            var userName = req.body.Username;
            var meetingTitle = req.body.meetingTitle;
            var owner = false;
            const newUserInfo = new userInfo({
                userName: userName,
                roomID: req.body.roomID,
                meetingTitle: meetingTitle,
                creator: owner
            })
            newUserInfo.save();
            res.redirect('/' + req.body.roomID + '?username=' + userName);
        }
    })
})

app.get("/:roomID", function (req, res) {
    var roomID = 0000;
    var meetingTitle;
    if (req.params.roomID !== 'favicon.ico') {
        roomID = req.params['roomID'];
    }


    userInfo.findOne({
        roomID: roomID
    }, async function (err, doc) {
        if (err) {
            console.log("ERROR!!!!")
            res.send("DB ERROR!");
        } else {
            if (doc != null) {
                meetingTitle = doc.meetingTitle;
                res.render('roomChat', {
                    roomID: roomID,
                    meetingTitle: meetingTitle
                })
            } else {
                res.status(400).send('Error message');
            }
        }
    })
})

server.listen(port);


io.on("connection", socket => {
    socket.on("new-user", (roomID, name) => {
        socket.join(roomID);
        console.log(roomID+" in connection");
        if(rooms[roomID]==null){
            rooms[roomID] = {
                currentOnlineUsers: {}
            }
        }
        rooms[roomID].currentOnlineUsers[socket.id] = name
        socket.to(roomID).emit("user-join-info", name)
    })
    socket.on("send-chat-message", (roomID, data) => {
        if(rooms[roomID]==null){
            rooms[roomID] = {
                currentOnlineUsers: {}
            }
        }
        socket.to(roomID).emit("chat-message", {
            message: data,
            name: rooms[roomID].currentOnlineUsers[socket.id]
        })
    })
    socket.on("disconnect", () => {
        getUserRooms(socket).forEach(roomID => {
            socket.broadcast.to(roomID).emit("user-disconnected", rooms[roomID].currentOnlineUsers[socket.id])
            delete rooms[roomID].currentOnlineUsers[socket.id]
        });
    })
})

function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, roomID]) => {
        if (roomID.currentOnlineUsers[socket.id] != null) {
            names.push(name);
        }
        return names;
    }, [])
}