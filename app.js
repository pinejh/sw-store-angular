var storeApp = angular.module('storeApp', []);

storeApp.controller('storeCtrl', function storeCtrl($scope) {
 $scope.saberRows = function () {
  var row = [], data = [], i;
  for (i = 0; i < sabers.length; i += 1) {
   if (i % 3 === 0 && i !== 0) {
    row.push([data[0], data[1], data[2]]);
    data.splice(0, data.length);
   }
   data.push(sabers[i]);
   if (i === sabers.length - 1) {
    if (data[1] == undefined) row.push([data[0]]);
    else if (data[2] == undefined) row.push([data[0], data[1]])
    else row.push([data[0], data[1], data[2]]);
   }
  }
  $scope.rows = row;
 };
 $scope.rows = [];
});