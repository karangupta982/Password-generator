const inputSlider = document.querySelector('[data-lengthslider]');
const lengthDisplay = document.querySelector(".passlength");
const passwordDisplay = document.querySelector("[data-passworddisplay]");
const copybtn = document.querySelector("[data-copy]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector(".strengthColor");
const generatebtn = document.querySelector(".generatebtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "'~`!@#$%^&*()_-+=[{]}\|:;>?/<";
let password = "";
let passwordLength = 20;
let checkCount ;
handleSlider();


// set passwordLength
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength;
}
function setIndicator(color){
    indicator.style.backgroundColor = color;
    
}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max - min)) + min;
}

function getRandomNumber(){
    return getRandomInteger(0,9);
}
function generatelowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateuppercase(){
    return String.fromCharCode(getRandomInteger(65,91));

}
function generatesymbol(){
    let index = getRandomInteger(0,symbols.length);
    return symbols.charAt(index);
}

function calcStrength(){
    let haslower=false;
    let hasupper=false;
    let hassymbol=false;
    let hasnumber=false;
    if(symbolCheck.checked)hassymbol=true;
    if(numberCheck.checked)hasnumber=true;
    if(lowercaseCheck.checked)haslower=true;
    if(uppercaseCheck.checked)hasupper=true;

    if(hasupper && haslower && hasnumber && hassymbol){
        setIndicator("#0f0");
    }
    else if((haslower || hasupper) && (hasnumber || hassymbol)){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}
const copymsg=document.querySelector(".copied");
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymsg.innerText = "Copied";
        
    }    
    catch(e){
        copymsg.innerHTML = Failed;
    }
    copymsg.classList.add("active");
    setTimeout(() => {
        copymsg.classList.remove("active");
    }, 2000);
}
function shufflePassword(array){
    //Fisher Yates Method
    for(let i=array.size()-1;i>0;i--){
        let j=Math.floor(Math.random() * (i+1));
        let temp=array[i];
        array[i]= array[j];
        array[j]=temp;
    }
    let str=toString(array);
    return str;
}

inputSlider.addEventListener('input',function(event){
    lengthDisplay.innerHTML = event.target.value;
})

copybtn.addEventListener("click",function(){
    if(passwordDisplay.value){
        console.log("clicked on copyContent");
        copyContent();
    }
})

checkCount = 0;
function handleCheckCount(){
    
    allCheckBox.forEach(function(checkbox){
        if(checkbox.checked){
            checkCount++;
        }
    });
    console.log(checkCount);
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    

}
allCheckBox.forEach(function(checkbox){
    checkbox.addEventListener('change' , handleCheckCount);
    console.log("checkboc change");
})

generatebtn.addEventListener("click",function(){
    if(checkCount <= 0){
        
        return;
    }
    
    // if(passwordLength < checkCount){
        
    //     passwordLength = checkCount;
    //     handleSlider();
    // }
    console.log("hello ji");
    // let's generate the password

    // removing previous password
    password = "";
    // if(uppercaseCheck.checked){
    //     password += generateuppercase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generatelowercase();
    // }

    // if(numberCheck.checked){
    //     password += getRandomNumber();
    // }

    // if(symbolCheck.checked){
    //     password += generatesymbol();
    // }

    const arr=[];
    if(uppercaseCheck.checked){
        arr.push(generateuppercase);
    }
    if(lowercaseCheck.checked){
        arr.push(generatelowercase);
    }
    if(numberCheck.checked){
        arr.push(getRandomNumber);
    }
    if(symbolCheck.checked){
        arr.push(generatesymbol);
    }
    for(let i=0;i<arr.length;i++){
        password += arr[i]();
    }
console.log("compulsory addition done");
    for(let i=0;i<passwordLength - arr.length;i++){
        let randomIndex = getRandomInteger(0,arr.length);
        password += arr[randomIndex]();
    }
    console.log("password complete done");
    // password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;
    calcStrength();

})
