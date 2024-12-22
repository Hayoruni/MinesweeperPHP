import { v,Field } from './Data.js';
import {OpenPossible, OpenOnNumber} from './Util.js'
import {StartTimer, ContinueTimer, ResetTimer, StopTimer} from './Timer.js';
import {StartAnimation, StopAnimation} from './Load.js';

EasyNewGame();

export function LeftClick(e){
    if (e.button == 0) {
        if (e.target.id)
        if(v.fieldsData[e.target.id].state == "close"){
            OpenPossible(v.fieldsData[e.target.id].x,v.fieldsData[e.target.id].y,Number(e.target.id));
        }
        else if (v.fieldsData[e.target.id].state == "open"){
            OpenOnNumber(v.fieldsData[e.target.id].x,v.fieldsData[e.target.id].y);
        }
    }
}
export function RightClick(e){
    e.preventDefault();
    if(v.fieldsData[e.target.id].state == "close" && v.flagLeft>0){
        e.target.style.backgroundImage = v.flagImage;
        v.flagLeft --;
        v.flagLeftP.innerHTML = v.flagLeft;
        v.fieldsData[e.target.id].state = "flag";
    }
    else if(v.fieldsData[e.target.id].state == "flag"){
        e.target.style.backgroundImage = v.closedImage;
        v.flagLeft ++;
        v.flagLeftP.innerHTML = v.flagLeft;
        v.fieldsData[e.target.id].state = "close";
    }
    else{
        OpenOnNumber(v.fieldsData[e.target.id].x,v.fieldsData[e.target.id].y);
    }
}

