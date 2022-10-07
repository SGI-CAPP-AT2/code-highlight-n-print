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
const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}
var toggleSettings = (a) =>
{
    console.log(("setting-section"))
    if($("#settings-core").style.display=="none"){
        $("#settings-core").style.display="block"
        a.innerText="Hide"
    }else{
        $("#settings-core").style.display="none"
        a.innerText="Settings"
    }
},
changeDefaultWM=newWM=>{
    localStorage.defaultWatermark=newWM;
}
window.addEventListener("load",ev=>{
    if(!localStorage.defaultWatermark){
        localStorage.defaultWatermark="github:sgi-capp-at2/code-highlight-n-print";
    }
    $("p#wm span").innerHTML=localStorage.defaultWatermark;
    $("#watermark-or").value=localStorage.defaultWatermark;
})