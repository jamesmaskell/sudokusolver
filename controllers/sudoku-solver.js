class SudokuSolver {
	rowOffset = {
		a: 0,
		b: 9,
		c: 18,
		d: 27,
		e: 36,
		f: 45,
		g: 54,
		h: 63,
		i: 72,
	};

	validate(puzzleString) {
		let values = string.match(/[\d\.]/g);
		if (values.length == 81) return true;
		return false;
	}

	checkRowPlacement(puzzleString, row, column, value) {
		let rowOffset = this.rowOffsets[row.toLowerCase()];
		let indexOfEnteredCoordinates = rowOffset + column - 1;
		let gridArray = Array.from(puzzleString);

		for (let i = rowOffset; i < rowOffset + 9; i++) {
			if (i == indexOfEnteredCoordinates) continue;

			if (gridArray[i] == value) return false;
		}
		return true;
	}

	checkColPlacement(puzzleString, row, column, value) {
		let rowOffset = this.rowOffsets[row.toLowerCase()];
		let indexOfEnteredCoordinates = rowOffset + column - 1;
		let gridArray = Array.from(puzzleString);

		for (let i = 97; i <= 105; i++) {
			let rowChar = String.fromCharCode(i);
			let idx = rowOffsets[rowChar] + column - 1;
			if (idx == indexOfEnteredCoordinates) continue;
			if (gridArray[idx] == value) return false;
		}
		return true;
	}

	checkRegionPlacement(puzzleString, row, column, value) {
		let rowOffset = this.rowOffsets[row.toLowerCase()];
		let indexOfEnteredCoordinates = rowOffset + column - 1;
		let gridArray = Array.from(puzzleString);

		let regionCol = indexOfEnteredCoordinates % 3;
		let regionRow = ((indexOfEnteredCoordinates - (indexOfEnteredCoordinates % 9)) / 9) % 3;
		let zeroZeroRegionIdx = indexOfEnteredCoordinates - regionCol - 9 * regionRow;

		for (let r = 0; r <= 2; r++) {
			for (let c = 0; c <= 2; c++) {
				let gridIdx = zeroZeroRegionIdx + r + c * 9;
				if (gridIdx == indexOfEnteredCoordinates) continue;
				if (gridArray[gridIdx] == value) return false;
			}
		}
		return true;
	}

	getRowFromIndex(index) {
		let charCode = (index - (index % 9)) / 9 + 97;
		return String.fromCharCode(charCode);
	}

	solve(puzzleString) {
		let puzzleArray = Array.from(puzzleString);
		let arrayOfPotential = [];
		arrayOfPotential.push(puzzleArray);

		console.log("puzzle converted to array", puzzleArray);

		for (let gridIdx = 0; gridIdx <= 80; gridIdx++) {
			console.log("index value", puzzleArray[gridIdx]);

			if (puzzleArray[gridIdx] != ".") continue;

			let row = this.getRowFromIndex(gridIdx);
			let column = gridIdx % 9;

			console.log(gridIdx, "coords", row, column);

			/*let dupArrayOfPotential = [...arrayOfPotential];
			arrayOfPotential = [];

			dupArrayOfPotential.forEach((e, i) => {
				for (let possibleValue = 1; possibleValue <= 9; possibleValue++) {
					let fits = true;

					fits = checkRowPlacement(e.join(""), row, column, possibleValue);

					if (fits) fits = checkColPlacement(e.join(""), row, column, possibleValue);

					if (fits) fits = checkRegionPlacement(e.join(""), row, column, possibleValue);

					if (fits) {
						e[gridIdx] = possibleValue;
						arrayOfPotential.push(e);
					}
				}
			});*/
		}
	}
}

module.exports = SudokuSolver;
