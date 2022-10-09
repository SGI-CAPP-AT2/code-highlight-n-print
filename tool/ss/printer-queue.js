let queue = [],
// All inputs
domObjects = {
    title:{
        value:()=>$("input.optionaltext").value,
        setValue:nV=>{
            $("input.optionaltext").value=nV;
        }
    },
    code:{
        value:()=>$("textarea#input").value,
        setValue:nV=>{
            $("textarea#input").value=nV;
        }
    },
    output:{
        value:()=>$("textarea.input_of_op").value,
        setValue:nV=>{
            $("textarea.input_of_op").value=nV;
        }
    },
    filename:{
        value:()=>$("input#filename").value,
        setValue:nV=>{
            $("input#filename").value=nV;
        }
    },
    rtf:{
        value:()=>$("#rtf_op span").innerHTML,
        setValue:nV=>{
            $("#rtf_op span").innerHTML=nV;
        }
    },
    watermark:{
        value:()=>$("#wm span").innerHTML,
        setValue:nV=>{
            $("#wm span").innerText=nV;
        }
    },
    rtfBool:{
        value:()=>$("#rtf_bool").value,
        setValue:nV=>{
            $("#rtf_bool").value=nV;
        }
    }
};
function setQ(array){
    queue=array;
    updateUIqueue();
}
// Print 
function PRINT(){
    let list = [...queue];
    let i = 0;
    if(list.length!=0){
    list.forEach(el=>{
        sessionStorage["l-"+i++]=JSON.stringify(el);
    })
    sessionStorage.list=i;
    let pbVal = $("select#p_b_p").value;
    console.log(pbVal)
    window.location.assign(
        "print.html?pb="+pbVal
    )
    }else{
       show_message("nothing listed for print")
    }
}
// Add current inputs to queue
const addToQueue = () =>{
    let tmp = {};
    
    Object.keys(domObjects).forEach(key=>{
        tmp[key]=domObjects[key].value()
    })
    tmp.title="• "+tmp.title;
    queue.push(tmp);
    updateUIqueue();
    saveRecent();
},
// Show list in UI
updateUIqueue = () =>{
    let html="",rtfDisplay,deleter=$("select#select_del"),i;
    deleter.disabled=true;
    if(queue.length!=0){
    deleter.disabled=false;
    i = 0;
    deleter.innerHTML="<option default>none</option>";
    queue.forEach(cq=>{
        deleter.innerHTML+=`<option>${i+1}</option>`;
        if(cq.rtfBool=="true"){rtfDisplay="inline"}else{rtfDisplay="none"}
        html+=`<div style="margin:0 20px;">
        <h3>
        ${++i}.${cq.title}
        </h3>
        <div class="outputBlock" style="margin-top:10px">
        <p class="filenames"><span class="filename">${cq.filename}</span></p>
        <p class="input">${sendCodeHighlight(cq.code,cq.filename)}</p>
        <p class="output">${cq.output}</p>
        <p align="center" class="img">
            <span style="display: ${rtfDisplay};" class="imageOutput">
            ${cq.rtf}
            </span>
        </p>
        <p class="wm" align="right">
            <span>
            ${cq.watermark}
            </span>
        </p>
        </div></div>
        `
    })
    show_message("Added "+queue[queue.length-1].filename+" to list successfully");
    }else{
        html="Nothing found in queue"
    }
    $("div.queue #list").innerHTML=html;
},
// Delete a queue from list using @index
del = index =>{
    if(index!="none")
    {
    queue.splice(index-1,1);
    console.log(queue);
    updateUIqueue();
    }
},
// Get highlighted HTml Block
sendCodeHighlight=(val,lang)=>{
    let htmlBlock="",htmlLine,tempBlock;
        tempBlock=getHighlight(val,lang)
        size=(tempBlock.split("\n").length+"").length;
        for(i in tempBlock.split("\n")){
            str = "<span class='ln'>"+padLeadingZeros(parseInt(i)+1,size)+"</span>";
            htmlLine=str+tempBlock.split("\n")[i]+"<br>";
            htmlBlock+=htmlLine;
        }
        return htmlBlock;
};
// Load recent session 
var SavedCurrent;
var addToSessionsList = (json) =>{
    let list;
    try{
        list=JSON.parse(localStorage.sessionsList);
    }catch(e){
        list=[];
    }
    list.push(json);
    localStorage.sessionsList=JSON.stringify(list);
    localStorage.sessionsSaved=list.length;
}
let sessionID;
var saveRecent = () =>{
    if(sessionStorage.autoSave=="true"){
        if(!sessionID){
            sessionID = $("#sessionName").value+(localStorage.sessionsList||" ").length;
        }
        let list = [...queue];
        let i = 0;
        if(list.length!=0){
            list.forEach(el=>{
                localStorage[sessionID+"-l-"+i++]=JSON.stringify(el);
            })
            localStorage[sessionID+"-list"]=i;
        }
        Object.keys(domObjects).forEach(key=>{
            localStorage[sessionID+key]=domObjects[key].value()
        })
        if(SavedCurrent!=true){
            addToSessionsList({
                sessionID:sessionID,
                sessionName:$("#sessionName").value,
                sessionAt:Date.now()
            })
            SavedCurrent=true;
        }
    }
};
var savedIsTrue = (id) =>{
    SavedCurrent=true;
    sessionID=id;
}