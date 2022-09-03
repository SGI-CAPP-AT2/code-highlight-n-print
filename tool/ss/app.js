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
        code = code;
        }
        return code;
    }
        return code;
}