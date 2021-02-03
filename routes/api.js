"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
	let solver = new SudokuSolver();

	app.route("/api/check").post((req, res) => {});

	app.route("/api/solve").post((req, res) => {
		solver.solve("57.......2.4.7.38......6......843.......2.6.....1..72.8.5.....27..4...1.43.....5.");
	});
};
