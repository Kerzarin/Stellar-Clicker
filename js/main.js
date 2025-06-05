import "/js/render.js"

const loadingOverlayBtn = document.querySelector('.loading-overlay');
const startGameBtn = document.querySelector('#startGameBtn');
const mainMenuContainer = document.querySelector('#mainMenu');
const gameInterface = document.querySelector('#game-interface');
const backMenuButton = document.querySelector('#menuBtn');
const clickerButton = document.querySelector('#clickerButton');
const scoreValue = document.querySelector('#scoreValue');
const passiveScoreValue = document.querySelector('.per-second-value');

function interfaceContoller(selector, argument) {
    if (argument === true) {
        selector.classList.add('disabled');
    } else {
        selector.classList.remove('disabled');
    }
}

function loading() {
    function disableOverlay() {
        setTimeout(() => interfaceContoller(loadingOverlayBtn, true), 1500);
    }
    if (!loadingOverlayBtn.classList.contains('disabled')) {
        disableOverlay();
    } else {
        interfaceContoller(loadingOverlayBtn, false);
        disableOverlay();
    }
}

function ValueCheck() {
    const UpgradeButton = document.querySelectorAll('.upgrade-footer');
    for (let i = 0; i < UpgradeButton.length; i++) {
        let button = UpgradeButton[i].querySelector('.upgrade-button');
        let buttonImage = UpgradeButton[i].querySelector('.button-lock-icon');
        if (Number(UpgradeButton[i].querySelector('.cost-value').textContent) <= Number(scoreVisible())) {
            button.removeAttribute('disabled')
            buttonImage.textContent = '🔑'
        } else {
            button.setAttribute('disabled', '')
            buttonImage.textContent = '🔒'
        }
    }
}



function scoreVisible() {
    if (localStorage.getItem('score') === null) {
        scoreValue.textContent === '0';
        console.log(true)
    } else {
        scoreValue.textContent = localStorage.getItem('score')
    }
    return scoreValue.textContent;
}

function passveIncomeVisible() {
    if (localStorage.getItem('passiveScore') === null) {
        passiveScoreValue.textContent === '0'
    } else {
        passiveScoreValue.textContent = localStorage.getItem('passiveScore')
    }
    return passiveScoreValue.textContent;
}

function mainMenu() {
    loading();
    interfaceContoller(gameInterface, true);
    interfaceContoller(mainMenuContainer, false);
}

function addPoint() {
    if (localStorage.getItem('clicker modifier') != null) {
        const score = scoreValue.textContent = Number(scoreVisible()) + 1 + Number(localStorage.getItem('clicker modifier'));
        localStorage.setItem('score', score)
    } else {
        const score = scoreValue.textContent = Number(scoreVisible()) + 1;
        scoreValue.textContent
        localStorage.setItem('score', score)
    }
}

function passiveIncome() {
    setInterval(() => {
        localStorage.setItem('score', `${Number(localStorage.getItem('passiveScore')) + Number(localStorage.getItem('score'))}`);
        scoreValue.textContent = localStorage.getItem('score')
    }, 1000)
}

function startGame() {
    loading();
    interfaceContoller(mainMenuContainer, true);
    interfaceContoller(gameInterface, false);
    scoreVisible();
    passveIncomeVisible();
    clickUpgradeButtons();
    passveIncomeVisible();
    passiveIncome()
}


function clickUpgradeButtons() {
    setTimeout(() => {
        const upgradeCard = document.querySelectorAll('.upgrade-card');
        for (let i = 0; i < upgradeCard.length; i++) {
            
            const upgradeWrapper = upgradeCard[i]
            const upgradeCardButton = upgradeWrapper.querySelector('.upgrade-button');
            const upgradeCardCurrentRank = upgradeWrapper.querySelector('.curent-rank');
            const upgradeCardName = upgradeWrapper.querySelector('.upgrade-title').textContent;
            const upgradeCardCost = upgradeWrapper.querySelector('.cost-value');
            const upgradeCardProgressBar = upgradeWrapper.querySelector('.progress-bar');
            const upgradePipContainer = upgradeWrapper.querySelector('.progress-pips');
            const upgradeEffect = upgradeWrapper.querySelector('.eff_value');


            upgradeCardCurrentRank.textContent = localStorage.getItem(`${upgradeCardName}`)
            upgradeCardProgressBar.style.cssText = `width: ${Number(localStorage.getItem(`${upgradeCardName}`)) * 10}%`
            function upgradePip() {
                function renderPip(k) {
                    for (let i = 2; i < k; i++) {
                        upgradePipContainer.querySelector(`.pip:nth-child(${i})`).classList.add('active');
                    }
                }
                if (upgradeCardCurrentRank.textContent === '3') {
                    renderPip(3)
                } else if (upgradeCardCurrentRank.textContent === '5') {
                    renderPip(4)
                } else if (upgradeCardCurrentRank.textContent === '8') {
                    renderPip(5)
                } else if (upgradeCardCurrentRank.textContent === '10') {
                    renderPip(6)
                }
            }
            upgradePip()
            if (localStorage.getItem(`${upgradeCardName}`) === null) {
                upgradeCardCurrentRank.textContent = '0';
            }
            upgradeCardButton.addEventListener('click', () => {
                if (upgradeCardCurrentRank.textContent != '10') {
                    upgradeCardProgressBar.style.cssText = `width: ${(Number(localStorage.getItem(`${upgradeCardName}`)) + 1) * 10}%`;
                    let textContentUpdate = upgradeCardCurrentRank.textContent = Number(upgradeCardCurrentRank.textContent) + 1;
                    localStorage.setItem(`${upgradeCardName}`, textContentUpdate);
                    localStorage.setItem('score', `${Number(localStorage.getItem('score')) - Number(upgradeCardCost.textContent)}`);
                    scoreVisible()
                    ValueCheck()
                    upgradePip()
                }
                if (upgradeCardName !== 'ЧЕРНОДЫРЧАТЫЙ АККУМУЛЯТОР') {
                    localStorage.setItem('passiveScore', `${Number(localStorage.getItem('passiveScore')) + Number(upgradeEffect.textContent.slice(1, 5))}`);
                    passveIncomeVisible()
                } else {
                    localStorage.setItem('clicker modifier', `${Number(localStorage.getItem('clicker modifier')) + 2}`);
                }
            })
        }
    }, 1500)
}

startGameBtn.addEventListener('click', () => {
    startGame()
    ValueCheck()
})

backMenuButton.addEventListener('click', () => {
    mainMenu()
})

clickerButton.addEventListener('click', () => {
    addPoint();
    ValueCheck();
})

loading();

