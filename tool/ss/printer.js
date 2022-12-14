var $ =q=> document.querySelector(q);
window.onload=()=>{
    let list=[];
    let n = parseInt(sessionStorage.list);
    for(let i=0;i<n;i++){
        list.push(JSON.parse(sessionStorage["l-"+i]));
    }
    let updated=updateUIqueue(list);
        $("div.list").innerHTML="";
        $("div.list").append(updated);
        let pbBool = getParam("pb");
        if(pbBool=='true'){
            $("div.list").classList.add("list-pb");
            console.log("page breaks added")
        }
        if(isFailed()==false)
            print();
}
var getParam = (p) =>{
    let urlParams = new URLSearchParams(window.location.search),
    product = urlParams.get(p);
    console.log(p,product,"pro")
    return product;
},
dateObj=new Date()
,
time=()=>{
    if(getParam("wd")=="true")
    {
        return `
        <div align="left" class="dt">
            <span class="date-wm">
            <img src="ss/fonts/imgs/time.svg" alt="Date WaterMark"/>
                <span>
                    Printed On
                    <strong>
                    ${
                       dateObj
                    }
                    </strong>
                    <small>
                    (${
                        dateObj.getTime()
                    })
                    </small>
                </span>
                &nbsp;
            </span>
        </div>
        `
    }
    return ""
},
failed = false,
updateUIqueue = (list) =>{
    let html="",tar = document.createElement("div");
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
        <p class="op-header">Output</p>
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
        </div><br>
        ${time()}
        `
        if(getParam("swm")=='true'){
            html+=`
            <div align="right" class="swm">
                <span class="site-wm">
                    <img src="ss/fonts/imgs/wm.svg" alt="Site WaterMark"/>
                    <span>
                        Formatted & Printed With 
                        <a href="https://github.com/SGI-CAPP-AT2/code-highlight-n-print">
                            ShGI/code-highlight-n-print
                        </a>
                    </span>
                </span>
            </div>
            `
        }else{
            html+="<div class='swm'></div>"
        }
    })
    }else{
        html=`Nothing found in print list <br> redirecting to home page in <span id="redTimer">5</span>ms `;;
        setTimeout(()=>{
            window.location.assign("https://sgi-capp-at2.github.io/code-highlight-n-print/");
        },5000)
        let t = 4;
        setInterval(()=>{
            $("span#redTimer").innerHTML=t--;
        },990)
        failed=true;
    }
    tar.innerHTML=html;
    return tar;
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
},
isFailed = () =>failed;

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