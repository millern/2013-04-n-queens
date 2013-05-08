// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = [];
  var startTime = new Date();
  if (n===0){return 1;} //0 queens fit on a 0x0 board 1 time
  var rNRooks = function(tempBoard){
    if(tempBoard.length === n){
      if (checkRookSolution(tempBoard)){
        solution.push(tempBoard.concat());
      }
      return;
    }
    for(var i = 0; i < n; i++){
      var boardCheck = tempBoard.concat(i);
      if (checkRookSolution(boardCheck)){
        rNRooks(boardCheck);
      } else {
        continue;
      }
    }
  };
  rNRooks([]);

  console.log('Single solution for ' + n + ' rooks:', solution[0]);
  return solution[0];
};


window.countNRooksSolutions = function(n){
  var startTime = new Date();
  if (n===0){return 1;} //0 queens fit on a 0x0 board 1 time
  var solutionCount = 0;
  var rNRooks = function(tempBoard){
    if(tempBoard.length === n){
      checkRookSolution(tempBoard) && solutionCount++;
      return;
    }
    for(var i = 0; i < n; i++){
      var boardCheck = tempBoard.concat(i);
      if (checkRookSolution(boardCheck)){
        rNRooks(boardCheck);
      } else {
        continue;
      }
    }
  };
  rNRooks([]);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = [];
  var startTime = new Date();
  if (n===0){return 1;} //0 queens fit on a 0x0 board 1 time
  var rNQueens = function(tempBoard){
    if(tempBoard.length === n){
      if (checkQueenSolution(tempBoard)){
        solution.push(tempBoard.concat());
      }
      return;
    }
    for(var i = 0; i < n; i++){
      var boardCheck = tempBoard.concat(i);
      if (checkQueenSolution(boardCheck)){
        rNQueens(boardCheck);
      } else {
        continue;
      }
    }
  };
  rNQueens([]);
  var endTime = new Date();
  console.log('Single solution for ' + n + ' queens:', solution[0]);
  if (!solution[0]){
    solution[0] = [0];
  }
  return solution[0];
};

window.countNQueensSolutions = function(n){
  var startTime = new Date();
  if (n===0){return 1;} //0 queens fit on a 0x0 board 1 time
  var solutionCount = 0;
  var rNQueens = function(tempBoard){
    if(tempBoard.length === n){
      checkQueenSolution(tempBoard) && solutionCount++;
      return;
    }
    for(var i = 0; i < n; i++){
      var boardCheck = tempBoard.concat(i);
      if (checkQueenSolution(boardCheck)){
        rNQueens(boardCheck);
      } else {
        continue;
      }
    }
  };
  rNQueens([]);
  var endTime = new Date();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount, 'in', endTime - startTime, 'milliseconds');
  return solutionCount;
};

window.checkRookSolution = function(matrix) {
  return _.uniq(matrix).length !== matrix.length ? false : true;
};

window.checkQueenSolution = function(matrix) {
  if(!checkRookSolution(matrix)){
    return false;
  }
  for(var i = 0; i < matrix.length; i++){
    for(var j = i+1; j < matrix.length; j++){
      if(i - j === matrix[i] - matrix[j] || i - j === -matrix[i] + matrix[j]){
        return false;
      }
    }
  }
  return true;
};

// This function uses a board visualizer lets you view an interactive version of any piece matrix.
//measuring speed
//new date - new date

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
