var input,output,
render=(val, type)=>{
    let htmlBlock="",htmlLine,tempBlock;
    if(type=="ip"){
        tempBlock=getHighlight(val,$("span.filename").innerText)
        size=(tempBlock.split("\n").length+"").length;
        for(i in tempBlock.split("\n")){
            str = padLeadingZeros(parseInt(i)+1,size);
            htmlLine=str+". "+tempBlock.split("\n")[i]+"<br/>";
            htmlBlock+=htmlLine;
        }
        $("p.input").innerHTML=htmlBlock;
    }else{
        $("p.output").innerText=val;
    }
},
copyToClipboard=(but)=>{
    let range = new Range();
    range.setStart($("div.outputBlock"), 0);
    range.setEnd($("div.outputBlock"),10);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
    document.execCommand('copy');
    document.getSelection().removeAllRanges();
    but.innerText="copied";
    setTimeout(e=>{
        but.innerText="Copy"
    },1000)
};
function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function getHighlight(code,filename){
    if(filename.includes(".")){
        try{
        code = hljs.highlight(code,{language:filename.split(".")[filename.split(".").length-1]}).value;
        }catch(e){
        code = code.replaceAll("<","&lt;");
        }
        return code;
    }
        code = code.replaceAll("<","&lt;");
        return code;
}
var checkURL = val =>{
    if(isValidUrl(val)==true){
        $("#fetch").style.display="block";
    }else{
        $("#fetch").style.display="none";
    }
}
// insert fetched code
var insertCode = url =>{
    $("textarea#input").disabled=true;
    let fp = fetch(url);
    fp.then(obj=>obj.text()).then(val=>{
        $("textarea#input").value=val;
        $("textarea#input").disabled=false;
        render($("textarea#input").value,'ip')
    })
    fp.catch(e=>{
    show_message("error while fetch");
    $("textarea#input").disabled=false;
    });

}
// validating url
const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}
// toggle settings menu show/hide
var toggleSettings = (a) =>
{
    if(!a)a={};
    console.log(("setting-section"))
    if($("#settings-core").style.display=="none"){
        $("#settings-core").style.display="block"
        a.innerText="Hide"
        return "shown";
    }
        $("#settings-core").style.display="none"
        a.innerText="Settings"
        return "hidden"
},
// create Default watermark
changeDefaultWM=newWM=>{
    localStorage.defaultWatermark=newWM;
}
// set default Watermark
window.addEventListener("load",ev=>{
    if(!localStorage.defaultWatermark){
        localStorage.defaultWatermark="github:sgi-capp-at2/code-highlight-n-print";
    }
    $("p#wm span").innerHTML=localStorage.defaultWatermark;
    $("#watermark-or").value=localStorage.defaultWatermark;
})
// Focus if settings url exist
var focusSettingUrl = (setting_id) =>
{
    let isShown = toggleSettings();
    if(isShown!="shown"){toggleSettings();}
    $("#"+setting_id).style.borderBottom="5px dashed red";
    setTimeout(e=>{
        $("#"+setting_id).style.borderBottom="";
    },5000)
}
// get window param and focus the setting
// get session param & move to session
window.addEventListener("load",e=>{
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('hl_st'))
    {
        focusSettingUrl(urlParams.get('hl_st'))
    }
    renderSessions();
    if(urlParams.has('loadSession')){
        moveToSession(urlParams.get('loadSession'))
    }
})
var enableSessionAutosave = () =>{
    sessionStorage.autoSave = true;
    $("#sessionName").disabled=true;
}
var showSessions = (button) =>{
    if($("sessions-saved").style.display=="none"){
        $("sessions-saved").style.display="block";
        button.innerText="Hide";
    }else{
        $("sessions-saved").style.display="none";
        button.innerText="Show";
    }
}
var renderSessions = () =>{
    let sessionList;
    try{
    sessionList = JSON.parse(localStorage.sessionsList);
    }catch(e){
    sessionList = [];
    }
    target=document.createElement("ul");
    sessionList.forEach(session=>{
        let holder = document.createElement("li");
        let date = new Date(session.sessionAt);
        holder.innerHTML=`
        <div class="sessionName">${session.sessionName}</div>
        <div class="sessionDate">${date.toLocaleString()}</div>
        <div class="sessionLink">
            <a href='?loadSession=${session.sessionID}'>Load</a>
        </div>
        `
        target.append(holder);
    });
    $("sessions-saved").append(target);
    if(sessionList.length<1){
        target.innerText="No session Records found"
    }
    target.classList.add("sessionList");
}
var moveToSession = (id) =>{
    try{
        Object.keys(domObjects).forEach(key=>{
            domObjects[key].setValue(localStorage[id+key])
        })
        let newQ = [];
        for(let i=0;i<parseInt(localStorage[id+"-list"]);i++)
        {
            newQ.push(JSON.parse(localStorage[id+"-l-"+i]));
            console.log(localStorage[id+"-l-"+i])
        }
        console.log(newQ,parseInt(localStorage[id+"-list"]))
        setQ(newQ);
        show_message("Loaded session "+id)
    }catch(e){
        show_message("Can'Load Session");
    }
}