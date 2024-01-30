const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const cors = require('cors');
const router = require('./routes/index');
const connectDb = require('./database');
const { saveMessage, saveJoinMessages } = require('./services/chatservice');
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,PATCH',
};
app.use(cors(corsOptions));
app.use(express.json());
require('dotenv').config();


io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat messages
  socket.on('message', async (data) => {
    const { from, to, message } = data
    const messageResponse = await saveMessage(from, to, message)
    console.log("got response")
    io.emit('recieve_message', messageResponse.data.pop()); // Broadcast the message to all connected clients
  });

  socket.on("join_room", (roomId) => {
    console.log("🚀 ~ socket.on ~ roomId: join room", roomId)
    socket.join(roomId)

  })

  socket.on('room_message', async (data) => {
    const { user, message, room } = data
    const updatedMessage = await saveJoinMessages(user, message, room)
    console.log("got response")
    io.to(room).emit("recieve_messages", { newMessages: updatedMessage?.messages?.pop() })
  })
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const dbConnection = async () => {
  console.log('connecting db');
  await connectDb()
    .then(() => console.log('connected'))
    .catch((err) => console.log('error connecting db', err));
};
dbConnection();

app.get('/', (req, res) => {
  console.log('hello ');
  res.send('Welcome Home');
});

app.use('/api', router);

server.listen(3001, () => {
  console.log('Server is listening to 3001');
});
