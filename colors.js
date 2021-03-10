
let inputs = document.querySelectorAll('input');
let inputsArr = Array.prototype.slice.call(inputs, 0);

let stateColor = false;
let stateBackgroundColor = false;

let color = document.querySelector('#color');
let backgroundColor = document.querySelector('#backgroundColor');
let textarea = document.querySelector('textarea');

color.onclick = function() {
	if (!stateColor) {
		stateColor = true;
	} else {
		stateColor = false;
	}
	console.log(stateColor);
};

backgroundColor.onclick = function() {
	if (!stateBackgroundColor) {
		stateBackgroundColor = true;
	} else {
		stateBackgroundColor = false;
	}
//	console.log(stateBackgroundColor);
};

let obj = {red: 50, green: 50, blue: 50};

inputsArr.forEach(input => {
	input.addEventListener('change', event => {
		let key = event.target.id;
		let value = event.target.value;
		obj[key] = value;
		if (stateColor) {		
			textarea.style.color = 'rgb(' + obj.red + ', ' + obj.green + ', ' + obj.blue + ')'; 
		} else if (stateBackgroundColor) {		
			textarea.style.background = 'rgb(' + obj.red + ', ' + obj.green + ', ' + obj.blue + ')'; 
		}
//		console.log(textarea.style.color);
//		console.log(textarea.style.background);
	});
});
