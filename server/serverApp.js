// The use strict mode changes previously accepted "bad syntax" into real errors.
'use strict'

const http               = require('http');
const express            = require('express');
const randomColor        = require('randomcolor');
const socketio           = require('socket.io');
const createPlayingBoard = require('./create-board');
const port               = 3000;

let playerOne = null;
let playerTwo = null;

let play = false;

const app = express();
const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);

// TODO: The game starts with player 1. Player 1 will make the first selection.
// TODO: client needs to send server the current player or
// TODO: the server needs to let "All" the clients know which player's turn it is to make a selection
// TODO: Server needs to keep track of circles selected
// TODO: Server needs to keep track of who owns the selected circles
// TODO: Server can check each users selections for a winning combination
// TODO: Need the client to let the server know who is the current player
// TODO: The server may need to verifiy the current player

// Function called after each player selection to check for a winning combination
function checkForWinner()
{

}

io.on('connection', (sock) => {
  //const color = randomColor();
  const color = 'orange';
        // TODO: set current player turn to player 2
        //io.emit('turn', { x, y, color });

        // TODO send player selection array to check for a winning array entry
  
        // TODO: If player wins, send message and restart game
        // if (playerWin) {
        //   sock.emit('message', 'You wing the game!!');
        //   io.emit('message', 'New Game');
        //   clear();
        //   io.emit('board');
        // }
  
    sock.on('message', (text) => io.emit('message', text));
    sock.on('player1', (text) => io.emit('player1', text));
    sock.on('player2', (text) => io.emit('player2', text));
    sock.on('playButton', () => io.emit('playButton', ));
    //sock.on('player-selection', (board) => io.emit(loadGame))

    //sock.emit('board', getBoard());
  });

server.on('error', (err) => {
    console.error('Server error: ', err);
});

server.listen(port, () => {
    console.log(`Server is started and listening on port ${port}`);
});