var $ =q=> document.querySelector(q);
window.onload=()=>{
    let list=[],tar = $("div.list");
    let n = parseInt(sessionStorage.list);
    for(let i=0;i<n-1;i++){
        list.push(JSON.parse(sessionStorage["l-"+i]));
        console.log(i)
    }
    console.log(list)
    updateUIqueue(list,tar);
    print();
}
window.onafterprint=p=>{
    window.location.assign("index.html")
}
var getParam = (p) =>{
    let urlParams = new URLSearchParams(window.location.search),
    product = urlParams.get(p);
    console.log(product,"pro")
    return product;
},
updateUIqueue = (list,tar) =>{
    let html="";
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
        html="Nothing found in queue"
    }
    tar.innerHTML=html;
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

function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
