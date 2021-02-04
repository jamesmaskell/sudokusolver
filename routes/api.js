"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
	let solver = new SudokuSolver();

	app.route("/api/check").post((req, res) => {});

	app.route("/api/solve").post((req, res) => {
		solver.solve("82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51");
	});
};
