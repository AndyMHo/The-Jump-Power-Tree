function random(min,max) {
    return (new Decimal(Math.random())).mul((max.sub(min)).add(new Decimal(1))).add(min)
}

addLayer("w", {
    name: "walls", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧱", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#C65541",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "walls defeated", // Name of prestige currency
    baseResource: "jump power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for walls", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("r", {
    name: "robux", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⬢", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FDECA6",
    resource: "robux", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: Ask for robux", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    clickables: {
        11: {
            title: "Ask your parents for robux",
            display() {return "Get 0 to 10 robux. It's random."},
            canClick() {return true},
            onClick() {player.r.points = (player.r.points).add(random(new Decimal(0),new Decimal(10)).floor())}
        }
    }
})