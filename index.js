const express = require("express"); // Importing Express
const fs = require("fs"); // Importing File System
const path = require("path"); // Importing path ke liye

const app = express(); // App
const port = 3000; // PORT

const dataKaFormat = `{	"jurnals": []}`;

const dataFile = path.join(__dirname, "./data/data.json"); // Joining __dirname and path of data for easier acess
const data = readJSON(path.join(__dirname, "./data/data.json")); // Reading the data file
const journals = data["journals"]; // Accessing the journals in the data

function writeJSON(newData, filePath) {
	/*
	!Stingyfies the json first ! 
	*/
	try {
		fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf-8");
		console.log("Data written successfully.");
	} catch (err) {
		console.error("Error writing file:", err);
	}
}

function readJSON(filePath) {
	try {
		const rawData = fs.readFileSync(filePath, "utf-8");
		const data = JSON.parse(rawData);
		return data;
	} catch (err) {
		console.error("Error reading file:", err);
		return null;
	}
}

// app.use("/", main)
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app
	.get("/", (req, res) => {
		res.render("index", { Navbar: "dJournal", cards: journals });
		journals.forEach((element) => {
			console.log(element);
		});
	})
	.post("/", (req, res) => {
		let d = req.body;
		d.date = getCurrentDateFormatted();
		journals.reverse();
		journals.push(d);
		journals.reverse();
		data.journals = journals;
		writeJSON(data, dataFile);
		res.redirect("/");
	});

app.listen(port, () => {
	console.log(`listening at port ${port}`);
});

// Miscellounous functions dude

function getCurrentDateFormatted() {
	/* Gets the date in the format :- ( Day - month - year ) */
	const today = new Date();

	const day = String(today.getDate()).padStart(2, "0"); // DD
	const month = String(today.getMonth() + 1).padStart(2, "0"); // MM (months are 0-indexed)
	const year = today.getFullYear(); // YYYY

	return `${day}-${month}-${year}`;
}
