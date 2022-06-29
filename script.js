
const inputBox = document.getElementById("input");
const outputBox = document.getElementById("output");
const termconsole = document.getElementById("console");

let vists = 0;

const commands = {
    "init" : "Welcome to my web terminal portfolio! For a list of commands, type <span id='command'>help</span>",
    "help" : `<pre>
    <span id='command'>init</span>      View inital message
    <span id='command'>help</span>      Full list of commands
    <span id='command'>clear</span>     Removes output from terminal
    <span id='command'>whois</span>     Short blurb about me
    <span id='command'>social</span>    Links to my socials
    <span id='command'>contact</span>   List of ways to contact me
    <span id='command'>counter</span>   Counts the number of visits to my site
    <span id='command'>projects</span>  Some things I am proud of</pre>`,
    "clear" : "exe",
    "whois": `
            <br>Hello, I'm AJ!👋<br><br> I am a programmer from Atlanta, Georgia who loves to tinker and make cool projects like this. I recently graduated from the University of Georgia (Go DAWGS!)🐶  with a degree in computer science and I am looking to start my career in Software Engineering. <br><br>
            My software journey started in the 6th grade when I was introduced to Lua, a small scripting language on the platform Roblox. I was instantly hooked and learned the foundations of programming and problem solving through fun projects on the site. Now, my most successful projects are tools, built to give back to the Roblox community that taught so much.
            <br><br>
            I have many other hobbies in addition to software including, playing Violin & Cello🎻, Rock Climbing🧗, Photography📸, and Lindy Hop🕺. These are things I love to do in my free time and improve myself by learning different perspectives on life through this variety of disciplines.            `,
    "social": `
                These are clickable links...<br>
                &nbsp; <a href="https://www.linkedin.com/in/aj-steinhauser-11134a76/" target=”_blank” >LinkedIn<a><br>
                &nbsp; <a href="https://www.instagram.com/a.j.steinhauser/" target=”_blank” >Instagram<a><br>
                &nbsp; <a href="https://github.com/AJSteinhauser" target=”_blank” >Github<a><br>
                &nbsp; <a href="https://www.facebook.com/profile.php?id=100001923304396" target=”_blank” >Facebook<a><br>
                `,
    "contact": `
                &nbsp; <span id="command">Phone:</span> (+1)770-778-1263<br>
                &nbsp; <span id="command">Email:</span> ajsteinhauser11@gmail.com<br>
                `,
    "projects" : `These are clickable links...
<pre>
================= ====================================================================== 
Project                                   Description                               
================= ====================================================================== 
<a href="https://devforum.roblox.com/t/minimap-render-rorenderv2/965827" target=”_blank”>RoRender</a>          An orthographic image rendering application for the Roblox Platform   
|                 Over 3,000 people have downloaded application powers developer's      
|                 games with millions of plays.                                         
---------------   -------------------------------------------------------------------   
<a href="https://www.roblox.com/games/4480196475/Undead-Defense-Under-Construction" target=”_blank”>Undead Defense</a>    2.5D top-down shooter game implemented on the Roblox platform         
|                 Mobile, PC, & XBOX support Cool algorithms implemented in lua         
|                 including: Quad Trees, Boids, A*. And other system design             
|                 challenges such as client replication, data storage, and scalability  
---------------   -------------------------------------------------------------------   
<a href="https://github.com/AJSteinhauser/RUF_Assassins" target=”_blank”>RUF Assassins</a>     Web application to facilitate game for RUF student                    
|                 organization. Built in Django web framework and makes use of          
|                 Twilio API, MySQL, BootStrap, and Google maps SDK.                    
================= ====================================================================== 
</pre>`,
    "counter" : "exe"
}

var outputStack = [];

//Input lock
inputBox.focus();
inputBox.addEventListener("focusout",function(){
    inputBox.focus();
});


//Make remove excess elements
function keepTextInFrame(){
    while (verticallyBound()){
        outputStack[0].remove();
        outputStack.shift();
    }
}


//Enterkey pressed 
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        let text = inputBox.value
        let newElement = document.createElement("p")
        newElement.setAttribute("class","line");
        newElement.innerHTML = getCommand(text);
        outputBox.appendChild(newElement);
        outputStack.push(newElement);
        keepTextInFrame();
        inputBox.value = ""
    }
});


//Initial Command
function init(){
    let newElement = document.createElement("p")
    newElement.setAttribute("class","line");
    newElement.innerHTML = commands["init"];
    outputBox.appendChild(newElement);
    outputStack.push(newElement);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.countapi.xyz/hit/ajportfolio/visits");
    xhr.responseType = "json";
    xhr.onload = function() {
        vists = this.response.value;
    }
    xhr.send();
}

init();

//Doing command action/getting command text
function getCommand(command){
    textAppend = "<span id='sys_text'>DevConsole ~ </span>" + command + "<br>"
    if (commands.hasOwnProperty(command)){
        if (commands[command] == "exe"){
            let returnValue = doCommand(command);
            if (returnValue != ""){ 
                return textAppend + returnValue
            }
            return returnValue
        }
        return textAppend + commands[command];
    }
    else{
        return textAppend + "There is no command <span id='command'>" + command + "</span>. Use the <span>help</span> command to see a full list of commands."
    }
}
//


//Command Execution
function doCommand(command) {
    if (command == "clear"){
        const elements = document.getElementsByClassName("line");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
    if (command == "counter"){ 
        return "&nbsp; There have been <span id='command'>" + vists.toString() + "</span> visits to this site"
    }
    return "";
}

//Check for outside of viewport 
function verticallyBound() {
    let consoleRect = termconsole.getBoundingClientRect();
    var textRect = inputBox.getBoundingClientRect();
    return consoleRect.bottom <= textRect.bottom;
}