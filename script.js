var sabers = [{"name": "Anakin's Lightsaber", "price": 3.99, "imgsrc": "images/lightsabers/anakin.png"}, {"name": "Count Dooku's Lightsaber", "price": 4.99, "imgsrc": "images/lightsabers/dooku.png"}, {"name": "Luke's Lightsaber", "price": 4.69, "imgsrc": "images/lightsabers/luke.png"}, {"name": "Obi-Wan's Lightsaber", "price": 3.39, "imgsrc": "images/lightsabers/obiwan.png"}, {"name": "Kylo Ren's Lightsaber", "price": 6.99, "imgsrc": "images/lightsabers/ren.png"}, {"name": "Darth Vader's Lightsaber", "price": 3.99, "imgsrc": "images/lightsabers/vader.png"}, {"name": "Mace Windu's Lightsaber", "price": 4.99, "imgsrc": "images/lightsabers/windu.png"}], blasters = [{"name": "Han Solo's Blaster", "price": 5.99, "imgsrc": "images/blasters/han.png"}, {"name": "Stormtrooper's Blaster", "price": 4.69, "imgsrc": "images/blasters/stormtrooper.png"}];

var cart = [];
function cartTotal () {
 var length = cart.length;
 if(length>0) {
  var total = 0;
  for(var i = 0; i<length; i++) {
   total+=cart[i].price;
  }
  return total.toFixed(2);
 } else return '0.00';
};

function loadItems(items) {
 $('.shop').html('');
 var html = '', i, item;
 if(items[0].name == sabers[0].name) item = 0;
 else item = 1;
 html += '<tr class="row">';
 for (i = 0; i < items.length; i += 1) {
  if (i % 3 == 0&&i!=0) {
   html += '<tr>';
   html += '<tr class="row">';
  }
  html += '<td class="item" onclick="openItem('+i+', '+item+')"><img src="' + items[i].imgsrc + '"/><h3 class="name">' + items[i].name + '</h3><h4 class="price">$' + items[i].price + '</h4>';
 }
 html += '</tr>';
 $('.shop').html(html);
}

function loadCart() {
 $('.shop').html('');
 var html = '', i;
 html += '<tr class="row">';
 for (i = 0; i < cart.length; i += 1) {
  if (i % 3 == 0&&i!=0) {
   html += '<tr>';
   html += '<tr class="row">';
  }
  html += '<td class="item" onclick="openCartItem('+i+')"><img src="' + cart[i].imgsrc + '"/><h3 class="name">' + cart[i].name + '</h3><h4 class="price">$' + cart[i].price + '</h4>';
 }
 html += '</tr>';
 $('.shop').html(html);
}

function setNav(tab) {
 switch (tab) {
  case 2:
   $('#nav').html('<li></li><li class="navitem" id="tab1"><h2 class="title">Lightsabers</h2></div></li><li class="navitem" id="tab2"><h2 class="title">Blasters</h2><div class="selected"></li><li class="navitem" id="tab3"><h2 class="left">Cart</h2><h3 class="right" id="total">$'+cartTotal()+'</h3></li><li></li>');
   loadItems(blasters);
   break;
  case 3:
   $('#nav').html('<li></li><li class="navitem" id="tab1"><h2 class="title">Lightsabers</h2></li><li class="navitem" id="tab2"><h2 class="title">Blasters</h2></li><li class="navitem" id="tab3"><h2 class="left">Cart</h2><h3 class="right" id="total">$'+cartTotal()+'</h3><div class="selected"></div></li><li></li>');
   loadCart();
   break;
  default:
   $('#nav').html('<li></li><li class="navitem" id="tab1"><h2 class="title">Lightsabers</h2><div class="selected"></div></li><li class="navitem" id="tab2"><h2 class="title">Blasters</h2></li><li class="navitem" id="tab3"><h2 class="left">Cart</h2><h3 class="right" id="total">$'+cartTotal()+'</h3></li><li></li>');
   loadItems(sabers);
 }
}

$("body").on("click", "#tab1", function () {
 setNav(1);
});
$("body").on("click", "#tab2", function () {
 setNav(2);
});
$("body").on("click", "#tab3", function () {
 setNav(3);
});

function replace(string, f, r) {
 var newStr = '';
 for(var i = 0; i < string.length; i++) {
  if(string.substring(i, i+1)==f) newStr += r;
  else newStr += string.substring(i, i+1);
 }
 return newStr;
}

function addToCart (name, price, imgsrc) {
 var product = {"name": replace(name, '_', "'"), "price": Math.round(price*100)/100, "imgsrc": imgsrc};
 cart.push(product);
 $('#total').html('$'+cartTotal());
}
function removeFromCart (i) {
 cart.splice(i,1); 
 setNav(3);
}

function openItem(i, item) {
 var product;
 if(item == 0) product = sabers[i];
 else product = blasters[i];
 $('#window').html('<div id="popup" onclick="exitItem()"><div id="item"><img src="'+product.imgsrc+'"/><div class="text"><h3 class="details">'+product.name+'</h3><h4 class="details">$'+product.price+'</h4></div><div id="addtocart" onclick="addToCart('+"'"+replace(product.name, "'", '_')+"',"+product.price+",'"+product.imgsrc+"'"+')">Add To Cart</div></div></div>');
}

function openCartItem(i) {
 var product = cart[i];
 $('#window').html('<div id="popup" onclick="exitItem()"><div id="item"><img src="'+product.imgsrc+'"/><div class="text"><h3 class="details">'+product.name+'</h3><h4 class="details">$'+product.price+'</h4></div><div id="addtocart" onclick="removeFromCart('+i+')">Remove From Cart</div></div></div>');
}

function exitItem() {
 $('#window').html('');
}

$(function () {
 setNav(1);
});