async function NewGame(){
    StopTimer();
    if(document.querySelector('table') != null) document.querySelector('table').remove();
    //table építés
    let body = document.body;
    let table = document.createElement('table');
    table.classList.add("GameField");

    //menu építés
    let tr = table.insertRow();
    tr.id = "TopPanel";
    let th = document.createElement('th');
    th.setAttribute("colspan", "7");
    v.topContainer = document.createElement("div");
    v.topContainer.id = "TopContainer";
    let easyP= document.createElement("button");
    easyP.id = "EasyButton";
    easyP.innerHTML = "Könnyű";
    easyP.classList.add("TopButtons");
    let mediumP= document.createElement("button");
    mediumP.id = "MediumButton";
    mediumP.innerHTML = "Közepes";
    mediumP.classList.add("TopButtons");
    let hardP= document.createElement("button");
    hardP.id = "HardButton";
    hardP.innerHTML = "Nehéz";
    hardP.classList.add("TopButtons");
    let CustomP= document.createElement("button");
    CustomP.id = "CustomButton";
    CustomP.innerHTML = "Egyéni";
    CustomP.classList.add("TopButtons");
    let BackP= document.createElement("button");
    BackP.id = "BackButton";
    BackP.innerHTML = "Kilépés";
    BackP.classList.add("TopButtons");
    let div2 = document.createElement("div");
    div2.id = "MenuContainer";
    
    v.flagLeftP = document.createElement("p");
    v.flagLeftP.id = "FlagLeftP";
    v.flagLeftP.innerHTML = "10";
    let newGameButton = document.createElement("button");
    newGameButton.id = "NewGameButton";
    newGameButton.innerHTML = "Új Játék";
    v.timerP = document.createElement("p");
    v.timerP.id = "TimerP";
    v.timerP.innerHTML = "0";
    v.endGameP = document.createElement("p");
    v.endGameP.id = "EndGameP";
    v.endGameP.innerHTML = "&#8203"; // whitespace hogy jól nézzen ki
    tr.appendChild(th);
    th.appendChild(v.topContainer);
    v.topContainer.appendChild(easyP);
    v.topContainer.appendChild(mediumP);
    v.topContainer.appendChild(hardP);
    v.topContainer.appendChild(CustomP);
    v.topContainer.appendChild(BackP);
    th.appendChild(div2);
    div2.appendChild(v.flagLeftP);
    div2.appendChild(newGameButton);
    div2.appendChild(v.timerP);
    th.appendChild(v.endGameP);
    body.appendChild(table);
    StartAnimation();

    //Mezők építés
    v.fieldCount = v.x * v.y;
    v.bombCount = Math.ceil((v.fieldCount * v.difficulty) / 100);
    v.flagLeft = v.bombCount;
    v.flagLeftP.innerHTML = v.flagLeft;
    v.openCount = 0;
    v.elapsed = 0;
    let szam = 0;
    v.bombLocation = [];
    for (let i = 0; i < v.bombCount; i++)
    {
        do
        {
            szam = Math.floor(Math.random() * v.fieldCount);
        } while (v.bombLocation.includes(szam));
        v.bombLocation.push(szam);
    }
    
    //méretezés
    let tempFieldSize = v.exfieldResetSize;
    let tempFontSize = v.exfontResetSize;
    do
    {
        tempFieldSize--;
        tempFontSize = tempFieldSize * (v.exfontResetSize/v.exfieldResetSize);
        if(tempFieldSize <= 16) break;
    } while (v.y * tempFieldSize + 220 >= window.screen.availHeight || v.x * tempFieldSize >= window.screen.availWidth * 0.9);

    v.fieldsData = [];
    for (let i = 0; i < v.y; i++) {
        tr = table.insertRow();
        tr.classList.add("FieldTr");
            tr.style.height = tempFieldSize+"px";
        tr.style.fontSize = tempFontSize+"px";
        for (let j = 0; j < v.x; j++) {
            let td = tr.insertCell();
            td.classList.add("Field");
            td.id = (i*v.x)+j;

            let tempBomb = false;
            if (v.bombLocation.includes(i*v.x+j))
            {
                tempBomb = true;
            }
            v.fieldsData.push(new Field(j, i, tempBomb));
            
        }
    }
    v.fields = document.querySelectorAll('.Field');
    let tableWidth = getComputedStyle(document.querySelector("table")).width;
    tableWidth = Number(tableWidth.substring(0,tableWidth.length-2));

    let change = false;
    let trs = document.querySelectorAll(".FieldTr");
    while(tableWidth > (v.x*tempFieldSize)+2){
        tempFieldSize += 2;
        tempFontSize = tempFieldSize * (v.exfontResetSize/v.exfieldResetSize);
        change = true;
    }
    if(v.fieldCount*0.5 < 1000) await new Promise(x => setTimeout(x, 1000));
    else await new Promise(x => setTimeout(x, v.fieldCount*0.5));
    if(change){
        for (let i=0;i<trs.length;i++) {
            trs[i].style.height = tempFieldSize+"px";
        }
        v.fields.forEach(item => {
            item.style.fontSize = tempFontSize+"px";
            item.addEventListener('mousedown',LeftClick);
            item.addEventListener('contextmenu',RightClick);
        });
    }
    else{
        v.fields.forEach(item => {
            item.addEventListener('mousedown',LeftClick);
            item.addEventListener('contextmenu',RightClick);
        });
    }
    StopAnimation();
    newGameButton.addEventListener('mousedown',NewGame);
    easyP.addEventListener('mousedown',EasyNewGame);
    mediumP.addEventListener('mousedown',MediumNewGame);
    hardP.addEventListener('mousedown',HardNewGame);
    CustomP.addEventListener('mousedown',CustomClick);
    BackP.addEventListener('mousedown',BackClick);
    v.timerOn = true;
    ResetTimer();
    StartTimer();
}
function EasyNewGame(){
    v.x = 10;
    v.y = 10;
    v.difficulty = 10;
    v.mode = "easy";
    NewGame();
}
function MediumNewGame(){
    v.x = 15;
    v.y = 15;
    v.difficulty = 13;
    v.mode = "medium";
    NewGame();
}
function HardNewGame(){
    v.x = 20;
    v.y = 20;
    v.difficulty = 16;
    v.mode = "hard";
    NewGame();
}
function BackClick(){
    location.href = 'index.php';
}
function CustomClick(){
    StopTimer();
    document.querySelector("#NewGameButton").removeEventListener('mousedown',NewGame);
    document.querySelector("#EasyButton").removeEventListener('mousedown',EasyNewGame);
    document.querySelector("#MediumButton").removeEventListener('mousedown',MediumNewGame);
    document.querySelector("#HardButton").removeEventListener('mousedown',HardNewGame);
    document.querySelector("#CustomButton").removeEventListener('mousedown',CustomClick);
    document.querySelector("#BackButton").removeEventListener('mousedown',BackClick);
    document.querySelectorAll(".Field").forEach(element => {
        element.removeEventListener('mousedown',LeftClick);
        element.removeEventListener('contextmenu',RightClick);
    });

    let DifficultyPopup = document.createElement("div");
    DifficultyPopup.id = "DifficultyPopup";
    DifficultyPopup.style.zIndex = "2";
    let tableWidth = getComputedStyle(document.querySelector("table")).width;
    tableWidth = Number(tableWidth.substring(0,tableWidth.length-2));
    if(tableWidth * 0.5 < window.screen.availWidth * 0.2){
        DifficultyPopup.style.maxWidth = (tableWidth * 0.5)+"px";
    }else{
        DifficultyPopup.style.maxWidth = (window.screen.availWidth * 0.2)+"px";
    }
    
    let label1 = document.createElement("label");
    label1.innerHTML = "oszlopok száma";
    label1.htmlFor = "inputX";
    let input1 = document.createElement("input");
    input1.type = "number";
    input1.min = "5";
    input1.max = "50";
    input1.id = "inputX";
    let lineBreak = document.createElement("div");
    lineBreak.classList.add("lineBreak");
    let lineBreak2 = document.createElement("div");
    lineBreak2.classList.add("lineBreak");let 
    lineBreak3 = document.createElement("div");
    lineBreak3.classList.add("lineBreak");
    v.topContainer.appendChild(DifficultyPopup);
    DifficultyPopup.appendChild(label1);
    DifficultyPopup.appendChild(input1);
    DifficultyPopup.appendChild(lineBreak);
    
    let label2 = document.createElement("label");
    label2.innerHTML = "sorok száma";
    label2.htmlFor = "inputY";
    label2.style.minWidth = getComputedStyle(label1).width;
    let input2 = document.createElement("input");
    input2.type = "number";
    input2.min = "5";
    input2.max = "50";
    input2.id = "inputY";
    let label3 = document.createElement("label");
    label3.innerHTML = "nehézség";
    label3.htmlFor = "inputDiff";
    label3.style.minWidth = getComputedStyle(label1).width;
    let input3 = document.createElement("input");
    input3.type = "number";
    input3.min = "1";
    input3.max = "99";
    input3.id = "inputDiff";
    let button1 = document.createElement("button");
    button1.classList.add("popupButton");
    button1.id = "applyButton";
    button1.innerHTML = "Új Játék";
    let button2 = document.createElement("button");
    button2.classList.add("popupButton");
    button2.id = "cancelButton";
    button2.innerHTML = "Mégse";
    DifficultyPopup.appendChild(label2);
    DifficultyPopup.appendChild(input2);
    DifficultyPopup.appendChild(lineBreak2);
    DifficultyPopup.appendChild(label3);
    DifficultyPopup.appendChild(input3);
    DifficultyPopup.appendChild(lineBreak3);
    DifficultyPopup.appendChild(button1);
    DifficultyPopup.appendChild(button2);
    button1.addEventListener('mousedown', ApplyClick);
    button2.addEventListener('mousedown', CancelClick);
}
function CancelClick(){
    document.querySelector("#DifficultyPopup").remove();
    document.querySelector("#NewGameButton").addEventListener('mousedown',NewGame);
    document.querySelector("#EasyButton").addEventListener('mousedown',EasyNewGame);
    document.querySelector("#MediumButton").addEventListener('mousedown',MediumNewGame);
    document.querySelector("#HardButton").addEventListener('mousedown',HardNewGame);
    document.querySelector("#NewGameButton").addEventListener('mousedown',NewGame);
    document.querySelector("#CustomButton").addEventListener('mousedown',CustomClick);
    document.querySelector("#BackButton").addEventListener('mousedown',BackClick);
    document.querySelectorAll(".Field").forEach(element => {
        element.addEventListener('mousedown',LeftClick);
        element.addEventListener('contextmenu',RightClick);
    });
    ContinueTimer();
}
function ApplyClick(){
    let x = Number(document.querySelector("#inputX").value);
    let y = Number(document.querySelector("#inputY").value);
    let dif = Number(document.querySelector("#inputDiff").value);

    if(x>=5 && x<=50 && y>=5 && y<=50 && dif>=1 && dif<=99){
        v.x = x;
        v.y = y;
        v.difficulty = dif;
        v.mode = "custom";
        NewGame();
    }else{
        alert("Hibás bemenet, probálja ujra");
    }
}