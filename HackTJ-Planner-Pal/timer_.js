var cycleInterval;
var breakInterval;
var cycle;  //how long a cycle is
var b;  //how long a break is


function startTimer() {
    if(document.getElementById("timer").innerHTML == "TIMER")
    {
      cycle = parseInt(document.getElementById("cycle").value) * 60000; 
      curCycleDur = cycle;
      b = parseInt(document.getElementById("break").value) * 60000; 
      bDur = b;
    }
    var cycles = 4; 

    var currentCycle = 1;

    cycleInterval = setInterval(function() {
        document.getElementById("timer").innerHTML = "<div class = ' roboto-medium'> Cycle " + currentCycle + ": " + formatTime(curCycleDur)+"</div>";
        curCycleDur -= 1000; //subtracts 1 second from the cycle lol
        if (curCycleDur < 0) {
            clearInterval(cycleInterval);
            breakInterval = setInterval(function() { //starts the break
              document.getElementById("timer").innerHTML = "<div class = 'roboto-medium'> Break: " + formatTime(bDur) + "</div>";
              bDur -= 1000;
              if (bDur < 0) {
                clearInterval(breakInterval);
                if (currentCycle < cycles) {
                  currentCycle++;
                  curCycleDur = cycle;
                }
                else{
                    document.getElementById("timer").innerHTML = "All cycles completed!";
                }
              }
            }, 1000);
        }
    }, 1000);
}

function resumeTimer(){
  startTimer();
}

function formatTime(mili) {
    var minutes = Math.floor((mili % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((mili % (1000 * 60)) / 1000);
    return minutes + "m " + seconds + "s ";
}

function stopTimer() {
    clearInterval(cycleInterval);
    clearInterval(breakInterval);
}

