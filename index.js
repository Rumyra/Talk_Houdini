console.clear();

// CSS paint backgrounds - these are on the body and I want them changed every slide change
CSS.paintWorklet.addModule('dots.js');

// change background colours ====================
const revealOuter = document.querySelector('.reveal');

// props & vals =========================

// register property
CSS.registerProperty({
	name: '--lighterMain',
	syntax: '<color>',
	initialValue: 'lightblue',
	inherits: true
})

// quick and dirty -> with hsla - set main colour, create and set lighter colour
function setCols(hslaString) {
	revealOuter.style.setProperty('--mainColour', hslaString)

	// return split hsla
	const splitCol = colFromHsla(hslaString);
	splitCol.lum = splitCol.lum+10;
	// create lighter col
	const lighterCol = `hsla(${splitCol.hue}, ${splitCol.sat}%, ${splitCol.lum}%, ${splitCol.op})`;

	revealOuter.style.setProperty('--lighterMain', lighterCol);
}

Reveal.addEventListener('purple', () => {
	setCols('hsla(273, 36%, 64%, 1)');
})

Reveal.addEventListener('blue', () => {
	setCols('hsla(179, 38%, 58%, 1)');
})

Reveal.addEventListener('pink', () => {
	setCols('hsla(346, 63%, 64%, 1)');
})

Reveal.addEventListener('orange', () => {
	setCols('hsla(5, 74%, 67%, 1)');
})

Reveal.addEventListener('green', () => {
	setCols('hsla(131, 30%, 63%, 1)');
})

// console log typen om ======================
const buttonEl = document.querySelector('.button');

Reveal.addEventListener('style', () => {
	console.clear();
	console.log("4px");
})

Reveal.addEventListener('typed', () => {
	console.clear();
	const width = buttonEl.computedStyleMap().get('border-top-width')
	console.log(width);
})

Reveal.addEventListener('make', () => {
	console.clear();
	document.querySelector('#butt').attributeStyleMap.set('border-top-width', CSS.px(10));
	console.log(document.querySelector('#butt').attributeStyleMap.get('border-top-width'));
})



// register a property to animate

CSS.registerProperty({
	name: '--animatedCol',
	syntax: '<color>',
	initialValue: 'transparent',
	inherits: false
})

function colFromHsla(hslaString) {
	let sep = hslaString.indexOf(",") > -1 ? "," : " ";
  hslaString = hslaString.substr(5).split(")")[0].split(sep);

  if (hslaString.indexOf("/") > -1)
    hslaString.splice(3,1);

	let col = {
		hue: Number(hslaString[0]),
		sat: Number(hslaString[1].substr(0,hslaString[1].length - 1)),
		lum: Number(hslaString[2].substr(0,hslaString[2].length - 1)),
		op: Number(hslaString[3])
	}

	return col;

}
