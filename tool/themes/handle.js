var inputTarget = $("#themeList");
fetch("themes/themes.json").then(d=>d.json()).then(json=>{
    inputTarget.innerHTML="";
    var ifDefault="";
    for(let theme of json){
        inputTarget.innerHTML+=`
        <option ${(theme.className==localStorage.themeCode)?"selected":""} value="${theme.className}">${theme.name}</option>
        `;
    }
    inputTarget.disabled=false;
});
inputTarget.addEventListener("change",ev=>{
    setTheme(ev.target.value)
});
if(localStorage.themeCode){
    document.body.classList.add(localStorage.themeCode)
}else{
    localStorage.themeCode="def";
    document.body.classList.add(localStorage.themeCode)
}
var setTheme = (theme) =>{
    document.body.classList.remove(localStorage.themeCode)
    localStorage.themeCode=theme;
    document.body.classList.add(localStorage.themeCode)
}