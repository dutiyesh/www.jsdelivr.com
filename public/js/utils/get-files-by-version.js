module.exports = function (project, version) {
	var files = getFilesByVersion(project, version);

	// 1. main file
	// 2. min files
	// 3. other files
	// 4. map files
	return files.sort(function (a, b) {
		if (a === project.mainfile || /\.map$/i.test(b)) {
			return -1;
		}

		if (b === project.mainfile || /\.map$/i.test(a)) {
			return 1;
		}

		if (/[._-]min./i.test(a)) {
			if (/[._-]min./i.test(b)) {
				return a > b || -1;
			}

			return -1;
		}

		if (/[._-]min./i.test(b)) {
			return 1;
		}

		return a > b || -1;
	});
};

function getFilesByVersion (project, version) {
	for (var i = 0, c = project.assets.length; i < c; i++) {
		if (project.assets[i].version === version) {
			return project.assets[i].files;
		}
	}

	return [];
}
