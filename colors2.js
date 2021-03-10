let textarea = $('textarea')[0];
let selected = {red: 100, green: 100, blue: 100};
let state2 = 0;

$('#red').slider({
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

$('#green').slider({
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

$('#blue').slider({
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
	if (state2) {
		el.style[state2] = 'rgb( ' + obj.red + ', ' + obj.green + ', ' + obj.blue + ' )';
	} else {
		console.log('not selected');
	}
}
