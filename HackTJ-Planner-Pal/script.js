var overbool = false;

function over(total, starttime, endtime){
  var endmin = parseInt(endtime.slice(0,-3)) * 60 + parseInt(endtime.slice(-2));
  var startmin = parseInt(starttime.slice(0,-3)) * 60 + parseInt(starttime.slice(-2));
  var min = endmin - startmin;
  if(total > min){
    alert("Your time needed exceeds the time available! Please move your end time back or move your start time forward.");
    overbool = true;
  }
};

function calculate() {  
  overbool = false;
  var starttime = document.getElementById("starttime").value;
  var endtime = document.getElementById("endtime").value;
  var task1 = document.getElementById("task1").value;
  var task1hard = document.getElementById("task1hard").value;
  var task1time = document.getElementById("task1time").value;
  var task2 = document.getElementById("task2").value;
  var task2hard = document.getElementById("task2hard").value;
  var task2time = document.getElementById("task2time").value;
  var task3 = document.getElementById("task3").value;
  var task3hard = document.getElementById("task3hard").value;
  var task3time = document.getElementById("task3time").value;
  var task4 = document.getElementById("task4").value;
  var task4hard = document.getElementById("task4hard").value;
  var task4time = document.getElementById("task4time").value;
  var task5 = document.getElementById("task5").value;
  var task5hard = document.getElementById("task5hard").value;
  var task5time = document.getElementById("task5time").value;
  var task6 = document.getElementById("task6").value;
  var task6hard = document.getElementById("task6hard").value;
  var task6time = document.getElementById("task6time").value;

  var task_to_hard = {};
  task_to_hard[task1hard] = task1;
  task_to_hard[task2hard] = task2;
  task_to_hard[task3hard] = task3;
  task_to_hard[task4hard] = task4;
  task_to_hard[task5hard] = task5;
  task_to_hard[task6hard] = task6;

  var task_to_time = {};
  task_to_time[task1] = task1time;
  task_to_time[task2] = task2time;
  task_to_time[task3] = task3time;
  task_to_time[task4] = task4time;
  task_to_time[task5] = task5time;
  task_to_time[task6] = task6time;

  console.log("task_to_hard", task_to_hard);

  var sorted_tasks = [];
  var allkeys = Object.keys(task_to_hard);
  var sort_keys = allkeys.sort();
  var k = 0;
  for (var i = 0; i < 6; i++) {
    if (sort_keys[i]!="") {
      sorted_tasks[k] = task_to_hard[sort_keys[i]];
      k+=1;
    }
  };

  // sorted_tasks: array with the tasks sorted from hardest to easiest

  var tasknum = {
    1:task1,
    2:task2,
    3:task3,
    4:task4,
    5:task5,
    6:task6
  }

  var tasks = 6;
  for (var i = 1; i <= 6; i++) {
    if (isNaN(task_to_time[tasknum[i]])) {
      tasks = i-1;
      break;
    }
  }

  console.log("tasks", tasks);

  var times = [];
  var curr = starttime;
  var total = 0;
  var x = 0;
  for (var i = 0; i < tasks; i++) 
  {
    var inttime = parseInt(task_to_time[sorted_tasks[i]]);
    total+=inttime;
    var reps = inttime/30;
    for (var j = 0; j < reps; j++) {
      var s = curr;
      console.log("s", s);
      s+=" - ";
      var intcurr = parseInt(curr.slice(-2))+(60*parseInt(curr.slice(0,-3))); //good
      var intnext = intcurr+30;
      intcurr = intnext;
      var next = Math.floor(intnext/60);
      intnext-=60*next;
      if (next>=24) {
        next-=24;
      }
      next = next.toString();
      if (intnext==0) {
        s+=next+":00";
      }
      else if (intnext==5) {
        s += next+":05";
      }
      else {
        s += next+":"+intnext.toString();
      }
      if (s.slice(-7,-6)=="-") {
        curr = s.slice(-5);
      }
      else if (s.slice(-6,-5)=="-") {
        curr = s.slice(-4);
      }
      times[x] = s;
      x+=1;

      // breaks
      if (i!=tasks-1 || j!=reps-1) {
        s = curr;
        console.log("s", s);
        s+=" - ";
        intcurr = parseInt(curr.slice(-2))+(60*parseInt(curr.slice(0,-3))); //good
        total+=5;
        intnext = intcurr+5;
        intcurr = intnext;
        next = Math.floor(intnext/60);
        intnext-=60*next;
        if (next>=24) {
          next-=24;
        }
        next = next.toString();
        if (intnext==0) {
          s += next+":00";
        }
        else if (intnext==5) {
          s += next+":05";
        }
        else {
          s += next+":"+intnext.toString();
        }
        if (s.slice(-7,-6)=="-") {
          curr = s.slice(-5);
        }
        else if (s.slice(-6,-5)=="-") {
          curr = s.slice(-4);
        }
        times[x] = s;
        x+=1;
      }
    }
  }

  over(total, starttime, endtime);

  console.log("sorted tasks", sorted_tasks);
  if (!overbool)
  {
    num_to_task = [];
    var k = 0;
    for (var i = 0; i < tasks; i++) {
      var inttime = parseInt(task_to_time[sorted_tasks[i]]);
      var reps = inttime/30;
      for (var j = 0; j < reps; j++) {
        num_to_task[k] = sorted_tasks[i];
        k+=1;
      }
    }

    console.log("num_to_task", num_to_task);

    console.log(times);
    var bob = {};
    for(var k = 1; k <= x; k++) {
      if (k%2==1) {
        bob[times[k-1]] = num_to_task[(k-1)/2];
      }
      else {
        bob[times[k-1]] = "Break "+(k/2).toString();
      }
    }
    var outputHTML = "";

    console.log(bob);

    //Returns the key/value of the object as array[[key, value]]
    var tValues = Object.entries(bob);
    outputHTML += "<table>";

    outputHTML += "<tr><th style='width:5%'><center>Done<center></th><th style='width:20%'><center>Time</center></th><th style='width:70%'><center>Task</center></th></tr>"


    for (const [key, value] of tValues)
    {
      outputHTML += "<tr style='height:25px;'>";
      outputHTML += "<td><center><input type='checkbox' class='smallerCheckbox'></center></td>";
      outputHTML += "<td class = 'roboto-regular'><center>" + key + "</center></td>";
      outputHTML += "<td class = 'roboto-regular'><center>" + value + "</center></td>"; 
      outputHTML +="</tr>";
    }
    outputHTML += "</table>";

    document.getElementById("tbody").innerHTML = outputHTML;
  }
};


