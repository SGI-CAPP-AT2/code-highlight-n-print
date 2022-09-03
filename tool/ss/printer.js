var $ =q=> document.querySelector(q);
window.onload=()=>{
    let list=[],tar = $("div.list");
    let n = parseInt(sessionStorage.list);
    for(let i=0;i<n;i++){
        list.push(JSON.parse(sessionStorage["l-"+i]));
        console.log(i)
    }
    console.log(list)
    updateUIqueue(list,tar);
    print();
}
var getParam = (p) =>{
    let urlParams = new URLSearchParams(window.location.search),
    product = urlParams.get(p);
    console.log(product,"pro")
    return product;
},
updateUIqueue = (list,tar) =>{
    let html="";
    console.log(list)
    if(list.length!=0){
    list.forEach(cq=>{
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
        ${sendCodeHighlight(cq.code,cq.filename)}
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
        html="Nothing found in print list"
    }
    tar.innerHTML=html;
},
sendCodeHighlight=(val,filename)=>{
    let htmlBlock="",htmlLine,tempBlock;
        tempBlock=getHighlight(val,filename)
        size=(tempBlock.split("\n").length+"").length;
        for(i in tempBlock.split("\n")){
            str = padLeadingZeros(parseInt(i)+1,size);
            htmlLine=str+". "+tempBlock.split("\n")[i]+"<br>";
            htmlBlock+=htmlLine;
        }
        return htmlBlock;
};

function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function getHighlight(code,filename){
    if(filename.includes(".")){
        return hljs.highlight(code,{language:filename.split(".")[filename.split(".").length-1]}).value;
    }else{
        return code;
    }
}