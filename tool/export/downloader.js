$=q=>document.querySelector(q)
var sessionJSON={};
var domObjects = 
{
    Name:$("#name .val"),
    time:$("#time .val"),
    id:$("#id .val"),
    exportType:$("#exportType .val"),
    size:$("#size .val"),
    prev:$("#preview .val"),
    download:$("#download .val")
}
var seperateExports = [
    "title","code","output","filename","rtf","watermark","rtfBool"
]
var exporter = (session) =>{
    sessionJSON.inputValues={}
    for(exp of seperateExports)
    {
        sessionJSON.inputValues[exp]=localStorage[session.sessionID+exp]
    }
    let newQ = [],id=session.sessionID;
    for(let i=0;i<parseInt(localStorage[id+"-list"]);i++)
    {
        newQ.push(JSON.parse(localStorage[id+"-l-"+i]));
        console.log(localStorage[id+"-l-"+i])
    }
    sessionJSON.printList=newQ;
    let url = getObjectString(JSON.stringify(sessionJSON))
    updateUIElements(session,url);
},
updateUIElements = (session,url) => {
    domObjects.Name.innerText=session.sessionName;
    let date = new Date();
    domObjects.time.innerText=date.toLocaleString(parseInt(session.sessionAt))
    domObjects.id.innerText=session.sessionID;
    domObjects.prev.innerText=(JSON.stringify(sessionJSON))
    domObjects.size.innerText=(byteCounts(JSON.stringify(sessionJSON))/(1024)+'') + ' kb';
    let a = document.createElement("a");
    a.href=url;
    a.download=session.sessionName+".chnp-session-json"
    a.innerHTML="CLICK HERE"
    console.log(url)
    domObjects.download.innerText="";
    domObjects.download.append(a);
}
window.onload=()=>
{
    let list = JSON.parse(localStorage.sessionsList);
    for(session of list)
    {
        if(session.sessionID==sessionStorage.export)
        {
            exporter(session);
        }
    }
}
var byteCounts = s => encodeURI(s).split(/%..|./).length-1;
var getObjectString = string =>
{
    return window.URL.createObjectURL(new Blob([string],{type:'text/json'}))
}