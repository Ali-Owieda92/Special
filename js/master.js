// Check If There's Local Storage Option
let mainColors = localStorage.getItem("color_option");

if(mainColors !== null ) {
    document.documentElement.style.setProperty('--main-color',mainColors);
    
            // Remove Active Class From All colors List Item
            document.querySelectorAll(".colors-list li").forEach(element => {
                element.classList.remove("active");
                // Add Atice Class On Element With Data-Color === local storage
                if(element.dataset.color === mainColors) {
                    // Add Active Class
                    element.classList.add("active");
                }
            });
}

// Random Background Option 
let backgroundOption = true;

// Variable To Cotrol Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background-option");

// Check If Random Background Local Storage Is Not Empty
if(backgroundLocalItem !== null) {
    
    if(backgroundLocalItem === 'true') {
        backgroundOption = true;
    }else {
        backgroundOption = false;
    }

    // Remove Active Class From All Span
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}

//Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    // Toggle Class Fa-spin For  Rotation on Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

};

// Switch Colors
const colorsLi=document.querySelectorAll(".colors-list li");
//Loop On All List Items
colorsLi.forEach(li => {
    // Click On Every List Items
    li.addEventListener("click",(e) => {
        
        // Set Color On Root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

        // Set Color On Local Storage
        localStorage.setItem("color_option",e.target.dataset.color);

        handleActive(e);
    });
});


// Switch Random Backgrounds Option
const randomBackEl=document.querySelectorAll(".random-backgrounds span");
//Loop On All Spans
randomBackEl.forEach(span => {
    // Click On Every Span
    span.addEventListener("click",(e) => {
        
        handleActive(e);
        
        if(e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImags();
            localStorage.setItem("background-option",true);
            
        }else {
            backgroundOption= false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option",false);

        }
    });
});


// Select Landing Page Element 
let landingPage = document.querySelector(".landing-page");
// Get Array Of Imgs 
let imgsArray = ['01.jpg','02.jpg','03.jpg','04.jpg'];

// Function To Randomize Imgs
function randomizeImags() {
    if(backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
                let randomNumber = Math.floor(Math.random() * imgsArray.length);
             // Change Background Image Url 
                landingPage.style.backgroundImage = 'url("imgs/'  +imgsArray[randomNumber]+  '")';
            },10000);
}
}

randomizeImags();


// Select Skills Selector 
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Outer Skills Height 
    let skillsOuterHeight = ourSkills.offsetHeight; // Section

    // Window Height
    let windowHeight = this.innerHeight; // Page

    // Widow Scroll top 
    let windowScrollTop = this.pageYOffset;
    
    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click',(e) => {
        // Create Overlay Element
        let Overlay = document.createElement("div");
        // Add Class To Overlay
        Overlay.className='popup-overlay';
        // Append Overlay To Body
        document.body.appendChild(Overlay);
        // Create The Popup
        let popupBox = document.createElement("div");
        //Add Class To The Popup box
        popupBox.className= 'popup-box';

        if(img.alt !== null) {
            // Create Heading To Images
            let imgHeading = document.createElement("h3");
            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);
            // Append imgtext to heading
            imgHeading.appendChild(imgText);
            // Append The Heading to the popul Box
            popupBox.appendChild(imgHeading);
        }

        //Create The Image
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = img.src;
        // Add Image To Popup
        popupBox.appendChild(popupImage);
        // Add The pOpup box to body
        document.body.appendChild(popupBox);
        // Create The Close Element
        let closeButton = document.createElement("span");
        // Create the Close Button Text 
        let closeButtonText = document.createTextNode("X");
        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);
        // Add Class To close Button
        closeButton.className='close-button';
        //add close button ti the popup box
        popupBox.appendChild(closeButton);

    });
});
// Close Popup
document.addEventListener('click',function(e) {
    if(e.target.className === 'close-button') {
        // Remove The Current Popup 
        e.target.parentNode.remove();

        // remove overlay
        document.querySelector(".popup-overlay").remove();

    }
});

// Select All bullets 
const allBulltes = document.querySelectorAll(".nav-bullets .bullet");
// Select All Links 
const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere (elements) {

elements.forEach(ele => {

    ele.addEventListener("click",(e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:'smooth'
        });

    });

});
}
scrollToSomeWhere(allBulltes);
scrollToSomeWhere(allLinks);

// Handle Active State 
function handleActive(ev) {
     // Remove Active Class From All Children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add Active Class On Self
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if(bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");

    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option","block");

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option","none");
            
        }


        handleActive(e);
    });
})

// Reset Button
document.querySelector(".reset-options").onclick = function () {

    localStorage.clear();

    // localStorage.removeItem("bullets_option");
    // localStorage.removeItem("background-option");
    // localStorage.removeItem("color_option");

    window.location.reload();

};

// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop Propagation 
    e.stopPropagation();

    // Toggle Class menu-active On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");
};
// Click anywhere Outside Menu and Toggle Button 
document.addEventListener("click",(e) => {

    if(e.target !== toggleBtn && e.target !== tLinks) {

        // Check If Menu Is Open
        if(tLinks.classList.contains("open")) {
            
            // Toggle Class menu-active On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");
            
        }

    }

});

// Stop Propagation on Menu
tLinks.onclick = function(e) {
    e.stopPropagation();
};