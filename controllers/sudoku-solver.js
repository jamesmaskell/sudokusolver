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
		let index = this.rowOffset[row.toLowerCase()] + column - 1;
		let gridArray = Array.from(puzzleString);
	}

	checkColPlacement(puzzleString, row, column, value) {
		let index = this.rowOffset[row.toLowerCase()] + column - 1;
		let gridArray = Array.from(puzzleString);
	}

	checkRegionPlacement(puzzleString, row, column, value) {
		let index = this.rowOffset[row.toLowerCase()] + column - 1;
		let gridArray = Array.from(puzzleString);
	}

	solve(puzzleString) {}
}

module.exports = SudokuSolver;
