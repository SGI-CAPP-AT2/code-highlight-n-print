let queue = [],
domObjects = {
    title:{value:()=>$("input.optionaltext").value},
    code:{value:()=>$("textarea#input").value},
    output:{value:()=>$("textarea.input_of_op").value},
    filename:{value:()=>$("input#filename").value},
    rtf:{value:()=>$("#rtf_op span").innerHTML},
    watermark:{value:()=>$("#wm span").innerHTML},
    rtfBool:{value:()=>$("#rtf_bool").value}
};
function PRINT(){
    let list = [...queue],
    tmp = {};
    Object.keys(domObjects).forEach(key=>{
        tmp[key]=domObjects[key].value();
    })
    list.push(tmp);
    let i = 0;
    list.forEach(el=>{
        sessionStorage["l-"+i++]=JSON.stringify(el);
    })
    sessionStorage.list=i;
    window.location.assign(
        "print.html"
    )
}
const addToQueue = () =>{
    let tmp = {};
    
    Object.keys(domObjects).forEach(key=>{
        tmp[key]=domObjects[key].value()
    })
    queue.push(tmp);
    updateUIqueue();
},
updateUIqueue = () =>{
    let html="",rtfDisplay;
    $("div.queue").innerHTML="";
    if(queue.length!=0){
    queue.forEach(cq=>{
        if(cq.rtfBool=="true"){rtfDisplay="inline"}else{rtfDisplay="none"}
        html+=`
        <h3>
        ${cq.title}
        </h3>
        <div class="outputBlock" style="margin-top:10px">
        <p class="filenames">
            <span class="filename">${cq.filename}</span>
        </p>
        <p class="input">
                ${sendCodeHighlight(cq.code,cq.filename.split(".")[cq.filename.split(".").length-1])}
        </p>
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
        </div>
        `
    })
    }else{
        html="Noting found in queue"
    }
    $("div.queue").innerHTML=html;
},
sendCodeHighlight=(val,lang)=>{
    let htmlBlock="",htmlLine,tempBlock;
        tempBlock=hljs.highlight(val,{language:lang||"c"}).value
        size=(tempBlock.split("\n").length+"").length;
        for(i in tempBlock.split("\n")){
            str = padLeadingZeros(parseInt(i)+1,size);
            htmlLine=str+". "+tempBlock.split("\n")[i]+"<br>";
            htmlBlock+=htmlLine;
        }
        return htmlBlock;
};