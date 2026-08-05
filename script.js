const calibrateDestination = document.getElementById('calibrateDestination');
const displayScreen = document.getElementById('displayScreen');
const worldDiv = document.getElementById('worldDiv');
const regionDiv = document.getElementById('regionDiv');
const zoneDiv = document.getElementById('zoneDiv');
const coordsDiv = document.getElementById('coordsDiv');
const diagnosticDiv = document.getElementById('diagnosticDiv');
const worldName = document.getElementById('worldName');
const regionName = document.getElementById('regionName');
const zoneName = document.getElementById('zoneName');
const coordValue = document.getElementById('coordsValue');
const diagnosticLabel = document.getElementById('diagnosticLabel');
const diagnosticValue = document.getElementById('diagnosticValue');

calibrateDestination.disabled = true;

const themes = [
    {
        css: "theme-expedition",
        name: "Expedition"
    },
    {
        css: "theme-mark-i",
        name: "Mark I"
    },
    {
        css: "theme-mark-ii",
        name: "Mark II"
    },
    {
        css: "theme-titan-archive",
        name: "Titan Archive"
    },
    {
        css: "theme-draenic-surveyor",
        name: "Draenic Surveyor"
    },
    {
        css: "theme-goblin-retrofit",
        name: "Goblin Retrofit"
    },
    {
        css: "theme-arcane-prototype",
        name: "Arcane Prototype"
    },
    {
        css: "theme-void-corrupted",
        name: "Void Corrupted"
    },
    {
        css: "theme-fel-corrupted",
        name: "Fel Corrupted"
    }
];

const diagnostics = [

    {
        label: "Spatial Drift",
        value: () => `±${random(1, 8)} m`
    },

    {
        label: "Temporal Offset",
        value: () => `${(Math.random() * 2).toFixed(2)} s`
    },

    {
        label: "Portal Stability",
        value: () => `${random(72, 100)}%`
    },

    {
        label: "Arcane Saturation",
        value: () => `${random(10, 98)}%`
    },

    {
        label: "Mana Density",
        value: () => `${random(50, 500)} AU`
    },

    {
        label: "Leyline Strength",
        value: () => `${random(1, 12)}.${random(0, 9)}`
    },

    {
        label: "Reality Coherence",
        value: () => `${random(80, 100)}%`
    },

    {
        label: "Phase Variance",
        value: () => `${random(100, 999)}`
    },

    {
        label: "Calibration Error",
        value: () => `${(Math.random() * 1).toFixed(2)}%`
    },

    {
        label: "Navigation Confidence",
        value: () => `${random(85, 100)}%`
    },

    {
        label: "Void Resonance",
        value: () => String.fromCharCode(random(65, 90))
    },

    {
        label: "Chronal Echo",
        value: () => `Class ${String.fromCharCode(random(65, 70))}`
    },

    {
        label: "Entropy Index",
        value: () => random(0, 999)
    },

    {
        label: "Astral Alignment",
        value: () => ["Optimal", "Stable", "Variable", "Unknown"][random(0,3)]
    },

    {
        label: "Rift Integrity",
        value: () => `${random(60, 100)}%`
    },

    {
        label: "Anomaly Risk",
        value: () => ["Low", "Moderate", "Elevated", "High"][random(0,3)]
    },

    {
        label: "Dimensional Shear",
        value: () => `Δ${(Math.random() * 5).toFixed(2)}`
    },

    {
        label: "Ether Flux",
        value: () => `${random(1000,9999)} EF`
    },

    {
        label: "Runic Synchronization",
        value: () => `${random(1, 9)}/${random(10, 99)}`
    },

    {
        label: "Destination Certainty",
        value: () => `${random(75, 99)}%`
    },

    {
        label: "Chronal Stability",
        value: () => ["Nominal", "Acceptable", "Stable", "Fluctuating"][random(0,3)]
    },

    {
        label: "Temporal Anchor",
        value: () => `MK-${random(1,9)}`
    },

    {
        label: "Spatial Harmonics",
        value: () => `${random(100,999)} Hz`
    },

    {
        label: "Arcane Noise",
        value: () => `${random(0,25)} dB`
    },

    {
        label: "Portal Signature",
        value: () => `PX-${random(1000,9999)}`
    }

];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currentTheme = 0;

const themeLeft = document.getElementById("themeLeft");
const themeRight = document.getElementById("themeRight");
const themeName = document.getElementById("themeName");

function updateTheme() {

    const theme = themes[currentTheme];

    document.body.className = theme.css;

    themeName.textContent = theme.name;

    localStorage.setItem("theme", currentTheme);

}

themeLeft.addEventListener("click", () => {

    currentTheme =
        (currentTheme - 1 + themes.length) % themes.length;

    updateTheme();

});

themeRight.addEventListener("click", () => {

    currentTheme =
        (currentTheme + 1) % themes.length;

    updateTheme();

});

const savedTheme = localStorage.getItem("theme");

if (savedTheme !== null) {
    currentTheme = Number(savedTheme);
}

updateTheme();

function getRandomCoordinates(zone) {

    let x;
    let y;

    if (zone.bounds) {

        x = Math.floor(
            Math.random() * (zone.bounds.maxX - zone.bounds.minX + 1)
        ) + zone.bounds.minX;

        y = Math.floor(
            Math.random() * (zone.bounds.maxY - zone.bounds.minY + 1)
        ) + zone.bounds.minY;

    } else {

        x = Math.floor(Math.random() * 89) +10;
        y = Math.floor(Math.random() * 89) +10;

    }

    return { x, y };

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {

    const response = await fetch("./zones.json");
    const zones = await response.json();

    calibrateDestination.disabled = false;

    calibrateDestination.addEventListener("click", async () => {

        const destination =
            zones[Math.floor(Math.random() * zones.length)];

        const coords = getRandomCoordinates(destination);

        const diagnostic = diagnostics[random(0, diagnostics.length - 1)];

        worldDiv.classList.add("hidden");
        regionDiv.classList.add("hidden");
        zoneDiv.classList.add("hidden");
        coordsDiv.classList.add("hidden");
        diagnosticDiv.classList.add("hidden");


        await sleep(500);
        worldName.classList.add("placeholder");
        regionName.classList.add("placeholder");
        zoneName.classList.add("placeholder");
        coordValue.classList.add("placeholder");

        worldName.textContent = "Scanning...";
        regionName.textContent = "Triangulating...";
        zoneName.textContent = "Identifying...";
        coordValue.textContent = "Calculating...";

        await sleep(500);
        worldDiv.classList.remove("hidden");
        await sleep(2000);
        worldName.textContent = destination.world;
        worldName.classList.remove("placeholder");

        await sleep(600);
        regionDiv.classList.remove("hidden");
        await sleep(2200);
        regionName.textContent = destination.region;
        regionName.classList.remove("placeholder");

        await sleep(700);
        zoneDiv.classList.remove("hidden");
        await sleep(2400);
        zoneName.textContent = destination.zone;
        zoneName.classList.remove("placeholder");

        await sleep(600);
        coordsDiv.classList.remove("hidden");
        await sleep(2200);
        coordValue.textContent = `${coords.x}, ${coords.y}`;
        coordValue.classList.remove("placeholder");
        
        await sleep(600);
        diagnosticDiv.classList.remove("hidden");
        diagnosticLabel.textContent = diagnostic.label;
        await sleep(2200);
        diagnosticValue.textContent = diagnostic.value();
        diagnosticValue.classList.remove("placeholder");

    });

}



init();