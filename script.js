var timer = document.querySelector('#timer');
var isIntervalInProgress = false;
var fill = document.querySelector('#fill');
var fillingInProgress = false;

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
        ogTime =Number(timer.textContent);
        filledCounter = ogTime * 60;
    }
    fillingInProgress = true;
    intervalTime = setInterval(function(){
        //get timer value and check if finished
        timerVal = Number(timer.textContent);
        if(timerVal === 0.00){
            timer.textContent = "BUZZZ!";            
            isIntervalInProgress = false;
            clearInterval(intervalTime);
            return;
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
        timer.textContent = timerVal;
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
    fill.style.background = '#938E94';
    clearInterval(intervalTime);
    isIntervalInProgress = false;
    fillingInProgress = false;
});

// increase/decrease timer
var incrBtn = document.querySelector('#btnIncr');
var decrBtn = document.querySelector('#btnDecr');

incrBtn.addEventListener('click', incDec);
decrBtn.addEventListener('click', incDec);

function incDec() {
    if(!isIntervalInProgress){
        var timerVal = Number(timer.textContent);
        if(this.id === "btnDecr") {   
            // don't allow timer to go below zero
            if(timerVal < 1.01){
                return;
            }
            timerVal -= 1;        
        }
        else {
            timerVal += 1;
        }    
        timer.textContent = timerVal;
    }
}

// add the break timer