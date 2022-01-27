

$.ready(function(){
  
    document.getElementById("standardFa1").hidden = true
    document.getElementById("standardFa2").hidden = true
    document.getElementById("standardFa3").hidden = true
    var fabIcon = document.getElementById('fabIcon')
    var standardFab = document.getElementById('standardFab')
    var drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

        var button = document.querySelector('button');
        mdc.ripple.MDCRipple.attachTo(button);
        button.addEventListener('click', function() {
          drawer.open = true;});
})
$('#homeContainer').ready(function(){
    if(localStorage.getItem('setUp')== null){
        
        view.onboard()
 
    }else{
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id: "176297714700-ravp316n536bpg0v4c1kab5ld072fi2l.apps.googleusercontent.com"});
            homeData()
          });
    
    
    }
    if(localStorage.getItem("timerStartTime")!= null){
        timeStarted = new Date(localStorage.getItem("timerStartTime"))
        currentMS =  (Date.parse((new Date).toUTCString())-Date.parse(timeStarted.toUTCString()))
        view.timer((localStorage.getItem('timerNight')==="true"), true)
    }
    if(installPrompt._iOS()){
        installPrompt.show(true)
    }
    _generateSkillChips()

})
var timeStarted;
var currentTime;
var currentNight;
var currentMS;

const view = {
    "start":function(arg){
        document.getElementById('standardFab').hidden = true
        let drivenbelrex = localStorage.getItem("lastdrivenbelrex")
        var addbelrexmonths = new Date(drivenbelrex)
        var finalbelrexmonths = addbelrexmonths.addMonths(3)
        var belrexcheckdate = finalbelrexmonths.toDateString().slice(4)
        if(isDateBeforeToday(new Date(belrexcheckdate))==true) {
            document.getElementById('standardFab').hidden = true
                }else if(isDateBeforeToday(new Date(belrexcheckdate))==false){
            
                   
                    document.getElementById('standardFab').hidden = false
                    
                }
        console.log(localStorage)
        let belrex = document.getElementById("belrex")
        let MSS = document.getElementById("MSS")
        var timerContainer = document.getElementById('timerContainer')
        var startContainer = document.getElementById('startContainer')
        var mssContainer = document.getElementById('mssContainer')
        homeContainer.classList.add('disappearing')
        startContainer.classList.add('appearing')
        mssContainer.classList.add('appearing')
      
        if(belrex.checked){
        startContainer.hidden=false
        }
        else if(MSS.checked){
            mssContainer.hidden=false

        }
          document.getElementById("standardFab").disabled = false
          document.getElementById("standardFab").style.opacity = 1
        document.getElementById("standardFa1").hidden = true
        document.getElementById("standardFa2").hidden = true
        document.getElementById("standardFa3").hidden = true



      
 
        fabIcon.innerHTML='play_arrow'
        document.getElementById('share').hidden = true;
        document.getElementById('closeButton').hidden = false;
        if((new Date).getHours < 5 || (new Date).getHours > 21){
            var predictedTime = 'night'
        }else{
            var predictedTime = 'day'
        }
     
        if(timeChips.selectedChipIds.indexOf(predictedTime) == -1){
            document.getElementById(predictedTime).click()
        }
        document.getElementById('printButton').hidden = true;
        standardFab.onclick = function(){
            view.timer(timeChips.selectedChipIds.indexOf('night') != -1, false)
        }
        setTimeout(function(){
            homeContainer.hidden=true
            homeContainer.classList.remove('disappearing')
        }, 300)
    },
    "timer": function(night, continued){
        var homeContainer = document.getElementById('homeContainer')
        var startContainer = document.getElementById('startContainer')
        var timerContainer = document.getElementById('timerContainer')
        startContainer.classList.add('disappearing')
        homeContainer.classList.add('homeContainer')
        
     
        document.getElementById('share').hidden = true;
        document.getElementById('printButton').hidden = true;
       
        document.getElementById('closeButton').hidden = true;
        
       // standardFab.classList.add('mdc-fab--exited')
       // document.getElementById('stopFab').classList.remove('mdc-fab--exited')
        currentNight = night;
        timer.start(continued)
        setTimeout(function(){
            startContainer.hidden=true
            homeContainer.hidden=true;
        }, 300)
        if(night){
            localStorage.setItem('timerNight', true);
            if(localStorage.getItem('darkMode') != "true"){
            document.querySelector('html').classList.add("night")
            }
        }else{
            localStorage.setItem('timerNight', false);
        }
    },
    "ended": function(){
        if(localStorage.getItem('darkMode') != "true"){
        document.querySelector('html').classList.remove('night')
        }
        var timerContainer = document.getElementById('timerContainer')
        var endContainer = document.getElementById('endContainer')
        endContainer.classList.add('appearing')
        timerContainer.classList.add('disappearing')
        endContainer.hidden=false
        document.getElementById('printButton').hidden = true;
      
        standardFab.classList.remove('mdc-fab--exited')
        fabIcon.innerHTML="play_arrow"
        

        standardFab.onclick=function(){
            timer.save()
        }
        document.getElementById('stopFab').classList.add('mdc-fab--exited')
        comment.value = ""
        setTimeout(function(){
            timerContainer.hidden=true
        }, 300)
    },
    "home":function(){
        document.getElementById("standardFa1").hidden = true
        document.getElementById("standardFa2").hidden = true
        document.getElementById("standardFa3").hidden = true
        var endContainer = document.getElementById('endContainer')
        var homeContainer = document.getElementById('homeContainer')
        endContainer.classList.add('disappearing')
        homeContainer.classList.add('appearing')
        homeContainer.classList.remove('disappearing')
        homeContainer.hidden=false;
        document.getElementById('printButton').hidden = false;
       
        document.getElementById('share').hidden = false;
        document.getElementById('closeButton').hidden = true;
        $('.container').each(function() {
            if(this.id != "homeContainer"){
                this.classList.remove('disappearing')
                this.classList.remove('appearing')
                this.hidden=true;
            }
        });
        fabIcon.innerHTML='play_arrow'
        if((new Date).getHours < 5 || (new Date).getHours > 21){
            var predictedTime = 'night'
        }else{
            var predictedTime = 'day'
        }
        if(timeChips.selectedChipIds.indexOf(predictedTime) == -1){
            document.getElementById(predictedTime).click()
        }
        standardFab.onclick = function(){
            view.start()
           
        }
        fabIcon.innerHTML="timer"
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id: "176297714700-ravp316n536bpg0v4c1kab5ld072fi2l.apps.googleusercontent.com"});
            homeData()
          });
      
    },
    "onboard":function(){
        var homeContainer = document.getElementById('homeContainer')
        var onboardingContainer = document.getElementById('onboardingContainer')
        document.getElementById("standardFa1").hidden = true
        document.getElementById("standardFa2").hidden = true
        document.getElementById("standardFa3").hidden = true
        homeContainer.hidden = true
        standardFab.classList.add('mdc-fab--exited')
        onboardingContainer.classList.add('appearing')
        onboardingContainer.hidden=false
        fabIcon.innerHTML="done"
        
        loadStates()
        standardFab.onclick = function(){
            document.getElementById("identity").innerHTML = document.getElementById("rank").value + " " +document.getElementById("urname").value
            localStorage.setItem("identity", document.getElementById("identity").innerHTML ) 
      
           
            finishSetup()
        }
    }
}

