import {v} from "./Data.js";

let tID;

export function StartAnimation() { //TODO itt ez megcsinálni a spriteos megoldással
    StopAnimation();
    let  ind = 0;
    let  interval = 80;
    let tableWidth = getComputedStyle(document.querySelector("table")).width;
    tableWidth = Number(tableWidth.substring(0,tableWidth.length-2));
    let canvas = document.createElement("canvas");
    canvas.style.zIndex = "3";
    canvas.id = "Load";
    canvas.style.width = (tableWidth * 0.4) + "px";
    canvas.style.height = (tableWidth * 0.4) + "px";
    document.querySelector("th").appendChild(canvas);
    let _2d = canvas.getContext("2d");
    v.LoadSpriteSheet.src = "resources/Load.png"

    tID = setInterval ( () =>
    {
        _2d.drawImage(v.LoadSpriteSheet, ind*256, 0, 256, 256, 0, 0, canvas.width, canvas.height);
        if (ind < 7) ind++;
        else ind = 0;
    }, interval );
}
export function StopAnimation() {
    clearInterval(tID);
    if(document.querySelector("#Load") != null) document.querySelector("#Load").remove();
}