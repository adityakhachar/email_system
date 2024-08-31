// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const { IamAuthenticator } = require('ibm-watson/auth');
// const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// // Initialize IBM Watson Speech to Text Client
// const speechToText = new SpeechToTextV1({
//   authenticator: new IamAuthenticator({ apikey: 'your-ibm-watson-api-key' }),
//   serviceUrl: 'your-ibm-watson-url',
// });

// const users = {}; // Store user connections

// io.on('connection', (socket) => {
//   console.log('New connection:', socket.id);

//   // Store the socket ID for a user
//   socket.on('join', (userId) => {
//     users[userId] = socket.id;
//     console.log(`${socket.id} joined as ${userId}`);
//   });

//   // Handle connection requests
//   socket.on('request-connection', (data) => {
//     const { targetUserId, message } = data;
//     const targetSocketId = users[targetUserId];

//     if (targetSocketId) {
//       io.to(targetSocketId).emit('connection-request', {
//         fromUser: socket.id,
//         message,
//       });
//     } else {
//       console.log(`User ${targetUserId} not found`);
//     }
//   });

//   // Handle connection responses
//   socket.on('response-connection', (data) => {
//     const { fromUserId, accepted } = data;
//     const targetSocketId = users[fromUserId];

//     if (targetSocketId) {
//       io.to(targetSocketId).emit('connection-response', {
//         fromUser: socket.id,
//         accepted,
//       });
//     }
//   });

//   // Handle WebRTC signaling
//   socket.on('offer', (data) => {
//     const { offer, toUser } = data;
//     const targetSocketId = users[toUser];
//     io.to(targetSocketId).emit('offer', { offer, fromUser: socket.id });
//   });

//   socket.on('answer', (data) => {
//     const { answer, toUser } = data;
//     const targetSocketId = users[toUser];
//     io.to(targetSocketId).emit('answer', { answer, fromUser: socket.id });
//   });

//   socket.on('ice-candidate', (data) => {
//     const { candidate, toUser } = data;
//     const targetSocketId = users[toUser];
//     io.to(targetSocketId).emit('ice-candidate', { candidate, fromUser: socket.id });
//   });

//   // Handle audio data for transcription using IBM Watson Speech to Text
//   socket.on('audio-data', async (data) => {
//     const { audioBlob, toUser } = data;
//     const targetSocketId = users[toUser];

//     if (targetSocketId) {
//       const params = {
//         audio: audioBlob, // Assuming audioBlob is a Buffer
//         contentType: 'audio/webm', // Adjust according to your audio format
//       };

//       try {
//         const response = await speechToText.recognize(params);
//         const transcription = response.result.results
//           .map(result => result.alternatives[0].transcript)
//           .join('\n');

//         io.to(targetSocketId).emit('transcription', {
//           text: transcription,
//           fromUser: socket.id,
//         });
//       } catch (err) {
//         console.error('Speech recognition error:', err);
//       }
//     } else {
//       console.log(`User ${toUser} not found for transcription`);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//     delete users[socket.id];
//   });
// });

// const PORT = 3001;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
