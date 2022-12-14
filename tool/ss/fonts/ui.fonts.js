var
font=()=>localStorage.setFont,
fontDetails, 
changeUiFonts=(val)=>
{
    document.body.classList.remove(font());
    document.body.classList.add(val);
    localStorage.setFont=val;setSettingsMenu();
},
loadCallFonts=()=>
{
    fetch("ss/fonts/details.json").then(tex=>tex.json()).then(json=>{
        fontDetails=json;
        optList="";
        let fontFound=false;
        for(let detail of json){
            if(font()==detail.ClassName){
                fontFound=true;
            }
            console.log(font()==detail.ClassName)
            optList+=`<option ${(detail.ClassName==font())?"selected":""} style="font-family:${detail.css}" value="${detail.ClassName}">${detail.Title}</option>`
            console.log(
                detail.ClassName==localStorage.setFont,
                detail
            )
        }
        $("#fontList").innerHTML=optList;
        $("#fontList").disabled=false;
        $("#fontList").addEventListener("change",ev=>{
            changeUiFonts(ev.target.value)
            console.log(ev.currentTarget.value)
        })
        if(fontFound==false){
            changeUiFonts("default-fonts");
            console.log(fontFound)
        }
    });
    if(!localStorage.setFont){
        localStorage.setFont="default-fonts";
    }
    document.body.classList.add(localStorage.setFont);  
    setSettingsMenu();
};
window.addEventListener("load",lv=>loadCallFonts())
