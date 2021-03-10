
let table = document.querySelector('#one');
let textarea = document.querySelector('textarea');

function build(width, height) {
	for (j = 0; j < height; j++) {		
		if (j % 10 == 0) {
			let div = elt('div', 'a' + j);
			if (j != 0) {
				div.className = 'page';
			}
			for (let q = 0; q < height; q = q + 10) {
			let a = elt('a');
			a.href = '#a' + q;
			a.textContent = q;			
			div.appendChild(a);
			}
			table.appendChild(div);
			
		} 
		
		let tr = elt('tr', 'str' + j);
		for (let i = 0; i < width; i++) {
			
			if (j == 0) {
				let th = elt('th', 'str' + j + 'w' + i);				
				th.setAttribute('state', false);
				th.setAttribute('width', i);
				
				tr.appendChild(th);
				let input = elt('input');
				th.appendChild(input);
				applyEventL(input);
			} else {
				let td = elt('td', 'str' + j + 'w' + i);
				tr.appendChild(td);
				let input = elt('input');
				td.appendChild(input);
				td.setAttribute('width', i);
				applyBlur(input);
			}			
		}
		
		table.appendChild(tr);
		
	}
	
	let obj = {width, height};
	return obj;
}

function elt(el, id) {
	let e = document.createElement(el);
	if (id) {
		e.id = id;
	}
	return e;
}

let t = build(5, 100);
//console.log(t);

let els = getEls();
//console.log(els);

function applyEventL(el) {
	el.addEventListener('click', event => {
		let p = event.target.parentNode;
		let state = p.getAttribute('state');
		let width = p.getAttribute('width');
		width = Number(width);
//		console.log('state', state);

		let values = getValues(els);
//		console.log(values);
		let sort =  sorts(values, state, width);
//		console.log(sort);
		change(els, width, sort);

		if (state == 'false') {
			p.setAttribute('state', true);
		} else {
			p.setAttribute('state', false);
		}

//		console.log(p);

		if (textarea.value.length > 0) {
			fieldAndStr(els, textarea.value);
		}

	});
	
}

function applyBlur(el) {	
	el.addEventListener('click', event => {
		let input = event.target;
		input.style.color = 'black';
	});
	
	el.addEventListener('blur', event => {
		fieldAndStr(els, textarea.value);
	});	
}

function getEls() {
	let array = [];	
	let trs = table.querySelectorAll('tr');
	
	for (let i = 0; i < trs.length; i++) {
		let tr = trs[i];
		let els;
		
		if (i == 0) {
			let ths = tr.querySelectorAll('th');
			els = ths;
		} else {
			let tds = tr.querySelectorAll('td');
			els = tds;
		}
		let strEls = [];
		for (let j = 0; j < els.length; j++) {
			let obj = {width: '', height: '', id: '', data: '', state: false,  el: ''};
			obj.width = i;
			obj.height = j;
			obj.id = els[j].id;
			obj.el = els[j];
			strEls.push(obj);
		}
		array.push(strEls);
	}
	
	return array;
}

function sorts(arrays, state, width) {
	let values = [];
	
	for (let i = 1; i < arrays.length; i++) {
		let value = arrays[i][width]
		values.push(Number(value));
	}
	
	s(state);

	function s(state) {
		if (state == 'false') {
			values = values.sort((a, b) => {
				return b - a;
			});
		} else {
			values = values.sort((a, b) => {
				return a - b;
			});
		}
	}
	
	return values;
}

function setValues(arrays) {
	
	arrays.forEach((array, index2) => {
		array.forEach((obj, index1) => {
			let input = obj.el.querySelector('input');
			input.value = index2;
		});
	});
	
}

setValues(els);

function getValues(arrays) {
	let arrays2 = [];
	
	arrays.forEach(array => {
		let array2 = [];
		array.forEach(obj => {
			let input = obj.el.querySelector('input');
			array2.push(input.value);
		});
		arrays2.push(array2);
	});
	
	return arrays2;
}

function change(arrays, width, values) {
	let j = 0;
	for (let i = 1; i < arrays.length; i++) {
		let input = arrays[i][width]['el'].querySelector('input');
		input.value = values[j];
		j++;
	}	
}

function fieldAndStr(arrays, str) {	
	for (let i = 1; i < arrays.length; i++) {
		let array = arrays[i];
		
		for (let j = 0; j < array.length; j++) {
			let el = array[j]['el'];
			let input = el.querySelector('input');
			let value = input.value;
			
			if (str.length > 0) {
				if (!value.includes(str)) {
					input.style.color = 'white';
				} else {
					input.style.color = 'black';
				}
			} else {
				input.style.color = 'black';
			}
			
		}
	}
	
}

textarea.addEventListener('change', event => {	
	fieldAndStr(els, event.target.value);
});
