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
  // if (n === 1) return n;
  // return n * countNRooksSolutions(n - 1);
  // var solution = _(_.range(n)).map(function() {
  //   return _(_.range(n)).map(function() {
  //     return 0;
  //   });
  // });

  // var sets2 = [];
  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     if (j !== i) {
  //       for (var k = 0; k < n; k++) {
  //         if (k !== j && k !== i) {
  //           sets2.push([i, j, k]);
  //         }
  //       }
  //     }
  //   }
  // }

  var sets = [];
  var recurseRook = function(n, array) {
    for (var i = 0; i < n; i++) {
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

  // var orderSrc = _.range(size);
  // var order;

  // var orderGen = function(){
  //   if(order.length !== size){
  //     orderGen();
  //   }else{
  //     return result;
  //   }
  // };

  // _.each(solution, function(item, index){
  //   item[index] = 1;
  // });

  // for(var i = 0; i < order.length; i++){
  //   var arr = order[i];
  //   _.each(arr, function(rows, index){
  //     var result = [];
  //     result.push(rows[arr[index]]);
  //   });
  // }
  recurseRook(n, []);
  var solutionCount = undefined; //fixme
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return sets.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var recurse = function(n, ) {
  // };
  var solution = _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });


  // put -1 in every value of row col major minor diagonal except 1

  var minusOneInput = function(x,y) {
    var major = x - y;
    var minor = x + y;
    for(var i = 0; i < n ; i++){
      solution[x][i] = -1;
      solution[i][y] = -1;
      if ((solution[i][major + i] !== undefined)) {
        solution[i][major + i] = -1;
      }
      if ((solution[i][minor - i] !== undefined)) {
        solution[i][minor - i] = -1;
      }
    }
    solution[x][y] = 1;
  };

  // put 1 in empty space

  var findEmptySpace = function(arr){
    _.each(arr, function(item, index){
      _.each(item, function(subItem, subIndex){
        if(subItem === 0){
          minusOneInput(index, subIndex);
        }
      });
    });
  };








  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
