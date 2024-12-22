export class Field{
    constructor(x,y,isBomb) {
        this.x = x;
        this.y = y;
        this.isBomb = isBomb;
        this.state = "close";
    }
}

export let v = {
    openImage : 'url("resources/Open.png")',
    closedImage : 'url("resources/Closed.png")',
    flagImage : 'url("resources/Flag.png")',
    redFlagImage : 'url("resources/RedFlag.png")',
    bombImage : 'url("resources/Bomb.png")',
    redBombImage : 'url("resources/RedBomb.png")',
    LoadSpriteSheet : new Image(),

    fields : null,
    flagLeftP : null,
    timerP : null,
    endGameP : null,
    topContainer : null, 

    mode: "easy",
    exfieldResetSize : 150,
    exfontResetSize : 80,
    x : 15,
    y : 15,
    elapsed : 0,
    openCount : 0,
    fieldCount : 100*100,
    bombCount : 10,
    flagLeft : 10,
    difficulty : 10,
    bombLocation : [],
    fieldsData : [],
    startTime : null,
    interval : null,
    timerOn : false
};