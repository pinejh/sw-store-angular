var storeApp = angular.module('storeApp', []);

storeApp.controller('storeCtrl', function storeCtrl($scope) {
 $scope.setRows = function (items) {
  var row = [], data = [], i;
  for (i = 0; i < items.length; i += 1) {
   if (i % 3 === 0 && i !== 0) {
    row.push([data[0], data[1], data[2]]);
    data.splice(0, data.length);
   }
   data.push(items[i]);
   if (i === items.length - 1) {
    if (data[1] == undefined) row.push([data[0]]);
    else if (data[2] == undefined) row.push([data[0], data[1]])
    else row.push([data[0], data[1], data[2]]);
   }
  }
  $scope.rows = row;
 };
 $scope.rows = [];
 $scope.currTab = 0;
 $scope.setTab = function (tab) {
  if($scope.currTab!==tab) {
   $scope.currTab = tab;
   switch (tab) {
    case 1:
     $scope.setRows(blasters);
     break;
    case 2:
     $scope.setRows(cart);
     break;
    default:
     $scope.setRows(sabers);
   }
  }
 };
 $scope.currIndex = -1;
 $scope.addRemove = function () {
  if($scope.currTab === 2) return 'Remove From Cart';
  else return 'Add To Cart';
 };
 $scope.currItem = {};
 $scope.addToCart = function (index) {
  if ($scope.currTab === 0) cart.push(sabers[index]);
  else if ($scope.currTab === 1) cart.push(blasters[index]);
  else {
   cart.splice(index, 1);
   $scope.setRows(cart);
  }
 };
 $scope.openItem = function (index) {
  if($scope.currTab === 0) $scope.currItem = sabers[index];
  else if($scope.currTab === 1) $scope.currItem = blasters[index];
  else $scope.currItem = cart[index];
  $scope.currIndex = index;
 };
 $scope.exitItem = function () {
  $scope.currIndex = -1;
 };
 $scope.cartTotal = function () {
  var total = 0, i;
  for(i = 0; i < cart.length; i += 1) {
   total += cart[i].price;
  }
  return total;
 };
});