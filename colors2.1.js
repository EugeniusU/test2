let textarea = $('textarea')[0];
let selected = {red: 100, green: 100, blue: 100};
let state2 = 0;


$('.colors > div').slider({
	min: 0,
	max: 255,
	animate: 'slow',
	range: 'min',
	value: 100,
	change: function(event, ui) {
		updateValue(event, ui, selected);
		colorize(selected, textarea);
	}
});

function updateValue(event, ui, obj) {
	let key = event.target.id;
	let value = ui.value;
	obj[key] = value;
}

$('#color').on('click', function() {
	state2 = 'color';
});

$('#backgroundColor').on('click', function() {	
	state2 = 'backgroundColor';	
});

function colorize(obj, el) {
	let keys = Object.keys(obj);
	let array = keys.map(k => {
		return obj[k].toString(16);
	});
	let str = array.join('');
	if (state2) {
		el.style[state2] = '#' + str;
	} else {
		console.log('not selected');
	}
}
