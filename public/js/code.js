// Get the container element
//var pricebox = document.getElementById("price");

// Get all buttons with class="btn" inside the container
var boxs = document.getElementsByClassName("coll");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < boxs.length; i++) {


  boxs[i].addEventListener("click", function() {
    let price = this.children[1].innerHTML;
    let product = this.children[0].innerHTML;
    console.log(product);
    document.getElementById("price").value = price;
    document.getElementById("product").value = product;
  });
}