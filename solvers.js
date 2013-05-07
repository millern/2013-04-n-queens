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

//data structure can be [0 0 1] instead of the whole board...[0 1 2] represents a solution

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
        if (checkRookSolution(n, board)){
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
        if (checkRookSolution(n, board)){
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
        if (checkQueenSolution(n, board)){
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

  console.log('Single solution for ' + n + ' queens:', solution[0]);
  if (!solution[0]){
    solution[0] = makeArrayOf(makeArrayOf(0,n),n);
  }
  return solution[0];
};

window.countNQueensSolutions = function(n){
  var startTime = new Date();
  if (n===0){return 1;} //0 queens fit on a 0x0 board 1 time
  var solutionCount = 0;

  var rNQueens = function(tempBoard){
    var board = tempBoard.slice(0);
    for (var i = 0; i < n; i++) {
      if(i !== 0){board.pop();}
      var row = makeArrayOf(0,n);
      row[i]=1;
      board.push(row);
      if(!checkQueenSolution(board.length, board)){continue;}
      if (board.length === n){
        checkQueenSolution(n, board) && solutionCount++;
        i === (n-1) && board.pop();
      } else {
        rNQueens(board);
      }
    }
  };
  rNQueens([]);
  var endTime = new Date();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount, 'in', endTime - startTime, 'milliseconds');
  return solutionCount;
};

window.checkRookSolution = function(n, matrix) {
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
};

window.checkQueenSolution = function(n, matrix) {
  if(!checkRookSolution(n, matrix)){
    return false;
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
  //check for minor diagonal conflicts
  for (i = 1; i < n*2-2; i++){
    var counter3 = 0;
    for(var l = 0; l < n; l++) {
      if(matrix[l][i-l]===1){
        counter3++;
        if (counter3 > 1){
          return false;
        }
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
