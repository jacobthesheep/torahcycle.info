const hebrewDate = require("hebrew-date");

if (hebrewDate(new Date()).month === 8 && hebrewDate(new Date()).date === 14) {
	console.log(
		`Day of Passover is the ${hebrewDate(new Date()).date}th of ${
			hebrewDate(new Date()).month_name
		}`,
	);
}
