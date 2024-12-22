import {v} from './Data.js';
import {RightClick, LeftClick} from './Minesweeper.js';
import {StopTimer} from './Timer.js';

export function HowManyBomb(x, y){
    let db = 0;
    y -= 1;
    Search();
    x -= 1;
    Search();
    y += 1;
    Search();
    y += 1;
    Search();
    x += 1;
    Search();
    x += 1;
    Search();
    y -= 1;
    Search();
    y -= 1;
    Search();
    function Search(){
        for(let item of v.fieldsData){
            if (y == item.y && x == item.x && item.isBomb){
                db++;
                break;
            }
        }
    }
    return db;
}
export function HowManyFlag(x, y){
    let count = 0;
    y -= 1;
    Search();
    x -= 1;
    Search();
    y += 1;
    Search();
    y += 1;
    Search();
    x += 1;
    Search();
    x += 1;
    Search();
    y -= 1;
    Search();
    y -= 1;
    Search();
    function Search(){
        for(let item of v.fieldsData){
            if (y == item.y && x == item.x && item.state == "flag"){
                count++;
                break;
            }
        }
    }
    return count;
}
export function OpenNear(x, y){
    y -= 1;
    Open();
    x -= 1;
    Open();
    y += 1;
    Open();
    y += 1;
    Open();
    x += 1;
    Open();
    x += 1;
    Open();
    y -= 1;
    Open();
    y -= 1;
    Open();
    function Open(){
        for (let i = 0; i < v.fieldCount; i++){
            if (v.fieldsData[i].state == "close" && v.fieldsData[i].x == x && v.fieldsData[i].y == y){
                OpenPossible(x, y, i);
            }
        }
    }
}
export function OpenPossible(x, y, i){
    let count = HowManyBomb(x, y);

    if (v.fieldsData[i].isBomb){
        document.getElementById(i).style.backgroundImage = v.redBombImage;
        GameOver();
    }
    else if (count != 0){
        document.getElementById(i).style.backgroundImage = v.openImage;
        v.fieldsData[i].state = "open";
        v.openCount += 1;
        v.fields[i].innerHTML = count;
        switch (count){
            case 1:  v.fields[i].style.color = "rgba(32, 78, 234, 255)"; break;
            case 2:  v.fields[i].style.color = "rgba(45, 191, 20, 255)"; break;
            case 3:  v.fields[i].style.color = "rgba(247, 26, 26, 255)"; break;
            case 4:  v.fields[i].style.color = "rgba(87, 18, 183, 255)"; break;
            case 5:  v.fields[i].style.color = "rgba(168, 65, 17, 255)"; break;
            case 6:  v.fields[i].style.color = "rgba(25, 241, 205, 255)"; break;
            case 7:  v.fields[i].style.color = "rgba(37, 0, 31, 255)"; break;
            case 8:  v.fields[i].style.color = "rgba(209, 255, 12, 255)"; break;
        }
        VictoryCheck();
    }
    else{
        document.getElementById(i).style.backgroundImage = v.openImage;
        v.fieldsData[i].state = "open";
        OpenNear(x, y);
        v.openCount += 1;
        VictoryCheck();
    }
}
export function OpenOnNumber(x, y){
    if (HowManyBomb(x,y) <= HowManyFlag(x, y)){
        OpenNear(x, y);
    }
}
export function GameOver(){
    StopTimer();
    for (let item of v.fields){
        item.removeEventListener('mousedown',LeftClick);
        item.removeEventListener('contextmenu',RightClick);
    }
    v.endGameP.innerHTML = "Vereség";
    for (let i = 0; i < v.fieldCount; i++){
        if (v.fieldsData[i].state == "flag" && !(v.fieldsData[i].isBomb)){
            document.getElementById(i).style.backgroundImage = v.redFlagImage;
        }
        else if(v.fieldsData[i].isBomb && v.fields[i].style.backgroundImage != v.redBombImage && v.fields[i].style.backgroundImage != v.flagImage && v.fields[i].style.backgroundImage != v.redFlagImage){
            document.getElementById(i).style.backgroundImage = v.bombImage;
        }
    }
}
export function VictoryCheck(){
    if (v.openCount == v.fieldCount - v.bombCount){
        StopTimer();
        for (let item of v.fields){
            item.removeEventListener('mousedown',LeftClick);
            item.removeEventListener('contextmenu',RightClick);
        }
        v.endGameP.innerHTML = "Győzelem";
        for (let i = 0; i < v.fieldCount; i++){
            if (v.fieldsData[i].isBomb){
                document.getElementById(i).style.backgroundImage = v.flagImage;
            }
        }
        v.flagLeft = 0;
        v.flagLeftP.innerHTML = "0";

        let name = document.querySelector("#name").innerHTML;
        let ido = document.querySelector("#TimerP").innerHTML;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {};
        xhr.open('GET', 'DatabaseManager.php?name='+name+'&time='+ido+'&mod='+v.mode);
        xhr.send()
    }
}