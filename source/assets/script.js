var drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
var nameLabel = document.getElementById("nameLabel");
var menuNameLabel = document.getElementById("menuNameLabel");
var homeContainer = document.getElementById('homeContainer');
var currencyContainer = document.getElementById('currencyContainer');
var checklistContainer = document.getElementById('checklistContainer');
var startBtn = document.getElementById('standardFab');

nameLabel.textContent = "LCP Akash";
menuNameLabel.textContent = "LCP Akash";

$(document).ready(function(){
  var button = document.getElementById("menuButton");
  mdc.ripple.MDCRipple.attachTo(button);
  button.addEventListener('click', function() {
    drawer.open = true;});
})

var radios = document.querySelectorAll('input[type=radio][name="BOS_check"]');
radios.forEach(radio => radio.addEventListener('change', function(){
  if(radio.value == "No"){
    document.getElementById("boc_Btn").hidden = false;
    document.getElementById("BOC_rsn").hidden = true;
  }
  else if(radio.value == "NR"){
    document.getElementById("boc_Btn").hidden = true;
    document.getElementById("BOC_rsn").hidden = false;
  }
  else if(radio.value == "Yes"){
    document.getElementById("boc_Btn").hidden = true;
    document.getElementById("BOC_rsn").hidden = true;
  }
}));

var radios = document.querySelectorAll('input[type=radio][name="MTRAC_check"]');
radios.forEach(radio => radio.addEventListener('change', function(){
  if(radio.value == "No"){
    document.getElementById("mtrac_Btn").hidden = false;
    document.getElementById("MTRAC_rsn").hidden = true;
  }
  else if(radio.value == "NR"){
    document.getElementById("mtrac_Btn").hidden = true;
    document.getElementById("MTRAC_rsn").hidden = false;
  }
  else if(radio.value == "Yes"){
    document.getElementById("mtrac_Btn").hidden = true;
    document.getElementById("MTRAC_rsn").hidden = true;
  }
}));

var radios = document.querySelectorAll('input[type=radio][name="AOS_check"]');
radios.forEach(radio => radio.addEventListener('change', function(){
  if(radio.value == "No"){
    document.getElementById("aos_Btn").hidden = false;
    document.getElementById("AOS_rsn").hidden = true;
  }
  else if(radio.value == "NR"){
    document.getElementById("aos_Btn").hidden = true;
    document.getElementById("AOS_rsn").hidden = false;
  }
  else if(radio.value == "Yes"){
    document.getElementById("aos_Btn").hidden = true;
    document.getElementById("AOS_rsn").hidden = true;
  }
}));


const view = {
  "predrive":function(arg){
    setTimeout(function(){
      homeContainer.hidden=true;
      currencyContainer.removeAttribute("hidden");
      checklistContainer.hidden=true;
    }, 300);
    standardFab.onclick = function(){
      view.checklist()
    }
  },
  "checklist":function(arg){
    setTimeout(function(){
      homeContainer.hidden=true;
      currencyContainer.hidden=true;
      checklistContainer.removeAttribute("hidden");
    }, 300);
    standardFab.onclick = function(){
      view.init_state()
    }
  },
  "init_state":function(arg){
    setTimeout(function(){
      homeContainer.removeAttribute("hidden");
      currencyContainer.hidden=true;
      checklistContainer.hidden=true;
    }, 300);
    standardFab.onclick = function(){
      view.predrive()
    }
  }
}