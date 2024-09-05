let modInfo = {
	name: "The Jump Power Tree",
	id: "jumppowtree",
	author: "AndyMHo",
	pointsName: "jump power",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "robux grows on walls, not trees",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0 - Literally nothing</h3><br>
		- Nothing, what did you expect?<br>
	<h3>v0.1 - Robux Walls</h3><br>
		- Added walls, and robux. 🤑<br>
	<h3>v0.1.1 - FREEDOM!!!</h3><br>
		- Added wall <s>freedom</s> upgrade.<br>
	<h3>v0.1.2 - robux grows on walls, not trees</h3><br>
		- Added robux upgrade.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("w", 11)) {
		gain = new Decimal(5)
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}