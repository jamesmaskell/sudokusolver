class SudokuSolver {
	rowOffsets = {
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

			if (gridArray[i] == value) {
				//console.log("row");
				return false;
			}
		}
		return true;
	}

	checkColPlacement(puzzleString, row, column, value) {
		let rowOffset = this.rowOffsets[row.toLowerCase()];
		let indexOfEnteredCoordinates = rowOffset + column - 1;
		let gridArray = Array.from(puzzleString);

		for (let i = 97; i <= 105; i++) {
			let rowChar = String.fromCharCode(i);
			let idx = this.rowOffsets[rowChar] + column - 1;
			if (idx == indexOfEnteredCoordinates) continue;
			if (gridArray[idx] == value) {
				//console.log("column");
				return false;
			}
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
				if (gridArray[gridIdx] == value) {
					//console.log("region");
					return false;
				}
			}
		}
		return true;
	}

	getRowFromIndex(index) {
		let charCode = (index - (index % 9)) / 9 + 97;
		return String.fromCharCode(charCode);
	}

	solve(puzzleString) {
		let loop = 0;
		let puzzleArray = Array.from(puzzleString);
		let arrayOfPotential = [];
		arrayOfPotential.push(puzzleArray);

		let startFromBack = false;
		for (let gridIdx = 0; gridIdx <= 80; gridIdx++) {
			let _gridIdx = startFromBack ? 80 - gridIdx : gridIdx;
			//startFromBack = !startFromBack;

			if (puzzleArray[_gridIdx] != ".") continue;

			let row = this.getRowFromIndex(_gridIdx);
			let column = (_gridIdx % 9) + 1;

			let dupArrayOfPotential = [...arrayOfPotential];
			arrayOfPotential = [];

			dupArrayOfPotential.forEach((e, i) => {
				loop++;
				console.log(_gridIdx, e.join(""), loop, dupArrayOfPotential.length);
				for (let possibleValue = 1; possibleValue <= 9; possibleValue++) {
					let fits = true;

					fits = this.checkRowPlacement(e.join(""), row, column, possibleValue);

					if (fits) fits = this.checkColPlacement(e.join(""), row, column, possibleValue);

					if (fits) fits = this.checkRegionPlacement(e.join(""), row, column, possibleValue);

					if (fits) {
						let new_e = [...e];
						new_e[_gridIdx] = possibleValue;
						arrayOfPotential.push(new_e);
					}
				}
			});
		}

		console.log(arrayOfPotential[0].join(""));
	}
}

module.exports = SudokuSolver;
