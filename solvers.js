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
    for(var i = 0; i< n; i++){
      var counter = 0;
      for (var j = 0; j<n; j++){
        if(matrix[j][i]===1){
          counter++;
          if (counter > 1){
            return false;
          }
        }
      }
    }
    return true;
  }
  console.log('Single solution for ' + n + ' rooks:', solution[0]);
  return solution[0];
};


window.countNRooksSolutions = function(n){
  if (n===0){
    return 1;
  }
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
    for(var i = 0; i< n; i++){
      var counter = 0;
      for (var j = 0; j<n; j++){
        if(matrix[j][i]===1){
          counter++;
          if (counter > 1){
            return false;
          }
        }
      }
    }
    return true;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = [];
  var rNQueens = function(temp){
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
        rNQueens(board);
      }
    }
  };
  rNQueens([]);
  function checkSolution(matrix) {
    //check for column conflicts
    for(var i = 0; i< n; i++){
      var counter = 0;
      for (var j = 0; j<n; j++){
        if(matrix[j][i]===1){
          counter++;
          if (counter > 1){
            return false;
          }
        }
      }
    }
    //check for major diagonal conflicts
    for (i = 1-n; i < n-1; i++){
      var counter2 = 0;
      for(var k = 0; k < n; k++) {
        if(matrix[k][i+k]===1){
          counter2++;
          if (counter2 > 1){
            return false;
          }
        }
      }
    }

    //else return true
    return true;
  }

  console.log('Single solution for ' + n + ' queens:', solution[0]);
  return solution[0];
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
