var states =[
     {name:"30SCE", total:40, night:10,}, {name:"3TPT", total:30, night:10}, 
]

var coys = [

    {name:'ALPHA'},{name:'BRAVO'},{name:'CHARLIE'},{name:'ME'},{name:'HQ'}
]
document.addEventListener("MDCSelect:change", function(index){
    if(typeof states[stateSelect.selectedIndex].message != 'undefined'){
        document.getElementById('setupMessage').innerHTML= states[stateSelect.selectedIndex].message
    }else{
        document.getElementById('setupMessage').innerHTML= ""
    }
    fabCheck()
})
setupInputs[1].root.addEventListener("input", function(){
    fabCheck()
})
setupInputs[0].root.addEventListener("input", function(){
    fabCheck()
})

function fabCheck(){
    var blank =2;
    $.each(setupInputs, function(index){
        var value=setupInputs[index]
        if(value.value !="" && !isNaN(value.value)){
            blank--
        }
    })
    if(blank==0){
        standardFab.classList.remove('mdc-fab--exited')
    }else if(stateSelect.selectedIndex != -1){
        standardFab.classList.remove('mdc-fab--exited')
    }else{
        standardFab.classList.add('mdc-fab--exited')
    }
}
function finishSetup(){
    var hours = []
    var blank=2
    $.each(setupInputs, function(index){
        var value=setupInputs[index]
        if(value.value !="" && !isNaN(value.value)){
            blank--
        }
    })
    if(blank==0){
        $.each(setupInputs, function(index){
            var value=setupInputs[index]
            hours.push(parseInt(value.value))
        })
    }else{
        var state = states[stateSelect.selectedIndex]
        hours = [state.total, state.night]
    }
    console.log(hours)
    localStorage.setItem('hours', JSON.stringify(hours))
    localStorage.setItem('setUp', true)
    view.home()
}

var importJSON;
function importData(){
    if(document.getElementById('importJSON') == null){
        var dialog = document.getElementById('importJSONWrapper')
        dialog.innerHTML += '<div class="mdc-dialog" id="importJSON"><div class="mdc-dialog__container"><div class="mdc-dialog__surface" role="alertdialog" aria-modal="true"><div class="mdc-dialog__content" id="my-dialog-content"> Importing Data<br><p>Upload the drivingLog.json that you downloaded when you exported your data.</p><br><input type="file" accept="application/json" id="importInput"><br><br><h6>Importing from an iOS device? <a href="about.html#help">(Help)</a></h6><input id="importText" placeholder="Paste the copied JSON text" style="background-color:var(--dark-theme-text-input); width: 100%;"></div><div class="mdc-dialog__actions"> <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel"><div class="mdc-button__ripple"></div> <span class="mdc-button__label">Cancel</span> </button> <button type="button" class="mdc-button mdc-button--raised mdc-dialog__button" onclick="importUploaded()" data-mdc-dialog-action="exit"><div class="mdc-button__ripple"></div> <span class="mdc-button__label">Import</span> </button></div></div></div><div class="mdc-dialog__scrim"></div></div>'
        importJSON = new mdc.dialog.MDCDialog(document.getElementById('importJSON'));
    }
    importJSON.open()
}
function importUploaded(){
    var log;
    if(document.getElementById('importInput').files[0]&&document.getElementById('importInput').files[0].type == 'application/json'){
        const objectURL = window.URL.createObjectURL(document.getElementById('importInput').files[0]);
        $.getJSON( objectURL, function( data ) {
            log = data;
            localStorage.setItem('drivingLog', JSON.stringify(log))
            snackbar.labelText = "Your log has been imported. Put in your hours to finish setup"
            snackbar.open()
        });
    }else{
        var input= document.getElementById("importText")
        try{
            //Test inputted JSON text, if
            log = JSON.parse(input.value)
            log = JSON.stringify(log)
            localStorage.setItem('drivingLog', log)
            snackbar.labelText = "Your log has been imported. Put in your hours to finish setup"
            snackbar.open()
        }catch(err){
            window.alert("The text you inputted is not a valid driving log. Technical details: "+err)
        }
    }
}