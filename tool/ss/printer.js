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
    let pbBool = getParam("pb");
    if(pbBool=='true'){
        $("div.list").classList.add("list-pb");
        console.log("page breaks added")
    }
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
        console.log(cq.filename)
        if(cq.rtfBool=="true"){rtfDisplay="inline"}else{rtfDisplay="none"}
        html+=`
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
            str = "<span class='ln'>"+padLeadingZeros(parseInt(i)+1,size)+"</span>";
            htmlLine=str+tempBlock.split("\n")[i]+"<br>";
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
        try{
        code = hljs.highlight(code,{language:filename.split(".")[filename.split(".").length-1]}).value;
        }catch(e){
        code = code.replaceAll("<","&lt;");
        }
        console.log(code)
        return code;
    }
        code = code.replaceAll("<","&lt;");
        return code;
}