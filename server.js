const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const petsRoutes = require('./routes/ShelterRoutes');
require('dotenv').config();
require('./config/database');

const app = express();


app.use(cors({
    origin: 'https://frontend-deploy-self.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.use('/api/pets', petsRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'https://frontend-deploy-self.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('petAdopted', (adoptedPet) => {
        io.emit('pet_adopted', adoptedPet);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.set('io', io);

