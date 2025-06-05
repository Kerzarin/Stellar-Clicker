async function loadData() {
    try {
        const response = await fetch('/data/upgrades.json');
        const jsonData = await response.json();
        renderUpgrades(jsonData);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function renderUpgrades(array) {
    const container = document.querySelector('#upgradesContainer');
    for (let i = 0; i < array.length; i++) {
        const newElement = document.createElement('div');
        const newCard = container.appendChild(newElement);
        newCard.classList.add('upgrade-card');
        newCard.innerHTML = `
        <div class="card-border"></div>
            <div class="upgrade-header">
                <div class="upgrade-icon-container">
                    <img src="${array[i].image}" alt="${array[i].name}"
                        class="upgrade-icon">
                    <div class="icon-halo"></div>
                </div>
                <h3 class="upgrade-title">${array[i].name}</h3>
                <div class="upgrade-rank">
                    <span class="effect-value curent-rank">${array[i].curent_rank}</span>
                    <span class="rank-separator">/</span>
                    <span class="max-rank">${array[i].max_rank}</span>
                </div>
            </div>
            <div class="upgrade-description">
                <p> ${array[i].description}<span
                    class="effect-value eff_value">${array[i].effect}</span></p>
            </div>
            <div class="upgrade-progress">
                <div class="progress-bar" style="width: 0%"></div>
                <div class="progress-pips">
                    <span class="pip active"></span>
                    <span class="pip"></span>
                    <span class="pip"></span>
                    <span class="pip"></span>
                    <span class="pip"></span>
                </div>
            </div>
            <div class="upgrade-footer">
                <div class="upgrade-cost">
                    <img src="images/energy-core.png" alt="Энергия" class="cost-icon">
                    <span class="cost-value">${array[i].cost}</span>
                    <span class="cost-unit">MW</span>
                </div>
                <button class="upgrade-button" disabled>
                    <span class="button-text">Купить</span>
                    <span class="button-lock-icon">🔒</span>
                </button>
            </div>
            <div class="card-effects">
                <div class="effect-dots"></div>
                <div class="effect-glow"></div>
            </div>
            <div class="upgrade-badge new-badge">НОВОЕ!</div>
        `
    }
}




loadData()