// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
window.makeArrayOf = function(value, length) {
  var arr = [], i = length;
  while (i--) {
    arr[i] = value;
  }
  return arr;
};
window.findNRooksSolution = function(n){
  var solution = [];
  //FOR EACH STARTING POSITION IN FIRST ROW
  //CREATE A CHESS BOARD
  //PLACE A ROOK
  //MAKE A RECURSIVE CALL ON THE REST OF THE BOARD
  //IF ROW = N, CHECK FOR CORRECT SOLUTION

  var rRookRowPlacer = function(board){
    for (var i = 0; i < n; i++) {
      if(i !== 0){
        board.pop();
      }
      var row = window.makeArrayOf(0,n);
      row[i]=1;
      board.push(row);
      if (board.length === n){
        console.log(board);
        if (checkSolution(board)){
          if (n === 4){
            debugger;
          };
          solution.push(board.slice(0));
          console.log(board.slice(0));
        }
        if(i == (n-1)){
          board.pop();
        }
      } else {
        rRookRowPlacer(board);
      }
    }
  };
  rRookRowPlacer([]);
  function checkSolution(matrix) {
    var temp = new Board(matrix);
    return ! temp.hasAnyRooksConflicts();
  }
  console.log('Single solution for ' + n + ' rooks:', solution[0]);
  return solution[0];
};
///DEAL WITH THIS LATER


window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
