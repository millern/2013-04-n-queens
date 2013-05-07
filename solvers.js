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
//make a custom testing solution
//data structure can be [0 0 1] instead of the whole board...[0 1 2] represents a solution
//short circut the for loops

window.findNRooksSolution = function(n){
  var solution = [];
  var rRookRowPlacer = function(temp){
    var board = temp.slice(0);
    for (var i = 0; i < n; i++) {
      if (solution[0]){
        break;
      }
      if(i !== 0){
        board.pop();
      }
      var row = window.makeArrayOf(0,n);
      row[i]=1;
      board.push(row);
      if (board.length === n){
        if (checkSolution(board)){
          solution.push(board.slice(0));
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


window.countNRooksSolutions = function(n){
  var solutionCount = 0;
  var solution = [];
  var rRookRowPlacer = function(temp){
    var board = temp.slice(0);
    for (var i = 0; i < n; i++) {
      if(i !== 0){
        board.pop();
      }
      var row = window.makeArrayOf(0,n);
      row[i]=1;
      board.push(row);
      if (board.length === n){
        if (checkSolution(board)){
          solution.push(board.slice(0));
          solutionCount++;
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
