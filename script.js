const calibrateDestination = document.getElementById('calibrateDestination');
const displayScreen = document.getElementById('displayScreen');
const worldDiv = document.getElementById('worldDiv');
const regionDiv = document.getElementById('regionDiv');
const zoneDiv = document.getElementById('zoneDiv');
const coordsDiv = document.getElementById('coordsDiv');
const worldName = document.getElementById('worldName');
const regionName = document.getElementById('regionName');
const zoneName = document.getElementById('zoneName');
const coordValue = document.getElementById('coordsValue');

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
    }
];

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

        worldDiv.classList.add("hidden");
        regionDiv.classList.add("hidden");
        zoneDiv.classList.add("hidden");
        coordsDiv.classList.add("hidden");

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
        await sleep(1000);
        worldName.textContent = destination.world;
        worldName.classList.remove("placeholder");

        await sleep(600);
        regionDiv.classList.remove("hidden");
        await sleep(1200);
        regionName.textContent = destination.region;
        regionName.classList.remove("placeholder");

        await sleep(700);
        zoneDiv.classList.remove("hidden");
        await sleep(1400);
        zoneName.textContent = destination.zone;
        zoneName.classList.remove("placeholder");

        await sleep(600);
        coordsDiv.classList.remove("hidden");
        await sleep(1200);
        coordValue.textContent = `${coords.x}, ${coords.y}`;
        coordValue.classList.remove("placeholder");

    });

}



init();