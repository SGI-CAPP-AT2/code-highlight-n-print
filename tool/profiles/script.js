$=q=>document.querySelector(q);
gotoPrev=()=>window.location.assign("../")
let arrayOfProfiles = JSON.parse(localStorage.profs||"[]");
let ULappendix = "";
for (const i in arrayOfProfiles) {
    ULappendix+=
    `
    <li onclick="proceed(${i})">
    ${arrayOfProfiles[i].name}
    </li>
    `;
}
$("ul").innerHTML+=ULappendix;
var proceed = index =>
{
    for (const i in arrayOfProfiles[index].props) {
        localStorage[i]=arrayOfProfiles[index].props[i];
    }
    window.location.assign("../");
}
