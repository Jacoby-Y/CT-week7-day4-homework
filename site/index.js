
const $ = (qry)=> document.querySelector(qry);

Array.prototype.count = function(match) {
    let count = 0;
    for (let i = 0; i < this.length; i++) {
        const val = this[i];
        if (val == match) count++;
    }
    return count;
}

/** @type HTMLElement */
const dice_area_1 = $("#dice-area-1");
const dice_area_2 = $("#dice-area-2");
/** @type HTMLElement */
const roll_btn = $("#roll-btn");
const main_wrapper = $("#main-wrapper");
const player_1_txt = $("#player-1-txt b");
const player_2_txt = $("#player-2-txt b");

const post_game_wrapper = $("#post-game-wrapper");

const diceHTML = (num)=> `<i class="bi bi-dice-${num} dice"></i>`;
// const diceHTML = (num, index)=> `<i class="bi bi-dice-${num} dice"></i>${index == 2 ? " " : ""}`;

// Player manager
let playerM = {
    score: {
        one: 0,
        two: 0
    },
    _player_1_turn: true,
    get player_1_turn() { return this._player_1_turn; },
    set player_1_turn(x) { 
        console.log(x);
        return this._player_1_turn = x; 
    },
}
const swapPlayerTurn = (force_player_1=undefined)=>{
    let turn_1 = playerM.player_1_turn;
    if (force_player_1 !== undefined) turn_1 = !force_player_1;
    const theme = (turn_1 ? ["primary", "danger"] : ["danger", "primary"]);
    roll_btn.classList.replace("text-" + theme[0], "text-" + theme[1]);
    roll_btn.classList.replace("border-" + theme[0], "border-" + theme[1]);

    if (force_player_1 == undefined) playerM.player_1_turn = !playerM.player_1_turn;

    roll_btn.toggleAttribute("disabled", false);
}

roll_btn.onclick = ()=>{
    const dice_roll = Array.from(Array(5)).map(()=> Math.ceil(Math.random()*6)).sort();
    roll_btn.toggleAttribute("disabled", true);
    buildDiceArea(dice_roll);
}
const clearDiceArea = ()=>{
    while (dice_area_1.firstChild) {
        dice_area_1.removeChild(dice_area_1.firstChild);
    }
    while (dice_area_2.firstChild) {
        dice_area_2.removeChild(dice_area_2.firstChild);
    }
}
const buildDiceArea = (dice=[])=>{
    clearDiceArea();

    let i = 0;
    // dice_area.insertAdjacentHTML("beforeend", diceHTML(dice[i++]));
    const id = setInterval(() => {
        if (i == dice.length) {
            addScore( getDiceValue(dice) );
            clearInterval(id);
            return;
        }
        if (i <= 2) dice_area_1.insertAdjacentHTML("beforeend", diceHTML(dice[i]));
        else dice_area_2.insertAdjacentHTML("beforeend", diceHTML(dice[i]));
        i++;
    }, 500);
}
const getDiceValue = (dice=[])=>{
    let total = 0;
    if (dice.count(1) >= 3) total += 1000 + ((dice.count(1)-3)*100);
    else total += dice.count(1) * 100;
    total += dice.count(5) * 50;
    for (let i = 2; i <= 6; i++) {
        if (dice.count(i) >= 3) total += 100 * i;
    }
    return total;
}
const addAnim = (text_elem=player_1_txt, player="one", val=0)=>{
    text_elem.innerText = `${playerM.score[player]} +${val}`;
    setTimeout(()=>{
        swapPlayerTurn();
        playerM.score[player] += val;
        text_elem.innerText = `${playerM.score[player].toLocaleString("en")}`;

        checkWin(player);
    }, 2000);
}
const addScore = (val)=>{
    if (playerM.player_1_turn) {
        addAnim(player_1_txt, "one", val);
    } else {
        addAnim(player_2_txt, "two", val);
    }
}
const checkWin = (player="one")=>{
    const score = playerM.score[player];
    if (score < 10000) return;
    post_game_wrapper.setAttribute("winner", player);
}
const resetGame = ()=>{
    post_game_wrapper.setAttribute("winner", "");
    playerM.score.one = playerM.score.two = 0;
    playerM.player_1_turn = true;

    player_1_txt.innerText = `0`;
    player_2_txt.innerText = `0`;

    clearDiceArea();

    swapPlayerTurn(true);
}