var stateObject = {
    "API 650": {
        "Seventh and Later": [["Butt"],["basic standard","Annex A spot Rt","Annex A no Rt"]],
        "First to Sixth": [["Butt"],["Basic standard","Annexes D and G"]]
    },
    "API 12C": {
        "14th and 15th ": [["Butt"],["N/A"]],
        "3rd to 13th": [["Butt_c", "Lap_a"],["3/8 in.max. t","N/A"]],
        "First and Second": [["Lap_a", "Lap_b", "Butt_c"],["7/16 in.max. t","1/4 in.max. t","N/A"]],
    },
    "Unknown": {
        "N/A": [["Lap_a", "Lap_b","Butt","Lap_d"],["7/16 in.max. t","1/4 in.max. t","N/A"]]
    }
}

var jointEfficiency =function(){
    if(standard.value.length==0)return
    if(edition.value.length==0)return
    if(typeOfJoint.value.length==0)return
    if(applicable.value.length==0)return 
    if(applicable.value==="basic standard"&&edition.value==="Seventh and Later")document.getElementById("answer").value = "1";
    if(applicable.value==="Annex A spot Rt"&&edition.value==="Seventh and Later")document.getElementById("answer").value = "0.85";
    if(applicable.value==="Annex A no Rt")document.getElementById("answer").value = "0.7";
    if(applicable.value==="Basic standard"&&edition.value==="First to Sixth")document.getElementById("answer").value = "0.85";
    if(applicable.value==="Annexes D and G")document.getElementById("answer").value = "1";
    if(applicable.value==="N/A")document.getElementById("answer").value = "0.85";
    if(applicable.value==="3/8 in.max. t")document.getElementById("answer").value = "0.75";
    if(applicable.value==="7/16 in.max. t")document.getElementById("answer").value = "0.7";
    if(applicable.value==="1/4 in.max. t")document.getElementById("answer").value = "0.55";
    if(applicable.value==="N/A"&&edition.value=="N/A")document.getElementById("answer").value = "0.7";
    if(typeOfJoint.value=="Lap_d"&&applicable.value==="N/A")document.getElementById("answer").value = "0.35";
 
}

window.onload = function(){
    var standard = document.getElementById("standard"),
        edition = document.getElementById("edition"),
        typeOfJoint = document.getElementById("typeOfJoint");
        applicable= document.getElementById("applicable");
    for (let std in stateObject) {
        standard.options[standard.options.length] = new Option(std, std);
    }
    standard.onchange = function(){
        edition.length = 1;
        typeOfJoint.length = 1;
        if(this.selectedIndes < 1) return;
        for(let edyr in stateObject[this.value]){
            edition.options[edition.options.length] = new Option(edyr, edyr);
        }
    }
    edition.onchange = function(){
        typeOfJoint.length = 1;
        if(this.selectedIndex < 1) return;
        var type = stateObject[standard.value][this.value][0];
        for(let i = 0; i < type.length; i++){
            typeOfJoint.options[typeOfJoint.options.length] = new Option(type[i], type[i]);
        }
    }
    
    typeOfJoint.onchange=function(){
        applicable.length = 1;
        var type = stateObject[standard.value][edition.value][1];
        for(let i = 0; i < type.length; i++){
            applicable.options[applicable.options.length] = new Option(type[i], type[i]);
        }
    }

  

}
