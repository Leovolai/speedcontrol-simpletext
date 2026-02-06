// ==========================
// MOCK INCENTIVE DATA
// ==========================

const mockIncentives = [
    {

        type: "milestone",
        game: "Metal Gear Solid",
        name: "Pelastetaanko Meryl?",
        current: 20,
        target: 100
    },
    {
        type: "bidwar",
        game: "Crash Team Racing: Saphire",
        name: "Valitse hahmo",
        options: [
            { name: "Fake Crash", amount: 14 },
            { name: "Pura", amount: 50 },
            { name: "Penta Penguin", amount: 1 },
            { name: "Polar", amount: 99 },
            { name: "Ripper Roo", amount: 100 },
            { name: "Crash Bandicoot", amount: 25 },
            { name: "Komodo Joe", amount: 66 },
            { name: "Cortex", amount: 75 },
        ]
    },
    {
        type: "milestone",
        game: "Metal Gear Solid Delta: Snake Eater",
        name: "Lauletaan tikkaissa!",
        current: 50,
        target: 50
    }
];
// =========== MOCK DATA END

const incentiveLayouts = {
    milestone: renderMilestone,
    bidwar: renderBidwar
};

const incentiveRoot = document.getElementById("incentiveRoot");

// ==========================
// RENDERERS
// ==========================

function renderMilestone(root, incentive) {
    root.innerHTML = `
        <span class="gameName">${incentive.game}</span>
        <div class="progressContainer">
            <div class="incentiveTextContainer">
                <span>${incentive.current}€</span>
                <span>${incentive.name}</span>
                <span>${incentive.target}€</span>
            </div>
            <div class="progressFill"></div>
        </div>
    `;

    // Fill bar logic
    const container = root.querySelector(".progressContainer");
    const fill = container.querySelector(".progressFill");
    const percent = Math.min(incentive.current / incentive.target, 1) * 100;
    fill.style.width = `${percent}%`;
}


function renderBidwar(root, incentive) {
    root.innerHTML = `
        <span class="gameName">${incentive.game}</span>
        <div class="bidwarTitle">${incentive.name}</div>
    `;

    const sortedOptions = [...incentive.options].sort((a, b) => b.amount - a.amount);
    const maxAmount = Math.max(...sortedOptions.map(o => o.amount));

    sortedOptions.forEach((option, index) => {
        const container = document.createElement("div");
        container.className = "progressContainer";
        container.style.position = "relative";

        container.innerHTML = `
            <div class="incentiveTextContainer">
                <span>${option.name}</span>
                <span>${option.amount}€</span>
            </div>
            <div class="progressFill"></div>
        `;

        const fill = container.querySelector(".progressFill");
        const percent = maxAmount > 0 ? (option.amount / maxAmount) * 100 : 0;
        fill.style.width = `${percent}%`;

        root.appendChild(container);

    });
}

function renderIncentive(incentive) {
    const renderer = incentiveLayouts[incentive.type];
    if (!renderer) return;
    renderer(incentiveRoot, incentive);
}

// Incentive rotation
let activeIndex = 0;

function showNextIncentive() {
    incentiveRoot.classList.add("is-hidden");

    // wait for fade-out to finish
    setTimeout(() => {
        renderIncentive(mockIncentives[activeIndex]);

        activeIndex = (activeIndex + 1) % mockIncentives.length;

        incentiveRoot.classList.remove("is-hidden");
    }, 400);
}

showNextIncentive();
setInterval(showNextIncentive, 15000);