const skills = [
    {id:"construction", icon:"construction", name:"Construction"},
    {id:"parking", icon:"local_parking", name:"Parking"},
    {id:"roundabouts", icon:"cached", name:"Roundabouts"},
    {id:"highways", icon:"speed", name:"Highways"},
    {id:"city", icon:"traffic", name:"City Driving"},
    {id:"winter", icon:"ac_unit", name:"Winter Driving"}
]

const timer={
    "start":function(continued){
      
        var timerContainer = document.getElementById('timerContainer')
        timerContainer.classList.add('appearing')
        timerContainer.hidden = false
        document.getElementById("standardFa1").hidden = true
        document.getElementById("standardFa2").hidden = true
        document.getElementById("standardFa3").hidden = true
        var html = document.getElementById("timer")
        standardFab.onclick=function(){
            timer.stop()
        }
        timer.update(html)
       
        if(!continued){
            currentMS = 0;
            timeStarted= new Date;
            localStorage.setItem('timerStartTime', timeStarted.toLocaleString());
            currentTime=[0,0,0]
        }
    },
    "update" : function(html){
        setTimeout(function(){
            var difference = timer.format(Date.parse((new Date).toUTCString())-Date.parse(timeStarted.toUTCString()))
          
            timer.update(html)
            currentTime = difference;
            currentMS = (Date.parse((new Date).toUTCString())-Date.parse(timeStarted.toUTCString()));
        }, 1000)
    },
    "format": function(ms) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        return [h,m,s];
    },
    "stop": function(){
timerContainer.hidden = true
        view.ended();
        let belrex = document.getElementById("belrex")
        let MSS = document.getElementById("MSS")
       
let button = document.getElementById("standardFab");
button.hidden = false
button.style.opacity = "1"
  button.disabled = false;
 





       
        var endTime = currentTime;
        currentTime =  document.getElementById('endTime').innerHTML;
        document.getElementById('endTime').innerHTML = timePrintLayout(endTime).join(':');
        
        localStorage.removeItem("timerNight");
        
        document.getElementById('drivestart').innerHTML = localStorage.getItem('timerStartTime')
        document.getElementById('driveend').innerHTML = localStorage.getItem('timerEndTime')


        var endContainer = document.getElementById('endContainer')
        if(localStorage.getItem("drivingLog") != null){
            var log = JSON.parse(localStorage.getItem("drivingLog"))
        }else{
            var log = []
        }
        var thisTrip = new Object;
        thisTrip.time = currentTime;
        thisTrip.skills = hazardChips.selectedChipIds;
        thisTrip.comment= comment.value;
        thisTrip.night= currentNight;
        thisTrip.date= (new Date).toString()
        thisTrip.ms= currentMS;
        log.push(thisTrip)
        localStorage.setItem('drivingLog', JSON.stringify(log))
    },
    "save": function(){
        let belrex = document.getElementById("belrex")
        let MSS = document.getElementById("MSS")
        if(belrex.checked){
        if(localStorage.getItem("belrextrips") != null){
            var tripnum = parseInt(localStorage.getItem("belrextrips"),10)
           tripnum= +tripnum + +1
           var realnum = tripnum
            localStorage.setItem("belrextrips",realnum)
        }
        else{
            localStorage.setItem("belrextrips",1)
        }}
        else if(MSS.checked){


            if(localStorage.getItem("msstrips") != null){
                var tripnum = parseInt(localStorage.getItem("msstrips"),10)
               tripnum= +tripnum + +1
               var realnum = tripnum
                localStorage.setItem("msstrips",realnum)
            }
            else{
                localStorage.setItem("msstrips",1)
            }
            
        } if(belrex.checked){
        if(localStorage.getItem("belrexKM") != null){
          
          
        }
        else{
            localStorage.setItem("belrexKM",0)
        }
    }
    localStorage.setItem("isdriving",true)
        console.log(localStorage)
        var snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
        snackbar.labelText = "Your drive has begun."
        snackbar.open();
        view.home();
    }
}
function printLog(){
    document.getElementById('printTableContent').innerHTML=""
    if(localStorage.getItem("drivingLog") != null){
        var log = JSON.parse(localStorage.getItem("drivingLog"))
    }else{
        snackbar.labelText = "There isn't anything on your log. You can't print it."
        snackbar.open()
        return "error"
    }
    for(var i=0;i<log.length;i++){
        document.getElementById('printTableContent').innerHTML += '<tr class="mdc-data-table__row"><th class="mdc-data-table__cell" scope="row">'+log[i].time.join(':')+'</th><th class="mdc-data-table__cell" scope="row">'+(new Date(log[i].date)).toLocaleDateString()+'</th><td class="mdc-data-table__cell" id="'+i+'night"></td><td class="mdc-data-table__cell mdc-data-table__cell--numeric">'+log[i].skills.length+'</td><td class="mdc-data-table__cell">'+log[i].comment+'</td></tr>'
        if(log[i].night){
            document.getElementById(i+'night').innerHTML="Yes"
            
        }else{
            document.getElementById(i+'night').innerHTML="No"
        }
    }
    document.getElementById('printTable').hidden = false;
    var totalHours = getTotalTime()[0]
    var nightHours = getTotalTime()[1]
    document.getElementById('printTableContent').innerHTML += "<tr class='mdc-data-table__row table-row__total'><th class='mdc-data-table__cell table-text__total' scope='row'><i class='material-icons align-bottom'>directions_car</i> Total Driving Time: "+timePrintLayout(totalHours).join(':')+"</tr><th class='mdc-data-table__cell table-text__total' scope='row'><i class='material-icons align-bottom'>nights_stay</i> Total Night Driving Time: "+timePrintLayout(nightHours).join(':')+"</th></tr>"
    printContent('printTable')
    window.print()
}
const drivingTips = ["Turn on Do Not Disturb to reduce distractions on the road.", "Try turning off driver assist features to become less dependant on these features.", "Stop driving if you feel tired", "Remember to buckle up!", "Feel free to exit the app. Your timer will stay here."]
function printContent(el){

    }
