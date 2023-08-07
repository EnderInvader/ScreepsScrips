const HostileROE = {
	Neutral:  "neutral",  // Defend
	Friendly: "friendly", // Passive
	Enemy:    "enemy",    // Attack
}

function globalMemory() {
	if (!Memory.hostiles) {
		console.log('[global]', "Memory", "Hostiles");

		let enemies = {
			"Invader": HostileROE.Enemy,
			"Source Keeper": HostileROE.Enemy,
		};

		Memory.hostiles = enemies;
	}
}

module.exports = { HostileROE, globalMemory };