function random(min,max) {return (new Decimal(Math.random())).mul((max.sub(min)).add(new Decimal(1))).add(min)}

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
    resource: "defeated walls", // Name of prestige currency
    baseResource: "jump power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for walls", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Wall have feelings too",
            description: "Free some walls for jump power gain in return.",
            cost: new Decimal(5)
        }
    }
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
            display() {return `Get 0 to ${format((new Decimal(10).mul(buyableEffect(this.layer, 11))))} robux. It's random.`},
            canClick() {return true},
            onClick() {
                player[this.layer].points = (player[this.layer].points).add(random(new Decimal(0),(new Decimal(10).mul(buyableEffect(this.layer, 11)))).floor())
            }
        }
    },
    buyables: {
        11: {
            title: "Bribery",
            display() {return `Trade walls for more robux per click.<br>Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}`},
            cost(x) {return new Decimal(2).pow(x)},
            canAfford() {return player.w.points.gte(this.cost())},
            buy() {
                player.w.points = player.w.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {return new Decimal(2).pow(getBuyableAmount(this.layer, this.id))}
        }
    }
})