function getTotalTime(){
    if(localStorage.getItem('drivingLog') != null){
    var totalHours = 0;
    var nightHours = 0;
    var log = JSON.parse(localStorage.getItem('drivingLog'))
    for(var i=0;i<log.length;i++){
        totalHours += log[i].ms
        if(log[i].night){
            nightHours += log[i].ms
        }
    }
    totalHours = timer.format(totalHours)
    nightHours = timer.format(nightHours)
    return [totalHours, nightHours]
}else{
    return [[0,0,0],[0,0,0]]
}
}function getbelrexTotalTrips(){
    if(localStorage.getItem('belrextrips') != null){
    var belrextotaltrips = localStorage.getItem('belrextrips');
   
return[belrextotaltrips]
}
else{
   
    var belrextotaltrips = 0;
   
    return[belrextotaltrips]
}}
function getmssTotalTrips(){
    if(localStorage.getItem('msstrips') != null){
    var msstotaltrips = localStorage.getItem('msstrips');
   
return[msstotaltrips]
}
else{
   
    var msstotaltrips = 0;
   
    return[msstotaltrips]
}
}
function getbelrexTotalKM(){
    if(localStorage.getItem('belrexmileage') != null){
    var belrextotalKM = localStorage.getItem('belrexmileage');
   
return[belrextotalKM]
}
else{
   
    var belrextotalKM = 0;
   
    return[belrextotalKM]
}
}function getmssTotalKM(){
    if(localStorage.getItem('mssKM') != null){
    var msstotalKM = localStorage.getItem('mssKM');
   
return[msstotalKM]
}
else{
   
    var msstotalKM = 0;
   
    return[msstotalKM]
}
}
function submitDrive(){
    timeEnded= new Date;
    localStorage.setItem('timerEndTime', timeEnded.toLocaleString());
    if(belrex.checked){
        
    localStorage.setItem('lastdrivenbelrex', timeEnded.toDateString().slice(4));
    } else if(MSS.checked){

        localStorage.setItem('lastdrivenmss', timeEnded.toDateString().slice(4));

    }
    let oldodometer = parseFloat(document.getElementById('oldodometer').value).toFixed(2)
    let newodometer = parseFloat(document.getElementById('newodometer').value).toFixed(2)
    belrexmileage = newodometer-oldodometer
    belrexkm = getbelrexTotalKM()
    belrextotal = parseFloat(belrexmileage) + parseFloat(belrexkm)
    localStorage.setItem('belrexmileagepertrip',parseFloat(belrexmileage).toFixed(2))
localStorage.setItem("belrexmileage",belrextotal.toFixed(2))
if(localStorage.getItem("belrexmileagewindow") == null){
localStorage.setItem("belrexmileagewindow",0)
}
var ugh = parseFloat(localStorage.getItem("belrexmileagewindow"))
var pertrip = parseFloat(localStorage.getItem("belrexmileagepertrip"))
var combine = (ugh+pertrip).toFixed(2)
localStorage.setItem("belrexmileagewindow",combine)

if(parseFloat(localStorage.getItem('belrexmileagewindow')) >= 2){
    localStorage.setItem("belrexmileagewindow",0)
    localStorage.setItem('belrexcurrencywindow', null) 
}
console.log("hello")
    document.getElementById('finishdrivecontainer').hidden =true
localStorage.removeItem('isdriving')
document.getElementById('homeContainer').classList.add('appearing')
document.getElementById('homeContainer').hidden = false
document.getElementById('standardFab').hidden = false
document.getElementById('lastDrivenDate').hidden = true
document.getElementById('timerContainer').classList.add('appearing')
document.getElementById('timerContainer').classList.remove('disappearing')
document.getElementById('timerContainer').style.visibility ="visible"
authenticate().then(loadClient).then(submitgoogle)
snackbar.labelText = "Your drive has been submitted to Google Sheets"
    snackbar.open()
homeData()
}
function finishdrive(){
    document.getElementById('finishdrivecontainer').classList.add('appearing')
document.getElementById('finishdrivecontainer').hidden =false 
document.getElementById('homeContaineralt').hidden = true


}
function althomeData(){
        document.getElementById('standardFab').hidden = true
        document.getElementById('homeContainer').hidden = true
        document.getElementById('homeContaineralt').classList.add('appearing')
        document.getElementById('homeContaineralt').hidden =false 
        
        var x = localStorage.getItem("identity")
        document.getElementById("identity").innerHTML = x
        console.log("isdrivingg")
        document.getElementById('closeButton').hidden = true
        document.getElementById('timerContainer').hidden = true
        document.getElementById('timerContainer').classList.add('disappearing')
     document.getElementById('timerContainer').style.visibility ="hidden"
         
}
function setdate(){
   let newdate = document.getElementById('lastDrivenDate').value
   let newnewdate = new Date(newdate)
 console.log(newnewdate.toDateString().slice(4))
 localStorage.setItem("lastdrivenbelrex",newnewdate.toDateString().slice(4))
document.getElementById('setdate').hidden = true
document.getElementById('lastDrivenDate').hidden = true
homeData().then(view.start())
}
Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};
function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
   
}
function homeData(){
    if(localStorage.getItem('isdriving') == "true"){
        althomeData()
 
    }
    else{  
        if(gapi.auth2.getAuthInstance().isSignedIn.get() == false){
            authenticate().then(loadClient).then(executedriverdeets)
            }else if(gapi.auth2.getAuthInstance().isSignedIn.get() == true){
              executedriverdeets()
          
          
            }
       
            var snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
            snackbar.labelText = "Loading Data"
            snackbar.open();
    let button = document.getElementById("standardFab");
    let drivenbelrex = localStorage.getItem("lastdrivenbelrex")
    let drivenmss = localStorage.getItem("lastdrivenmss")
  
    
    var x = localStorage.getItem("identity")
    document.getElementById("identity").innerHTML = x
    var allTime = getTotalTime()
    var belrexTrips = getbelrexTotalTrips()
    var mssTrips = getmssTotalTrips()
    var belrexkm = getbelrexTotalKM()
    var msskm = getmssTotalKM()
    
    var addbelrexmonths = new Date(drivenbelrex)
    var finalbelrexmonths = addbelrexmonths.addMonths(3)
    var belrexcheckdate = finalbelrexmonths.toDateString().slice(4)
    console.log(finalbelrexmonths.toDateString().slice(4))
    console.log(isDateBeforeToday(new Date(belrexcheckdate)))
    console.log(belrexcheckdate)

    if(isDateBeforeToday(new Date(belrexcheckdate))==true) {
console.log("license invalid")
document.getElementById("belrexcurrencylicense").innerHTML="License Valid: No <h6>(Please contact Unit Commander to unlock your account)</h6>"

    }else if(isDateBeforeToday(new Date(belrexcheckdate))==false){

        console.log("license valid")
        document.getElementById('standardFab').hidden = false
        document.getElementById("belrexcurrencylicense").innerHTML="License Valid: Yes"
        
    }
    let belrex = document.getElementById("belrex")
    let MSS = document.getElementById("MSS")
//setting defaults
    if(belrex.checked){
console.log("belrex shown")
if(drivenbelrex == null){
    document.getElementById('lastdriven').innerHTML = "Last Driven: Nil "
    document.getElementById('lastdrivencurrency').innerHTML = "Last Driven:"
    
        }else{



var currencywindowtext = "Currency Window: "+document.getElementById('lastdrivencurrency').innerHTML+ "  To  " +finalbelrexmonths.toDateString().slice(4)
if((localStorage.getItem('belrexcurrencywindow') == null) || (localStorage.getItem('belrexcurrencywindow') == "null") ){
 localStorage.setItem('belrexcurrencywindow', currencywindowtext) 

}
document.getElementById('belrexcurrencywindow').innerHTML = currencywindowtext

if(localStorage.getItem('belrexmileagewindow')!=null){
document.getElementById('belrexcurrencymileage').innerHTML = "Current Mileage this Window: " +localStorage.getItem('belrexmileagewindow')+" KM"
        }}
        
        
    }else if(MSS.checked){
       console.log("MSS shown") 
       if(drivenmss == null){
        document.getElementById('lastdriven').innerHTML = "Last Driven: Nil "
        
            }else{
    
            }
     
       
       
    }


    var hours = JSON.parse(localStorage.getItem('hours'))
    if(allTime[0][0] >= hours[0] && allTime[1][0] >= hours[1]){
        document.getElementById('welcome-text').innerHTML = "You've finished your hours!"
    }else if(allTime[0][0] >= hours[0]){
        document.getElementById('welcome-text').innerHTML = "You Have "+allTime[1][0]+" Night Hours<br><p style='font-size:14px;' class='text-muted'>Finish up your night hours!</p>"
    }else if(allTime[0][0] != 0){
        document.getElementById('welcome-text').innerHTML = +allTime[0][0]+" Hours"
    }else if(allTime[0][1] != 0){
        document.getElementById('welcome-text').innerHTML = +allTime[0][1]+" Minutes"
    }else if(allTime[0][2] != 0){
        document.getElementById('welcome-text').innerHTML = +allTime[0][2]+"  Seconds"
    }else{
        document.getElementById('welcome-text').innerHTML = "0  Seconds"
    }
    document.getElementById('night-card-text').innerHTML = allTime[1][0]+"/"+hours[1]+" Hours Completed"
    document.getElementById('general-card-text').innerHTML = allTime[0][0]+"/"+hours[0]+" Hours Completed"
    document.getElementById('welcome-text').innerHTML += '<p style="font-size:1rem">Press <i class="material-icons align-bottom">timer</i> to start a drive</p>'
    //skills card
    if(localStorage.getItem('drivingLog') != null){
    var log= JSON.parse(localStorage.getItem('drivingLog'))
    var skillCount = new Object
    var skillsPracticed=0;
    for(var i=0;i<log.length;i++){
        var currentSkills = log[i].skills
        for(var rep=0;rep<currentSkills.length;rep++){
            if(!skillCount[log[i].skills[rep]]){
                skillCount[log[i].skills[rep]] = 0
            }
            skillCount[log[i].skills[rep]]++
            if(skillCount[log[i].skills[rep]] === 3){
                skillsPracticed++
            }
        }
    }
    document.getElementById('skill-card-text').innerHTML = skillsPracticed+"/"+skills.length+" Skills Practiced"
    document.getElementById('skillList').innerHTML = ''
    for(var i=0; i<skills.length;i++){
        if(skillCount[skills[i].id]){
            document.getElementById('skillList').innerHTML+= '<li class="mdc-list-item" tabindex="0"> <span class="mdc-list-item__ripple"></span> <span class="mdc-list-item__graphic material-icons" aria-hidden="true">'+skills[i].icon+'</span><span class="mdc-list-item__text"><span class="mdc-list-item__primary-text">'+skills[i].name+'</span> <span class="mdc-list-item__secondary-text">Practiced '+skillCount[skills[i].id]+' Times</span></span></li>'
        }else{
            document.getElementById('skillList').innerHTML+= '<li class="mdc-list-item" tabindex="0"> <span class="mdc-list-item__ripple"></span> <span class="mdc-list-item__graphic material-icons" aria-hidden="true">'+skills[i].icon+'</span><span class="mdc-list-item__text"><span class="mdc-list-item__primary-text">'+skills[i].name+'</span> <span class="mdc-list-item__secondary-text">Never Practiced</span></span></li>'
        }
    }
}else{
    document.getElementById('skill-card-text').innerHTML = "0/"+skills.length+" Skills Practiced"
    document.getElementById('skillList').innerHTML = ''
    for(var i=0; i<skills.length;i++){
        document.getElementById('skillList').innerHTML+= '<li class="mdc-list-item" tabindex="0"> <span class="mdc-list-item__ripple"></span> <span class="mdc-list-item__graphic material-icons" aria-hidden="true">'+skills[i].icon+'</span><span class="mdc-list-item__text"><span class="mdc-list-item__primary-text">'+skills[i].name+'</span> <span class="mdc-list-item__secondary-text">Never Practiced</span></span></li>'
    }
}
 }
 
}
function timePrintLayout(time){
    var output= [];
    for(var i=0;i<time.length;i++){
        var formattedNumber = ("0" + time[i]).slice(-2);
        output.push(formattedNumber)
    }
    return output
}
function loadStates(){
    $.getScript( "assets/states.js", function() {
        console.log(states)
        console.log(coys)
        var list=document.getElementById('stateSelectList')
        var coylist = document.getElementById('coySelectList')
        for(var i=0; i< states.length; i++)[
            list.innerHTML += '<li class="mdc-list-item" aria-selected="false" data-value="'+i+'" role="option"><span class="mdc-list-item__ripple"></span><span class="mdc-list-item__text">'+states[i].name+'</span></li>'
        ]
        for(var i=0; i< coys.length; i++)[
            coylist.innerHTML += '<li class="mdc-list-item" aria-selected="false" data-value="'+i+'" role="option"><span class="mdc-list-item__ripple"></span><span class="mdc-list-item__text">'+coys[i].name+'</span></li>'
        ]
        
      });
}
function expandCard(element){
    $header = $(element);
    $comments = $header.contents('.expandable')
    $comments.slideToggle(200, function () {
        //execute this after slideToggle is done
        //change text of header based on visibility of content div
    });
    

}
function discardTimer(){
    
    let button = document.getElementById("standardFab");
    document.getElementById("standardFa1").hidden = true
    document.getElementById("standardFa2").hidden = true
    document.getElementById("standardFa3").hidden = true
    
    button.style.opacity = "1"
    button.disabled = false;
    document.getElementById('stopFab').classList.add('mdc-fab--exited')
    button.classList.remove('mdc-fab--exited')
   button.hidden = false
    
  
    view.home()
  
 
}
function manualSave(element, night){
    var saveObject= new Object;
    element.querySelector('small').innerHTML = ""
    saveObject.time = [];
    if(night){
        var type="night"
    }else{
        var type="day"
    }
    for(var i=0; i<manualFields[type].length; i++){
        var field = manualFields[type][i]
        if(field.valid){
            if(field.root.id == 'comment'){
                saveObject.comment=field.value;
            }else{        
                if(field.value==""){
                    field.value ="0"
                }
                saveObject.time.push(parseInt(field.value))
            }
        }else{
            element.querySelector('small').innerHTML += "<br>Something didn't work. Make sure everything is valid."
            return 'Invalid Values'; //stops script, doesn't save
        }
    }
    saveObject.ms = (+saveObject.time[0] * (60000 * 60)) + (+saveObject.time[1] * 60000)
    saveObject.time.push(0)
    saveObject.night = night
    saveObject.skills = []
    saveObject.date=(new Date).toString()
    if(localStorage.getItem("drivingLog") != null){
        var log = JSON.parse(localStorage.getItem("drivingLog"))
    }else{
        var log = []
    }
    log.push(saveObject)
    localStorage.setItem('drivingLog', JSON.stringify(log))
    snackbar.labelText = "Your Drive Has Begun"
    snackbar.open()
  
    homeData()
}
function openShareMenu(){
    menu.open = true
    if(navigator.share){
        menu.items[1].hidden = false
    }
}
function jsShare(){
    navigator.share({
        title: "I've driven "+getTotalTime()[0][0]+" student driving hours!",
        text: "I've driven a total of "+getTotalTime()[0][0]+" hours, including "+getTotalTime()[1][0]+" night hours."
      })
}
function exportData(el){
    if(localStorage.getItem('drivingLog')!== null){
    function fallback(){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem("drivingLog"));
        el.setAttribute("href",     dataStr     );
        el.setAttribute("download", "drivingLog.json");
    }
    if(['iPad','iPhone','iPod'].includes(navigator.platform) && navigator.clipboard){
        navigator.clipboard.writeText(localStorage.getItem("drivingLog")).then(function(){
            snackbar.labelText = "Your driving log was copied to your clipboard. Save it in the notes app."
            snackbar.actionEl_.hidden=false
            snackbar.open()
            setTimeout(function(){
                snackbar.actionEl_.hidden=true
            }, (snackbar.timeoutMs + 1000))
        }).catch(function(){
            fallback()
        })
    }else{
        fallback()
        console.log('Not a iOS device with iOS 13.4 or later')
    }
    }
    snackbar.labelText = "You cant export a log with nothing on it."
    snackbar.open()
}
function deleteData(){
    var confirmed = window.confirm("Are you sure you want to DELETE your log and all other data? This action can't be undone unless you have a backup.")
    if(confirmed){
        localStorage.clear()
        location.reload()
    }
}
let deferredPrompt;
const installPrompt = {
    show:function(iOS){
        snackbar.labelText = ""
        if(!iOS){
            snackbar.labelText = "Want to install the app? Open Settings"
            document.getElementById('installItem').hidden=false
        }
        snackbar.open()
        if(iOS){
            snackbar.labelEl_.innerHTML = 'Want to install the app? Press <i class="material-icons align-bottom">ios_share</i> then click <i class="material-icons align-bottom">add_box</i> "Add to Home Screen"'
        }
    },
    install: function(){
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
        });
    },
    _iOS: function() {
        return !(('standalone' in window.navigator) && (window.navigator.standalone)) && ['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform)
    }
}
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPrompt.show(false);
  });
  var goalSetter;
  var newInputs;
  function setNewGoal(){
    if(document.getElementById('newGoalSetter') == null){
        var dialog = document.getElementById('newGoalSetterWrapper')
        dialog.innerHTML += '<div class="mdc-dialog" id="newGoalSetter"><div class="mdc-dialog__container"><div class="mdc-dialog__surface" role="alertdialog" aria-modal="true"><div class="mdc-dialog__content" id="my-dialog-content"> Setting a New Hour Goal<br><div class="hourrow"> <label class="mdc-text-field mdc-text-field--filled hour-input"> <span class="mdc-text-field__ripple"></span> <input class="mdc-text-field__input" type="number"> <span class="mdc-floating-label" id="my-label-id">Total Hours</span> <span class="mdc-line-ripple"></span> </label> <label class="mdc-text-field mdc-text-field--filled hour-input"> <span class="mdc-text-field__ripple"></span> <input class="mdc-text-field__input" type="number"> <span class="mdc-floating-label" id="my-label-id">Night Hours</span> <span class="mdc-line-ripple"></span> </label></div></div><div class="mdc-dialog__actions"> <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel"><div class="mdc-button__ripple"></div> <span class="mdc-button__label">Cancel</span> </button> <button type="button" class="mdc-button mdc-button--raised mdc-dialog__button" onclick="saveNewHours()" data-mdc-dialog-action="exit"><div class="mdc-button__ripple"></div> <span class="mdc-button__label">Save</span> </button></div></div></div><div class="mdc-dialog__scrim"></div></div>'
        goalSetter = new mdc.dialog.MDCDialog(document.getElementById('newGoalSetter'));
        newInputs = [].map.call(dialog.querySelectorAll('.hour-input'), function(el) {
            return new mdc.textField.MDCTextField(el);
          });
    }
    settings.close()
    goalSetter.open()
  }
  const readoutUnits = {
    mph: 2.23694,
    kmh: 3.6
  };
  var speedWatch;
  var currentUnit = 'kmh';
 const speedometer = {
     start: function(){
        const options = {
            enableHighAccuracy: true
          };
        if(navigator.language.split('-')[1]=="US"){
            currentUnit="mph"
        }
        console.log('Starting Speedometer')
        document.getElementById('speedometer').innerHTML="<hr><h4>Speedometer</h4><p class='text-muted'>Speed is approximate</p><h1 id='speed'>...</h1><h5>"+currentUnit+"</h5>"
        document.getElementById('speedometer').innerHTML+= "<span><small><u onclick='speedometer.switchUnits(this)'>Switch to "+((currentUnit == "mph") ? "km/h" : "mph")+ "</u></small></span>"
        document.getElementById('speedometer').hidden = false;
        speedWatch= navigator.geolocation.watchPosition(speedometer._update, null, options);
        document.getElementById('speedButton').onclick= function(){
            speedometer.stop()
        }
        if(!speedometer.noSleepLoaded){
            $.getScript( "assets/nosleep.js", function() {
                speedometer.noSleep= new NoSleep() 
                console.log("NoSleep is Ready")
                speedometer.noSleep.enable()
                speedometer.noSleepLoaded = true
              });
        }else{
            speedometer.noSleep.enable()
        }
        speedometer.started=true;
     },
     stop: function(){
        document.getElementById('speedometer').hidden = true;
        navigator.geolocation.clearWatch(speedWatch);
        document.getElementById('speedButton').onclick= function(){
            speedometer.start()
        }
        speedometer.started= false
        if(speedometer.noSleep != null){
         speedometer.noSleep.disable()
        }
     },
     _update: function(position){
        document.getElementById('speed').textContent = Math.round(
            position.coords.speed * readoutUnits[currentUnit]);
     },
     started: false,
     noSleepLoaded: false,
     noSleep: null,
     switchUnits: function(text){
        currentUnit = ((currentUnit == "mph") ? "kmh" : "mph");
        document.getElementById('speedometer').querySelector('h5').innerHTML = currentUnit;
        text.innerHTML = "Switch to "+ ((currentUnit == "mph") ? "km/h" : "mph")
        document.getElementById('speed').innerHTML="..."
     }
 }

