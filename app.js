const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const app = express()
var http = require('http').createServer(app)
const PORT = process.env.PORT
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
    }
})
const db = require('./config/db')

const userRoutes = require('./routes/userRoutes')
const subjectRoutes = require('./routes/subjectRoutes')
const profileRoutes = require('./routes/profileRoutes')
const educationRoutes = require('./routes/educationRoutes')
const reportRoutes = require('./routes/reportRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const aboutRoutes = require('./routes/aboutRoutes')
const scheduleRoutes = require('./routes/scheduleRoutes')
const quizRoutes = require('./routes/quizRoutes')
const questionRoutes = require('./routes/questionRoutes')
const choiceRoutes = require('./routes/choiceRoutes')
const messageRoutes = require('./routes/messageRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const verifyRoutes=require('./routes/verifyRoutes')
const paymentRoutes=require('./routes/paymentRoutes')
const User=require('./models/User')
const Schedule=require('./models/Schedule')
const Review=require('./models/Review')
const Payment = require("./models/Payment")

app.use(express.json())
app.use('/images', express.static('images'));
app.use('/files', express.static('files'));

app.use(cors())
app.use('/api', userRoutes)
app.use('/api', subjectRoutes)
app.use('/api', profileRoutes)
app.use('/api', educationRoutes)
app.use('/api', reportRoutes)
app.use('/api', reviewRoutes)
app.use('/api', aboutRoutes)
app.use('/api', scheduleRoutes)
app.use('/api', quizRoutes)
app.use('/api', questionRoutes)
app.use('/api', choiceRoutes)
app.use('/api', messageRoutes)
app.use('/api', conversationRoutes)
app.use('/api',verifyRoutes)
app.use('/api',paymentRoutes)

Review.belongsTo(User, {
    foreignKey: 'studentId',
    as:"Student"
})
Review.belongsTo(User, {
    foreignKey: 'tutorId',
    as:"Tutor"
})

Payment.belongsTo(User, {
    foreignKey: 'senderId',
    as:"Sender"
})
Payment.belongsTo(User, {
    foreignKey: 'recieverId',
    as:"Reciever"
})
Schedule.hasOne(Payment)

Schedule.belongsTo(User, {
    foreignKey: 'studentId',
    as:"StudentId"
})
Schedule.belongsTo(User, {
    foreignKey: 'tutorId',
    as:"TutorId"
})

db.sync().then(result => {
    if (result) {
        http.listen(PORT || 5000, () => {
            console.log('app started at port:', PORT);
        });
        // io.on('connection', (socket) => {
        //     console.log('new client connected');

        //     let users = [];

        //     const addUser = (userId, socketId) => {
        //         !users.some((user) => user.userId === userId) &&
        //             users.push({ userId:userId, socketId:socketId });
        //             console.log(users)
        //     };

        //     const getUser = (userId) => {
        //         console.log(users)
        //         // for(var i=0;i<users.length;i++){
        //         //     console.log(users[i])
        //         // }
        //         return users.find((user) => user.userId === userId);
        //     };
        //     const removeUser = (socketId) => {
        //         users = users.filter((user) => user.socketId !== socketId);
        //     };
        //     socket.on("addUser", (userId) => {
        //         // console.log("user id"+userId+socket.id)
        //         addUser(userId, socket.id);
        //         io.emit("getUsers", users);
        //       });
            
        //       //send and get message
        //       socket.on("sendMessage", ({ senderId, recieverId, text }) => {
        //         const user = getUser(recieverId);
        //         console.log(user)
        //         if(user){
        //             io.to(user.socketId).emit("getMessage", {
        //                 senderId,
        //                 text,
        //               });
        //         }else{
        //             console.log(users)
        //         }
        //       });
            
        //       //when disconnect
        //       socket.on("disconnect", () => {
        //         console.log("a user disconnected!");
        //         removeUser(socket.id);
        //         io.emit("getUsers", users);
        //       });
        // });
    } else {
        console.log("Database not connected!")
    }
}).catch(error => {
    console.log(error);
});

