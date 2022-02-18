var wordGroup = [
	{
		word: 'crane',
		id: 0
	},
	{
		word: 'rough',
		id: 1
	},
	{
		word: 'clean',
		id: 2
	},
	{
		word: 'abbot',
		id: 3
	},
	{
		word: 'plain',
		id: 4
	}
]

// test push new array to existing
wordGroup.push({word: 'peter', id: 5})

var point = 0;
var score = 0;
var level = 5;
var filtered;
var inverse;
var checkId = []
console.log(point)

for (let a in wordGroup) {
	printWord(wordGroup[a].word, wordGroup[a].id)
}

// split word to letter and print into separate span inside div
function printWord(word, index) {
  let wordarray = word.split("")
  let div = document.createElement("div");
  div.setAttribute('class','word');
  div.setAttribute('id',`word-${index}`);
  document.getElementsByTagName('body')[0].appendChild(div)
  let len = wordarray.length;
  for ( i = 0; i < len ; i++) {
    let letter = document.createElement("span");
	letter.setAttribute('class',`letter`)
	letter.setAttribute('id',`letter-${i}`)
    letter.textContent = wordarray[i];
    div.appendChild(letter)
  }
  
}

changePoint() // show initial point
changeScore() // show initial score


document.onkeydown = (e) => { // on every keyboard pushed (keydown) detected
	e = e || window.event;
	let key = e.key

	if (point == 0) {
		checkLetter(point, key)
	} else if (point > 0 && point < level) {
		checkLetter2(point, key)
	}

	checkScore()
	
	
}

function checkScore() {
	if (point == 5) {
		point = 0;
		score += 5;
		changeScore()
		changePoint()
		resetColor()
	}
}

function changePoint() { // change point when hit the correct keyboard
	document.getElementById('point').innerHTML = 'Point: ' + point
}

function changeScore() { // change score when finished typing the correct word
	document.getElementById('score').innerHTML = 'Score: ' + score
}

function matchLetter() { // if keyboard hit something, point added
	if (filtered.length > 0) {
		point++;
		console.log(point)
		changePoint()
	}
}

function resetPoint() { // if keyboard hit nothing, point reset
	if (filtered.length == 0) {
		point = 0;
		console.log(point)
		changePoint()
		resetColor()
		
	}
}

function resetColor() {
	setTimeout(() => {
		let checkColor = document.getElementsByClassName('letter')
		for (let i in checkColor) {
			checkColor[i].style.color = 'black'
		}
	}		
	,500)
	}
	

function checkLetter(point, key) {
	let letterarray = []
	for (let a in wordGroup) {
		letterarray.push({
			letter1:wordGroup[a].word.split("")[0],
			letter2:wordGroup[a].word.split("")[1],
			letter3:wordGroup[a].word.split("")[2],
			letter4:wordGroup[a].word.split("")[3],
			letter5:wordGroup[a].word.split("")[4],
			id:wordGroup[a].id
		})
		}
	filter(letterarray, point, key)
	matchLetter()
	resetPoint()
	changeColor()
}

function checkLetter2(point, key) {
	filter(filtered, point, key)
	matchLetter()
	resetPoint()
	changeColor()
}

function filter(filter, point, key) {
	filtered = filter.filter((letter) => {
		if (point == 0) {
			return letter.letter1 == key
		} else if (point == 1) {
			return letter.letter2 == key
		} else if (point == 2) {
			return letter.letter3 == key
		} else if (point == 3) {
			return letter.letter4 == key
		} else if (point == 4) {
			return letter.letter5 == key
		}		
	})
	console.log(filtered)
	checkId = []
	for (let a in filtered) {
		checkId.push(filtered[a].id)
	}
	console.log(checkId)
}

function changeColor() {
	console.log(checkId)
	for (let i = 0; i < checkId.length; i++) {
		let getWord = document.getElementById(`word-${checkId[i]}`)
		let getSpan = getWord.getElementsByTagName('span')
		let getLetter = getSpan[point-1]
		getLetter.style.color = 'red'
	}
	
}