function saveNewHours(){
    var save= [];
    save.push(newInputs[0].value)
    save.push(newInputs[1].value)
    localStorage.setItem('hours', JSON.stringify(save))
    homeData()
}
  
function toggleAlwaysNight(){
    const darkModeSwitch = new mdc.switchControl.MDCSwitch(document.getElementById('settings').querySelector('.settings-switch'));
  document.querySelector('html').classList.add("night")
    if(localStorage.getItem("darkMode")=="true"){
        localStorage.setItem("darkMode", "false")
        darkModeSwitch.checked = false
        document.querySelector('html').classList.remove('night')
    }else{
        localStorage.setItem("darkMode", "true")
        darkModeSwitch.checked = true
        document.querySelector('html').classList.add('night')
    }
}
function checking(){
 
    if(document.getElementById('checked').style.visibility == "hidden")
    {
      document.getElementById('checked').style.visibility="visible";
    }
      else{
        document.getElementById('checked').style.visibility="hidden";
    }
}


function _generateSkillChips(){
    for(var i=0; i<skills.length;i++){
        const chipEl = document.createElement('div');
        chipEl.classList.add('mdc-chip')
        chipEl.id = skills[i].id
        chipEl.innerHTML = '<div class="mdc-chip__ripple"></div> <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">'+skills[i].icon+'</i> <span class="mdc-chip__checkmark" > <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30"> <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"/> </svg> </span> <span role="gridcell"> <span role="checkbox" tabindex="0" aria-checked="false" class="mdc-chip__primary-action"> <span class="mdc-chip__text">'+skills[i].name+'</span> </span> </span>'
        hazardChips.root.appendChild(chipEl);
        hazardChips.addChip(chipEl);
    }
}
function stateHandle() {
 
    let button = document.getElementById("standardFab");

    
   
}

