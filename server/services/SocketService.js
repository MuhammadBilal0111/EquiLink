const { getIO, getUsers } = require("../utils/socket");

class SocketService {
  on(event, callback) {
    const io = getIO();
    io.on(event, callback);
  }

  emit(event, data, userId = null) {
    const io = getIO();
    if (userId) {
      const connectedUsers = getUsers();
      const socketId = connectedUsers && connectedUsers[userId]?.toString();
      io.to(socketId).emit(event, data);
      return;
    }
    io.emit(event, data);
  }
}

module.exports = new SocketService();
