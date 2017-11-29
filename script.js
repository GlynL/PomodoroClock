var timer = document.querySelector('#timer');
var isIntervalInProgress = false;
var breakTime = document.querySelector('#breakTime');
var timeDisplay = document.querySelector('#timeDisplay')
var fill = document.querySelector('#fill');
var fillingInProgress = false;
var timerSwitch = true;
var workTimer = 25;
var breakTimer = 5;
var intervalTime;
var counter, ogTime, filledCounter;


// set interval timer for every second
function countdown(){
    // check if interval has already started 
    if(!isIntervalInProgress){
        // start countdown
        isIntervalInProgress = true;
        intervalTimer();
    }
}

function intervalTimer(){
    
    if(!fillingInProgress){
        counter = 0;
        if(timerSwitch){
            timer.textContent = workTimer;
            ogTime = Number(timer.textContent);
        }
        else {
            breakTime.textContent = breakTimer;
            ogTime = Number(breakTime.textContent);
        }
        
        filledCounter = ogTime * 60;
    }
    fillingInProgress = true;
    intervalTime = setInterval(function(){
        if(timerSwitch){
            var timerVal = Number(timer.textContent);
        }
        else{
            var timerVal = Number(breakTime.textContent);
        }

        // filling of timer 
         counter++;
         if(counter<=filledCounter){
             fill.style.background= 'linear-gradient(to top, #9c7d66 ' + (counter/ogTime)/60*100 + '%, #938E94 0%)';
         }       

        timerVal -= 0.01;
        // convert to 2 decimal places - floating point imprecision
        // toFixed converts to string - convert back to number
        timerVal = Number(timerVal.toFixed(2));
        // check if it's a new minute and we need .59 not .99
        // also floating point imprecision with % method and toFixed converting to string
        // or statement added as equation doesn't work if timer set to 1
        if(Number((timerVal % Math.floor(timerVal)).toFixed(2)) === 0.99 || timerVal === 0.99){
            timerVal = Math.floor(timerVal) + .59;
        }
        // adjust text to display new time
        if(timerSwitch){
            timer.textContent = timerVal;
        }
        else{
            breakTime.textContent = timerVal;
        }
        timeDisplay.textContent = timerVal;
        
        // check if finished
        if(timerVal === 0.00){
            timerSwitch = !timerSwitch;
            fill.style.background = '#938E94';
            isIntervalInProgress = false;
            fillingInProgress = false;
            clearInterval(intervalTime);
            countdown();
        } 

        }, 1000);
}
    

// start interval timer
var startBtn = document.querySelector('#btnStart');
startBtn.addEventListener('click', countdown);

// stop interval timer
var stopBtn = document.querySelector('#btnStop');
stopBtn.addEventListener('click', function(){
    clearInterval(intervalTime);
    isIntervalInProgress = false;
});

// reset timer
var resetBtn = document.querySelector('#btnReset');
resetBtn.addEventListener('click', function(){
    timer.textContent = "25";
    breakTime.textContent = "5";
    fill.style.background = '#938E94';
    clearInterval(intervalTime);
    isIntervalInProgress = false;
    fillingInProgress = false;
    timerSwitch = true;
    timeDisplay.textContent = "25";
    breakTimer = 5;
    workTimer = 25;
});

// increase/decrease timer
var incrBtn = document.querySelector('#btnIncr');
var decrBtn = document.querySelector('#btnDecr');

incrBtn.addEventListener('click', incDec);
decrBtn.addEventListener('click', incDec);

function incDec() {
    if(!isIntervalInProgress){
        if(this.id === 'breakIncr' || this.id === 'breakDecr'){
            var timerVal = Number(breakTime.textContent);
        }
        else{
            var timerVal = Number(timer.textContent);
        }

        if(this.className === 'btnStd decrBtn') {   
            // don't allow timer to go below zero
            if(timerVal < 1.01){
                return;
            }
            timerVal -= 1;        
        }
        else {
            timerVal += 1;
        }

        if(this.id === 'breakIncr' || this.id === 'breakDecr'){
            breakTime.textContent = timerVal;
            breakTimer = timerVal;
        }
        else{
            timer.textContent = timerVal;
            workTimer = timerVal;
        }

    }
}

var incrBreak = document.querySelector('#breakIncr');
var decrBreak = document.querySelector('#breakDecr');

incrBreak.addEventListener('click', incDec);
decrBreak.addEventListener('click', incDec);