function disablebutton(){
    let button = document.getElementById("standardFab");
    button.disabled = true;
    button.style.opacity = "1"
}

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly"})
        .then(function() { 
            
            console.log("Sign-in successful"); 
            var snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
            snackbar.labelText = "Loading Data"
            snackbar.open();
        
        },
              function(err) { 
                var snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
                snackbar.labelText = "Error signing in"
                snackbar.open();
                console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyDy0ft9bnrHFaLABV78yM2tLGwZYP8Gj9I");
    return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
        .then(function() { console.log("GAPI client loaded for API"); 
        
    },
              function(err) { console.error("Error loading GAPI client for API", err); 
           
            });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function executebelrex() {
    return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": "1UDIbD1gNPFlv3f5MdKzvie-jo8fGmHalorCbyq0SHc0",
      "range": "A2:A"
    })
        .then(function(response) {
            let vehicleno = document.getElementById('vehicleno').value
                // Handle the results here (response.result has the parsed body).
                let result = response.result;
  let numRows = result.values ;
  let existance ="nil"
  var snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
  let button = document.getElementById("standardFab");
  let is = numRows.length
  for (var i=0; i < is; i++){
    console.log(numRows[i][0]);

  
  if (vehicleno == numRows[i][0]){
    console.log("exist")
    existance ="true"
    break
  }else{
      console.log("no exist")
      existance ="false"
  }
 
  }
  if(existance=="true"){

    snackbar.labelText = "Vehicle No (Belrex) Exists!"
    snackbar.open()
 
   
    button.disabled = false;
    button.style.opacity = 1;
}else{
 snackbar.labelText = "ERROR: Vehicle No (Belrex) Doesnt Exist!"
    snackbar.open()
    button.disabled = false;
    button.style.opacity = 1;
}
 

              },
              function(err) { console.error("Execute error", err); });
  }
  function executeMSS() {
    return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": "1UDIbD1gNPFlv3f5MdKzvie-jo8fGmHalorCbyq0SHc0",
      "range": "B2:B"
    })
        .then(function(response) {
            let vehicleno = document.getElementById('vehicleno').value
            var snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
                // Handle the results here (response.result has the parsed body).
                let result = response.result;
                let numRows = result.values ;
                let existance ="nil"
                let button = document.getElementById("standardFab");
                
                let is = numRows.length
                for (var i=0; i < is; i++){
                console.log(numRows[i][0]);
                if (vehicleno == numRows[i][0]){
              console.log("exist")
              existance ="true"
              break
                }else{
                    console.log("no exist")
                    existance ="false"
                }
               
                }
                if(existance=="true"){
                 
    snackbar.labelText = "Vehicle No (MSS) Exists!"
    snackbar.open()
 
                  button.disabled = false;
    button.style.opacity = 1;
              }else{
                snackbar.labelText = "ERROR: Vehicle No (MSS) Doesnt Exist!"
                snackbar.open()
                  button.disabled = false;
                  button.style.opacity = 1;
              }   },
              function(err) { console.error("Execute error", err); });
  }
  function submitgoogle() {
    let belrex = document.getElementById("belrex")
    let vehicleno = document.getElementById('vehicleno').value.toString()
    let starttime = document.getElementById('starttime').value.toString()
    let endtime = document.getElementById('endtime').value.toString()
    let oldodometer = document.getElementById('oldodometer').value.toString()
    let newodometer = document.getElementById('newodometer').value.toString()
    let toplace = document.getElementById('toplace').value.toString()
    let fromplace =  document.getElementById('fromplace').value.toString()
    let purpose = document.getElementById('Purpose').value.toString()
    if(belrex.checked){
        driverplatform ="BELREX"
 
    }
      drivername = document.getElementById('identity').innerHTML.toString()
      const str = document.getElementById('fleet').innerHTML.toString()
      const words = str.split(' ');
     drivercompany=words[1]
     driverdate = new Date().toLocaleDateString('en-SG')
     drivervehicleno = vehicleno
     driverstarttime = starttime
     driverendtime = endtime
     driveroldodometer = oldodometer
     drivernewodometer = newodometer
     drivermileage = newodometer-oldodometer
     drivertoplace = toplace
     driverfromplace = fromplace
     driverpurpose = purpose
    return gapi.client.sheets.spreadsheets.values.append({
      "spreadsheetId": "1UDIbD1gNPFlv3f5MdKzvie-jo8fGmHalorCbyq0SHc0",
      "range": "C2:C",
      "valueInputOption": "USER_ENTERED",
      "resource": {
        "values": [
          [
            drivername,
            drivercompany,
            driverdate,
            driverplatform,
            drivervehicleno,
            driverstarttime,
            driverendtime,
            driveroldodometer,
            drivernewodometer,
            drivermileage,
            driverfromplace,
            drivertoplace,
            driverpurpose

          ]
        ]
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }

  function executedriverdeets() {
    return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": "1UDIbD1gNPFlv3f5MdKzvie-jo8fGmHalorCbyq0SHc0",
      "range": "C1:O"
    })
        .then(function(response) {
        
                // Handle the results here (response.result has the parsed body).
                let result = response.result;
  let numRows = result.values ;
  let is = numRows.length
  var belrextotsmileage = 0
  var msstotsmileage = 0
  var belrextotstrips = 0
  var msstotstrips = 0
  const belrexdates = []
  const mssdates = []
for(i=0;i<is;i++){
    
if(numRows[i][0] ==localStorage.getItem('identity')){

var mileeagge = numRows[i][9]

if(numRows[i][3] == "BELREX"){
 belrextotsmileage = parseFloat(belrextotsmileage) + parseFloat(mileeagge)
 belrextotstrips = parseInt(belrextotstrips)+1
 var formatdate = numRows[i][2]
 formatdate = formatdate.substr(3, 2)+"/"+formatdate.substr(0, 2)+"/"+formatdate.substr(6, 4);

 
  belrexdates.push(new Date(formatdate))

} else if(numRows[i][3] == "MSS"){
    msstotsmileage = parseFloat(msstotsmileage) + parseFloat(mileeagge)
    msstotstrips = parseInt(msstotstrips)+1
 
   var formatdate = numRows[i][2]
   formatdate = formatdate.substr(3, 2)+"/"+formatdate.substr(0, 2)+"/"+formatdate.substr(6, 4);

   
    mssdates.push(new Date(formatdate))
}

}else{

    
}

}

  console.log(belrextotsmileage.toFixed(1))
  const belrexmaxDate = new Date(Math.max.apply(null, belrexdates));
  console.log(belrexmaxDate.toLocaleDateString('en-SG'))
 var mssmaxDate = new Date(Math.max.apply(null, mssdates));
  console.log(mssmaxDate.toLocaleDateString('en-SG'))

  console.log(msstotsmileage.toFixed(1))
  var belrexstartDate = new Date(belrexmaxDate)
  var belrexnewendate = new Date(belrexmaxDate.addMonths(3))

    var belrexcheckdate = belrexnewendate.toDateString().slice(4)
    console.log(belrexnewendate.toDateString().slice(4))
    console.log(isDateBeforeToday(new Date(belrexcheckdate)))
    console.log(belrexcheckdate)
    if(isDateBeforeToday(new Date(belrexcheckdate))==true) {
        console.log("license invalid")
        document.getElementById("belrexcurrencylicense").innerHTML="License Valid: No <h6>(Please contact Unit Commander to unlock your account)</h6>"
        
            }else if(isDateBeforeToday(new Date(belrexcheckdate))==false){
        
                console.log("license valid")
                document.getElementById('standardFab').hidden = false
                document.getElementById("belrexcurrencylicense").innerHTML="License Valid: Yes"
                
            }
  if(document.getElementById('belrex').checked){
  document.getElementById('totalkm').innerHTML = +belrextotsmileage.toFixed(1)+ " KM&nbsp"
  document.getElementById('totaltrips').innerHTML = +belrextotstrips+ "  Trips"
  document.getElementById('lastdriven').innerHTML = "Last Driven: "+belrexstartDate.toLocaleDateString('en-SG')
  document.getElementById('license').innerHTML ="May 01 2022"
  document.getElementById('lastdrivencurrency').innerHTML ="Last Driven: "+belrexstartDate.toLocaleDateString('en-SG')
  document.getElementById('belrexcurrencywindow').innerHTML ="Currency Window: "+belrexstartDate.toLocaleDateString('en-SG')+" To "+belrexnewendate.toLocaleDateString('en-SG')
  }else if (document.getElementById('MSS').checked){
    document.getElementById('totalkm').innerHTML = +msstotsmileage.toFixed(1)+ " KM&nbsp"
    document.getElementById('totaltrips').innerHTML = +msstotstrips+ "  Trips"
    document.getElementById('lastdriven').innerHTML = "Last Driven: "+mssmaxDate.toLocaleDateString('en-SG')
    document.getElementById('license').innerHTML ="Oct 27 2021"
  }
              },
              function(err) { console.error("Execute error", err); });
  }


 