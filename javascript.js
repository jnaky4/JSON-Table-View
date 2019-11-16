var url;           
var Contributors;
var keys;

hideMe();
$(document).ready(function(){
    $("#submit").click(function(){      
        url = document.getElementById("url").value;
        alert(url);
        $(".loader").show();
        $.getJSON(url, function(result){
        Contributors = result;
        $(".loader").hide();
        showMe();
        keys = Object.keys(Contributors[0]);
        listOptions(Contributors, keys);

        });
    });
    



    
});


function loadTable(keyName){
    //console.log(keyName);
    $("#h4").show();
    $(".row").show();
    var repo = [];
    var count = [];
    var combined = [];
    document.getElementById("h4").innerHTML = keyName + "&emsp;&emsp;&emsp;count";
    
    for(let c of Contributors){
        if(repo.includes(c[keyName])){
            count[repo.indexOf(c[keyName])] += 1;
        }
        else{
            repo.push(c[keyName]);
            count.push(1);
        }  
    }
    for(var i = 0, len = repo.length; i < len; i++){
        var group = {id: repo[i], count: count[i]};
        combined.push(group); 
    }
    displayTable(combined);
}

function displayTable(combined){    
//    console.dir(combined);
    var rightcolumn = document.getElementById("bar-horzontal");
    var leftcolumn = document.getElementById("column1");
    for(var i = 0, len = combined.length; i < len; i++){
        //creates the table bars with the text inside
        var bar = document.createElement("div");
        bar.setAttribute("id", "tablebars");
        bar.innerHTML = combined[i].count;
        //sets the color of the boxes and the width
        bar.style = "width: " + combined[i].count/20 + "%;"; 
//        bar.style = "background: " + randDarkColor() + "; width: " + combined[i].count/20 + "%;";
        rightcolumn.appendChild(bar);
        
         
        var list = document.createElement("div");
        list.setAttribute("id", "rowdata");   
        list.innerHTML = combined[i].id;
        leftcolumn.appendChild(list);
    }
}
    
function randDarkColor() {
    //console.log(Contributors);
  var lum = -0.25;
  var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
    //console.dir(hex);
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
      //console.dir(c);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}

function listOptions(Contributors, keys){
    //console.dir(Object.keys(Contributors[0]));
    var list = document.getElementById("dropdownlist");
    var keys = Object.keys(Contributors[0]);
    for(var i = 0, len = keys.length; i < len; i++ ){
        var add = document.createElement("p");
        add.setAttribute("id", "items");        
        add.setAttribute("onclick", 'loadTable("' + keys[i] + '")');
        add.innerHTML = keys[i];
        list.appendChild(add);
    }    
}

function hideMe(){
    $(".loader").hide();
    $(".row").hide();
    $("#button1").hide();
    $(".dropdown").hide();
    $("#h3").hide();
    $("#h4").hide();
}

function showMe(){
    $("#button1").show();
    $("#h3").show();        
    $(".dropdown").show();
}