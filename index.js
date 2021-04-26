const fahrenInput = document.querySelector('#faren');
const celciusInput = document.querySelector('#cel');
const convert = document.querySelector('#conv');
const average = document.querySelector('#avg');

// function that limits the number of input and the type of input
fahrenInput.onkeypress = (e) => {
	e = e || window.event;
	let charCode = typeof e.which == 'number' ? e.which : e.keyCode;

	// allow non-printable keys
	if (!charCode || charCode == 8) {
		return;
	}

	let typed = String.fromCharCode(charCode);

	// allow numeric characters
	if (/\d/.test(typed)) {
		return;
	}

	// allow the minus sign (-) if the user enters it first
	if (typed == '-' && this.value == '') {
		this.setAttribute('maxlength', 5);
		return;
	}

	this.setAttribute('maxlength', 4);

	// in all other cases, suppress the event
	return false;
};

// function that converts the temperature
function fahrenheitToCelcius() {
	let far = parseFloat(fahrenInput.value).toFixed(2);
	let celsi = (far - 32) * (5 / 9);

	celsi = (Math.round(celsi * 100) / 100).toFixed(2);

	let area = document.getElementById('entries');
	let lineCount = countline();

	if (lineCount < 10) {
		celciusInput.value = celsi;
		area.value += far + celsi.padStart(14) + '         ' + '\n';
		average.disabled = false;
	} else {
		celciusInput.value = '';
	}

	if (lineCount === 9) {
		disable();
		avg();
	}

	fahrenInput.value = '';
	fahrenInput.focus();
}

// function that keeps track of the number of entries in the textarea
function countline() {
	let lineCount = 0;
	let area = document.getElementById('entries');
	let lines = area.value.split('\n');

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].length > 0) lineCount++;
	}

	return lineCount;
}

// function that calculates the average
function avg() {
	disable();
	const resetButton = document.getElementById('rst');

	document.getElementById('rst').style.visibility = 'visible';

	let faren_avg = 0.0;
	let cel_avg = 0.0;
	let area = document.getElementById('entries');
	let lines = area.value.split('\n');
	let numbers;

	for (let i = 0; i < lines.length - 1; i++) {
		numbers = lines[i].split('     ');
		faren_avg += parseFloat(numbers[0]);
		if (numbers[1] === '') {
			cel_avg += parseFloat(numbers[2]);
		} else {
			cel_avg += parseFloat(numbers[1]);
		}
	}

	let n = countline();

	faren_avg = (faren_avg / n).toFixed(2);
	cel_avg = (cel_avg / n).toFixed(2);

	area.value += '=====================================\n';
	area.value += '\n';
	area.value += faren_avg + cel_avg.padStart(14) + '         ' + '\n';
	resetButton.focus();
}

// function that disables the convert and average buttons and the input box
function disable() {
	average.disabled = true;
	convert.disabled = true;
	fahrenInput.disabled = true;
	celciusInput.value = '';
}

// function that clears the text area and input box to start all over again on a clean slate
function erase() {
	document.getElementById('entries').value = '';
	document.getElementById('faren').value = '';
	document.getElementById('cel').value = '';
	fahrenInput.disabled = false;
	fahrenInput.focus();

	document.getElementById('rst').style.visibility = 'hidden';
}

// function to load on start
function start() {
	fahrenInput.focus();
	average.disabled = true;
	convert.disabled = true;

	fahrenInput.addEventListener('keyup', function(event) {
		if (fahrenInput.checkValidity() && fahrenInput.value != '') {
			convert.disabled = false;
		} else {
			convert.disabled = true;
		}
	});

	fahrenInput.addEventListener('keyup', function(event) {
		if (fahrenInput.value == '-' || fahrenInput.value == '') {
			convert.disabled = true;
		} else {
			convert.disabled = false;
		}
	});
}

// event listener to enable enter key on convert button
fahrenInput.addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		convert.click();
	}
});

start();
