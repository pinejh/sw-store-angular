var storeApp = angular.module('storeApp', []);

storeApp.controller('storeCtrl', function storeCtrl($scope, $http) {
 $http.get('data.json').success(function(data){
  $scope.sabers = data[0];
  $scope.blasters = data[1];
  $scope.setTab(2);
  $scope.setTab(0);
 });
 $scope.cart = []
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
     $scope.setRows($scope.blasters);
     break;
    case 2:
     $scope.setRows($scope.cart);
     break;
    default:
     $scope.setRows($scope.sabers);
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
  if ($scope.currTab === 0) $scope.cart.push($scope.sabers[index]);
  else if ($scope.currTab === 1) $scope.cart.push($scope.blasters[index]);
  else {
   $scope.cart.splice(index, 1);
   $scope.setRows($scope.cart);
  }
 };
 $scope.openItem = function (index) {
  if($scope.currTab === 0) $scope.currItem = $scope.sabers[index];
  else if($scope.currTab === 1) $scope.currItem = $scope.blasters[index];
  else $scope.currItem = $scope.cart[index];
  $scope.currIndex = index;
 };
 $scope.exitItem = function () {
  $scope.currIndex = -1;
 };
 $scope.cartTotal = function () {
  var total = 0, i;
  for(i = 0; i < $scope.cart.length; i += 1) {
   total += $scope.cart[i].price;
  }
  return total;
 };
});