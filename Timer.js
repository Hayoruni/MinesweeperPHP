import {v} from "./Data.js";

export function StartTimer(){
    v.timerOn = true;
    v.startTime = new Date().getTime();
    v.interval = setInterval(UpdateTimer, 1000);
}
export function ContinueTimer(){
    v.timerOn = true;
    let timeNow = new Date().getTime();
    v.startTime += timeNow- v.startTime - v.elapsed;
    v.interval = setInterval(UpdateTimer, 1000);
}
export function ResetTimer(){
    StopTimer();
    v.elapsed = 0;
    v.timerP.innerHTML = "0";
}
export function StopTimer(){
    v.timerOn = false;
    clearInterval(v.interval);
    v.interval = null;
}
export function UpdateTimer(){
    if(v.timerOn){
        let currentTime = new Date().getTime();
        v.elapsed = currentTime - v.startTime;
        v.timerP.innerHTML = Math.floor(v.elapsed / 1000);
    }
}