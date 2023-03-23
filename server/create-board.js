const createPlayingBoard = (rows, columns) => {
  // two-dimensional arrays filled with nulls
  let boardPlayerOne;
  let boardPlayerTwo;

  const clear = () => {
    for(let i = 0; i < rows; i++)
    {
      for(let j = 0; j < columns; j++)
      {
        //boardPlayerOne[i][j] = { Taken: false};
        //boardPlayerTwo[i][j] = { Taken: false};
      }
    }
  };

  const checkForWin = (rows, columns, board) => {
  
  }

  const getBoard = () => boardPlayerOne;

  clear();
};

module.exports = createPlayingBoard;