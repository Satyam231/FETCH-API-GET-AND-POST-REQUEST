console.log("Welcome to postmaster api ")
//utility function
function addparameterBOx(html) {
    let div = document.createElement("div")
    div.innerHTML = html;
    return div.firstElementChild
}
//inintial for add param box
let addindex = 0;
//custom parameter box 
let parameterBox = document.getElementById("parameterBox")
parameterBox.style.display = 'none';
//json textArea
let jsonTextArea = document.getElementById("jsonTextArea")
//hide process to jsonTextArea and Custom ParameterBox
let json = document.getElementById("json")
json.addEventListener("click", () => {
    jsonTextArea = document.getElementById("jsonTextArea")
    jsonTextArea.style.display = 'block';
    parameterBox.style.display = 'none';
})
//initaill custom parameter box to hide process
let customParam = document.getElementById("customParam")
customParam.addEventListener("click", () => {
    parameterBox = document.getElementById("parameterBox")
    parameterBox.style.display = 'block';
    jsonTextArea.style.display = 'none'    
})
//add parameter process
let addbtn = document.getElementById("addbtn")
addbtn.addEventListener("click", () => {
    let addParam = document.getElementById("addParam")
    let html = `<div class="form-row my-2">
                <label for="parameterKey1" class="col-sm-2 col-form-label">Parameter ${addindex + 2}
                </label>
                <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="Enter Parameter ${addindex + 2} Key" id="parameterKey${addindex + 2}">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="Enter Parameter ${addindex + 2} value" id="parameterValue${addindex + 2}">
                </div>
                 <button class="btn btn-primary removeBtn">-</button>
                 </div>`
    let parametershow = addparameterBOx(html)
    addParam.appendChild(parametershow)
    //remove btn for button parameter
    let removeBtn = document.getElementsByClassName("removeBtn")
    console.log(removeBtn)
    for(item of removeBtn){
        item.addEventListener("click",(e)=>{
            e.target.parentElement.remove();
console.log(item)
        })
    }
    addindex ++;
})
let submitNow = document.getElementById("submitNow")
submitNow.addEventListener("click",()=>{
    let responsejsonText = document.getElementById("responsePrism").innerHTML = "Please wait... Fetching Data..."
    //fetching the all values user has entered
    let url = document.getElementById("url").value
    let requestType = document.querySelector("input[name='requestType']:checked").value; 
    let contentType = document.querySelector("input[name='contentType']:checked").value; 
    let textArea = document.getElementById("textArea").value
    //if user has used parameters option instead of json,collect all the parameters is an array
    if (contentType == 'customParam'){
        obj = {};
        for(let i=0; i < addindex+1; i++){
            if (document.getElementById("parameterKey" + (i + 1)) != undefined){
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                obj[key]= value;
            }
            obj = JSON.stringify(obj);
        }
    } 
    else {
        obj = document.getElementById("textArea").value;
    }
    if(requestType = 'GET'){
        fetch(url,{
            method : 'GET',
        })
        .then(response =>response.text())
        .then((text)=>{
            // document.getElementById("responsejsonText").value = text;
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll()
        })
    }else{
        fetch(url, {
            method: 'POST',
            body :data ,
            headers:{
                "content-type":"appliction/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById("responsePrism").innerHTML = text;
                Prism.highlightAll()
            })
    }
    
    //log all the values in the console for debugging
    console.log('url is',url)
    console.log('requestType  is',requestType)
    console.log('contentType is',contentType)
    console.log('textArea is',textArea)
    console.log('obj is ',obj)
})