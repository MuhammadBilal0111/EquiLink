const { Server } = require("socket.io");

// let connectedUsers = new Map();


let connectedUsers = {}

let io = null;

// function initializeSocket(server) {
//   console.log("Initializing Socket.io...");
//   io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//       withCredentials: true,
//     },
//   });

//   io.on("connect", (socket) => {
//     console.log("a user connected with socket ID : ", socket.id);

//     socket.on("user_login", (userId) => {
//       console.log(`User logged in: ${userId} with ${socket.id}`);
//       connectedUsers.set(userId, socket.id);
//       console.log(connectedUsers);
//     });

//     socket.on("user_reconnect", (userId) => {
//       console.log(`User reconnected: ${userId} with ${socket.id}`);
//       connectedUsers.set(userId, socket.id);
//       console.log(connectedUsers);
//     });

//     socket.on("user_logout", (userId) => {
//       console.log(`User logged out: ${userId}`);
//       const isDeleted = connectedUsers.delete(parseInt(userId));
//       console.log(`Deleted: ${isDeleted}`);

//       setTimeout(() => {
//         console.log("Updated Connected Users:", connectedUsers);
//       }, 2000);
//     });
//   });
// }



function initializeSocket(server) {
  console.log("Initializing Socket.io...");
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      withCredentials: true,
    },
  });

  io.on("connect", (socket) => {
    console.log("a user connected with socket ID : ", socket.id);

    socket.on("user_login", (userId) => {
      console.log(`User logged in: ${userId} with ${socket.id}`);
      if (connectedUsers[userId]) {
        connectedUsers[userId] = socket.id;
        console.log(connectedUsers);
        delete connectedUsers[userId];
      }

      connectedUsers[userId] = parseInt(socket.id);
      console.log("updated connectedUsers : ", connectedUsers);

    });

    socket.on("user_reconnect", (userId) => {
      console.log(`User reconnected: ${userId} with ${socket.id}`);
      if (connectedUsers[userId]) {
        console.log("User already connected. Deleting old connection...");
        delete connectedUsers[userId];
      }
  
      connectedUsers[userId] = socket.id;
      console.log("Updated connectedUsers after reconnect :", connectedUsers);
    });

    socket.on("user_logout", (userId) => {
      console.log(`User logged out: ${userId}`);
      delete connectedUsers[userId];
      console.log(connectedUsers);
    });


    socket.on("disconnect", () => {
      console.log("User disconnected with socket ID : ", socket.id);
  
      for (const userId in connectedUsers) {
        if (connectedUsers[userId] === socket.id) {
          delete connectedUsers[userId];
          console.log("Updated connectedUsers after disconnect :", connectedUsers);
          break;
        }
      }
    });

  });
}


function getIO() {
  if (!io) {
    throw new Error(
      "Socket.io is not initialized. Call initializeSocket(server) first."
    );
  }
  return io;
}

function getUsers() {
  if (!connectedUsers) {
    throw new Error(
      "Clients map is not initialized. Ensure the server has called initializeSocket(server)."
    );
  }
  return connectedUsers;
}

module.exports = { initializeSocket, getIO, getUsers };
