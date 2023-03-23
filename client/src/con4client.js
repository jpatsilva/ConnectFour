var playerOne = "one";
var playerTwo = "two";
var currPlayer = playerOne;

var startGame = false;

var gameOver = false;
var board;
var currColumnms;

var rows = 6;
var columns = 7;

// window.onload = function()
// {
//     //loadGame();
// }

function loadGame()
{
    board = [];
    currColumnms = [5, 5, 5, 5, 5, 5, 5];

    for (let row = 0; row < rows; row++)
    {
        let gameRow = [];
        for(let column = 0; column < columns; column++)
        {
            // JavaScript
            gameRow.push(' ');

            // HTML
            let tile = document.createElement("div");
            tile.id = row.toString() + "-" + column.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", placePiece);
            document.getElementById("board").append(tile);
        }
        board.push(gameRow);
    } 
}

function placePiece()
{
    if (startGame == false || gameOver)
    {
        document.getElementById('playing').innerHTML = "You must press the play button to start the game";
        return;
    }
    else
    {
        let coords = this.id.split("-");
        let row = parseInt(coords[0]);
        let column = parseInt(coords[1]);

        row = currColumnms[column];
        if(row < 0)
        {
            return;
        }

        board[row][column] = currPlayer;
        let tile = document.getElementById(row.toString() + "-" + column.toString());
        if(currPlayer == playerOne)
        {
            tile.classList.add("player-One");
            currPlayer = playerTwo;
        }
        else
        {
            tile.classList.add("player-Two")
            currPlayer = playerOne;
        }

        row -= 1;
        currColumnms[column] = row;

        checkForWinner();
        }
    
}

function checkForWinner()
{
    // Horizontal
    for (let row = 0; row < rows; row++)
    {
        for (let column = 0; column < columns - 3; column++)
        {
            if (board[row][column] != ' ')
            {
                if (board[row][column] == board[row][column + 1] && board[row][column + 1] == board[row][column + 2] && board[row][column + 2] == board[row][column + 3])
                {
                    winner(row, column);
                    return;
                }
            }
        }
    }

    // Vertical
    for (let column = 0; column < columns; column++)
    {
        for (let row = 0; row < rows - 3; row++)
        {
            if (board[row][column] != ' ')
            {
                if (board[row][column] == board[row + 1][column] && board[row + 1][column] == board[row + 2][column] && board[row + 2][column] == board[row + 3][column])
                {
                    winner(row, column);
                    return;
                }
            }
        }
    }

    // anti diagonally
    for (let row = 0; row < rows - 3; row++)
    {
        for (let column = 0; column < columns - 3; column++)
        {
            if (board[row][column] != ' ')
            {
                if (board[row][column] == board[row + 1][column + 1] && board[row + 1][column + 1] == board[row + 2][column + 2] && board[row + 2][column + 2] == board[row + 3][column + 3])
                {
                    winner(row, column);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let row = 3; row < rows; row++)
    {
        for (let column = 0; column < columns - 3; column++)
        {
            if (board[row][column] != ' ')
            {
                if(board[row][column] == board[row - 1][column + 1] && board[row - 1][column + 1] == board[row - 2][column + 2] && board[row - 2][column + 2] == board[row - 3][column + 3])
                {
                    winner(row, column);
                    return;
                }
            }
        }
    }

}

function winner(row, column)
{
    let winner = document.getElementById('winner');
    if (board[row][column] == playerOne)
    {
        winner.innerText = "Player One \"Blue\" wins!";
    }
    else
    {
        winner.innerText = "Player Two \"Green\" wins!";
    }

    gameOver = true;
}

const log = (text) => {
    const parent = document.querySelector('#events');
    const el = document.createElement('li');
    el.innerHTML = text;
  
    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
  };

  const player1 = (text) => {
    document.getElementById('player1').innerHTML = "Player One: " + text;
  }

  const player2 = (text) => {
    document.getElementById('player2').innerHTML = "Player Two: " + text;
  }

  const playButton = () => {
    document.getElementById('play').style.backgroundColor = "red";
    document.getElementById('playing').innerHTML = "Begin playing...";

    startGame = true;

    loadGame();

    sock.emit('game-started');
  }

const onChatSubmitted = (sock) => (e) => {
    e.preventDefault();
  
    let input = document.querySelector('#chat');
    let text = input.value;
    input.value = '';
  
    sock.emit('message', text);
  };

  const onPlayer1NameSubmitted = (sock) => (e) => {
    e.preventDefault();
  
    const inputPlayer1 = document.getElementById('fname1');
    playerOne = inputPlayer1.value;
  
    // Set the innter HTML to the current player number one
    document.getElementById('player1').innerHTML = "Player One:  " + playerOne;
  
    sock.emit('player1', playerOne);
  
    inputPlayer1.value = '';
  };
  
  const onPlayer2NameSubmitted = (sock) => (e) => {
    e.preventDefault();
  
    const inputPlayer2 = document.getElementById('fname2');
    playerTwo = inputPlayer2.value;
  
    // Set the innter HTML to the current player number two
    document.getElementById('player2').innerHTML = "Player Two:  " + playerTwo;
  
    sock.emit('player2', playerTwo);
  
    inputPlayer2.value = '';
  };

  const onPlayGameButtonPress = (sock) => (e) => {
    sock.emit('playButton');
  }

(() => {

    const sock = io();
  
    sock.on('message', log);
    sock.on('player1', player1);
    sock.on('player2', player2);
    sock.on('playButton', playButton);
    sock.on('playerSelection', board);
    //sock.on('board', reset);
  
    document
      .querySelector('#chat-form')
      .addEventListener('submit', onChatSubmitted(sock));
  
    document
      .querySelector('#currentPlayer1')
      .addEventListener('submit', onPlayer1NameSubmitted(sock));
  
    document
      .querySelector('#currentPlayer2')
      .addEventListener('submit', onPlayer2NameSubmitted(sock));

    document
    .querySelector('#play')
    .addEventListener('click', onPlayGameButtonPress(sock));
  })();