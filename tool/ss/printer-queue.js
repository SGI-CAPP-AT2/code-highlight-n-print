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
const addToQueue = () =>{
    let tmp = {};
    
    Object.keys(domObjects).forEach(key=>{
        tmp[key]=domObjects[key].value()
    })
    tmp.title="(.)) "+tmp.title;
    queue.push(tmp);
    updateUIqueue();
},
updateUIqueue = () =>{
    let html="",rtfDisplay;
    if(queue.length!=0){
    queue.forEach(cq=>{
        if(cq.rtfBool=="true"){rtfDisplay="inline"}else{rtfDisplay="none"}
        html+=`<div style="margin:0 20px;">
        <h3>
        ${cq.title}
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
        html="Noting found in queue"
    }
    $("div.queue #list").innerHTML=html;
},
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