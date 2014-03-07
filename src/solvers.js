/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });

  var rowPos = _.range(n);
  var colPos = _.range(n);

  for(var i = n - 1; i >= 0; i--){
    var rowPosRand = Math.floor(i * Math.random());
    var colPosRand = Math.floor(i * Math.random());
    var x = rowPos.splice(rowPosRand,1)[0];
    var y = colPos.splice(colPosRand,1)[0];
    solution[x][y] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var sets = [];
  var recurseRook = function(n, array) {
    for (var i = 0; i < n; i++) {
      if (array[0] !== undefined && i === array[0]) {
        continue;
      }
      if (array[1] !== undefined && i === array[1]) {
        continue;
      }
      array.push(i);
      if (array.length === n) {
        if ((_.uniq(array)).length === n) {
          sets.push(array.slice());
        }
      }
      else {
        recurseRook(n, array);
      }
      array.pop();
    }
  };

  recurseRook(n, []);
  console.log('Number of solutions for ' + n + ' rooks:', sets.length);
  return sets.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // Generates solution board
  var solution = _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return -1;
    });
  });

  //marks dead spots by puttin in 0
  var minusOneInput = function(x,y) {
    var major = y - x;
    var minor = x + y;
    for(var i = 0; i < n ; i++){
      solution[x][i] = 0;
      solution[i][y] = 0;
      if ((solution[i][major + i] !== undefined)) {
        solution[i][major + i] = 0;
      }
      if ((solution[i][minor - i] !== undefined)) {
        solution[i][minor - i] = 0;
      }
    }
    solution[x][y] = 1;
  };

  //space for queens
  var findEmptySpace = function(arr){
    _.each(arr, function(item, index){
      _.each(item, function(subItem, subIndex){
        if(subItem === -1){
          minusOneInput(index, subIndex);
        }
          });
    });
  };

  findEmptySpace(solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  // // Log time for solution
  // var time = new Date();
  // time = time.getTime();

  // var solutionCount = 0; //fixme

  // if ((n === 0)) {
  //   return 1;
  // }

  // // Generate board
  // var solution = _(_.range(n)).map(function() {
  //   return _(_.range(n)).map(function() {
  //     return 0;
  //   });
  // });

  // // Increment attackable spaces
  // var addQueen = function(x,y) {
  //   var major = y - x;
  //   var minor = x + y;
  //   for(var i = 0; i < n ; i++){
  //     solution[x][i]++;
  //     solution[i][y]++;
  //     if ((solution[i][major + i] !== undefined)) {
  //       solution[i][major + i]++;
  //     }
  //     if ((solution[i][minor - i] !== undefined)) {
  //       solution[i][minor - i]++;
  //     }
  //   }
  //   solution[x][y] = 'x';
  // };

  // // Decrement attackable spaces
  // var removeQueen = function(x,y) {
  //   var major = y - x;
  //   var minor = x + y;
  //   for(var i = 0; i < n ; i++){
  //     solution[x][i]--;
  //     solution[i][y]--;
  //     if ((solution[i][major + i] !== undefined)) {
  //       solution[i][major + i]--;
  //     }
  //     if ((solution[i][minor - i] !== undefined)) {
  //       solution[i][minor - i]--;
  //     }
  //   }
  //   solution[x][y] = 0;
  // };

  // // Recursion through possibility tree
  // var recurse = function(rowId) {
  //   for (var i = 0; i < n; i++) {
  //     if (solution[rowId][i] === 0) {
  //       addQueen(rowId, i);
  //       if (rowId === n - 1) {
  //         solutionCount++;
  //       } else {
  //         recurse(rowId + 1);
  //       }
  //       removeQueen(rowId, i);
  //     }
  //   }
  // };

  // recurse(0);

  // // Resulting time for solution
  // var time2 = new Date();
  // time2 = time2.getTime();
  // console.log(time2 - time);

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;

  var solutionCount = 0; //fixme

  var columns = 0, majors = 0, minors = 0;
  var recurse = function(rowId) {
    var row = columns | majors | minors;
    for(var i = n-1; i >= 0; i--){
      if(!!(row & (1 << i))){
        columns = columns | (1 << i);
        majors = majors | (1 << i);
        minors = minors | (1 << i);
      }
      if (rowId === n - 1) {
        solutionCount++;
      } else {
        majors = majors >> 1;
        minors = minors << 1;
        rowId++;
        recurse(rowId);
      }
      // removeQueen(rowId, i);
    }
  };

  recurse(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;

};
