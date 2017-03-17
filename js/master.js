(function() {


console.log("SEAF working");


var images = [document.querySelector('#F55'), document.querySelector('#F56'), document.querySelector('#R58')],
carname = document.querySelector('.modelName'),
price = document.querySelector('.priceInfo'),
details = document.querySelector('.modelDetails'),
httpRequest;

//I added these functions for the purpose of having a default option load immediately. It makes the site look less... unfinished. Pardon my clutter.

function loaddefault(){

requestdefault();
populatedefaults();

}

function requestdefault(){

httpRequest = new XMLHttpRequest();

if(!httpRequest){

console.log("Your browser cannot handle AJAX. Get a better browser you scrub.");
return false;

}

httpRequest.onreadystatechange = populatedefaults;
httpRequest.open('GET', 'includes/ajaxQuery.php' + '?model=' + "F55");
httpRequest.send();

}

function populatedefaults(){

if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){

var carInfo = JSON.parse(httpRequest.responseText);
carname.firstChild.nodeValue = carInfo.modelName;
price.firstChild.nodeValue = carInfo.pricing;
details.firstChild.nodeValue = carInfo.modelDetails;


}

}

//Here is the main function that dynamically populates the container on click.

function request(){

httpRequest = new XMLHttpRequest();

if(!httpRequest){

console.log("Your browser cannot handle AJAX. Get a better browser you scrub.");
return false;

}

httpRequest.onreadystatechange = updatecarinfo;
httpRequest.open('GET', 'includes/ajaxQuery.php' + '?model=' + this.id);
httpRequest.send();

}

function updatecarinfo(){

if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){

var carInfo = JSON.parse(httpRequest.responseText);
carname.firstChild.nodeValue = carInfo.modelName;
price.firstChild.nodeValue = carInfo.pricing;
details.firstChild.nodeValue = carInfo.modelDetails;

//console.log("update working");

}

}

window.addEventListener('load', loaddefault, false);

[].forEach.call(images, function(img) {
	//console.log("listener working");
	img.addEventListener('click', request, false);
});



})();

//I attempted to use the jQuery version. However, the browser is struggling to parse the jQuery file. I am not sure if the problem is with my code, or jQuery itself.


/*(function() {

	$('#cars img').on('click', function() {

		$.getJSON('includes/ajaxQuery.php', { model : this.id }, function(carInfo){

			$('.modelName').text(carInfo.modelName);

			$('.priceInfo').text(carInfo.pricing);

			$('.modelDetails').text(carInfo.modelDetails);
			
		});

	});
	
})();*/
