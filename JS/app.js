/* [1]- TODO: Part One => Navigation Bar */
/* Navigation Bar Events:
    A- ul li a => anchor lins => scrollIntoView (smooth movement) [All Screens]
    B- i .pipelines => Openned / Closed / anchor links => 
        btn.onclick | document.onclick | document.onkeydown (Escape) | 
        document.querySelector(`${idName}`).scrollIntoView({behavior: "smooth| auto"}) [mobile Screens]
    C- ul li a => anchor links clear active classes and border => btn.onclick
*/

// A- scrollIntoView [All Screens] + C- ul li a => anchor links clear active classes and border
// To Get All Links Must used document.querySelectorAll() => return array of a or node list
// But if used document.querySelector() => return string <li><a href="#home">home</a></li>
const navLinks = document.querySelectorAll('.main-header nav ul li a');
const barsBtn = document.querySelector('.main-header .pipelines');

navLinks.forEach(link => {
    link.addEventListener('click', (e)=> {
        e.preventDefault();
        const linkId = e.target.getAttribute('href');
        document.querySelector(`${linkId}`).scrollIntoView({behavior: "smooth"});
        link.classList.add('clicked');
        link.parentElement.classList.add('active')
        navLinks.forEach(activeLink => {
            if (activeLink !== link) {
                activeLink.parentElement.classList.remove('active');
                activeLink.classList.remove('clicked');
            }
        })
        if(barsBtn.classList.contains('openned')) {
            barsBtn.classList.toggle('openned');
        }
    })
})



// B- i .pipelines => Openned / Closed => first Senario when clicked openned and closed
// This Button will openned and closed pipelines Navigation when clicked it
barsBtn.addEventListener('click', e => {
    barsBtn.classList.toggle('openned');
});


// B- i .pipelines => Openned / Closed => Second Senario when clicked in any part of document DOM 
// Closed It
document.addEventListener('click', e => {
    if(!barsBtn.contains(e.target) && barsBtn.classList.contains('openned'))
        barsBtn.classList.toggle('openned');
});

// B- i .pipelines => Openned / Closed => Third Senario when clicked on Escape key from keyboard 
document.addEventListener('keydown', e => {
    if(e.key === 'Escape'  && barsBtn.classList.contains('openned'))
        barsBtn.classList.toggle('openned');
});


/* [2]- TODO: Part Two => Landing Page */
/*
    1- When clicked on arrow-left or arrow-right should be change content and background image of landing page
        arrow-left => backward image and arrow-right => forward image
    2- When clicked on bullets (ul) change class of it to active (li) should be change content and background image of landing page
        <li class="left"></li> => backward image and <li class="right"></li> => forward image 
    3- When Clicked on arrow or bullet change content of article
*/

const landingPage = document.querySelector('.landing');
const landingHeading = document.querySelector('.landing .land-text h2');
const landingParag = document.querySelector('.landing .land-text p');
const arrowsBtn = document.querySelectorAll('.landing i');
const bulletsBtn = document.querySelectorAll('.landing ul li');
const Images = ['shuffle-01.jpg', 'shuffle-02.jpg', 'shuffle-03.jpg' , 'shuffle-04.jpg', 'shuffle-05.jpg',  'shuffle-06.jpg',  'shuffle-07.jpg',  'shuffle-08.jpg'];



console.log(setImgBackground(Images,'left'));
console.log(setImgBackground(Images,'right'));


arrowsBtn.forEach(arrow => {
    if(arrow.classList.contains('arrow-left'))
        arrow.addEventListener('click', e => {
            landingPage.style.backgroundImage =  setImgBackground(Images,'left');
            console.log(setImgBackground(Images, 'left'));
        })
    else if(arrow.classList.contains('arrow-right'))
        arrow.addEventListener('click', e => {
            landingPage.style.backgroundImage = setImgBackground(Images, 'right');
            console.log(setImgBackground(Images, 'right'));
        })
});



// 1- When clicked on arrow-left or arrow-right should be change content and background image of landing page
function setImgBackground(arrname, arrowname) {
    let currentIndex = 0, imgname = window.getComputedStyle(landingPage).backgroundImage;
    for(let i = 0; i < arrname.length; i++){
        // console.log(imgname.substring(imgname.search('/IMG/')).replace('/IMG/', "").replace(/"\)/g,""));
        if(arrname[i] === imgname.substring(imgname.search(`/IMG/`)).replace(`/IMG/`, "").replace(/"\)/g,"")) 
            if(arrowname === 'left'){
                if(currentIndex === -1) currentIndex = 0;
                currentIndex = (currentIndex - 1 + arrname.length) % arrname.length;
                return `url(${window.location.origin}/IMG/${arrname[currentIndex]})`;
            } else if (arrowname === 'right'){
                currentIndex = (currentIndex + 1) % arrname.length;
                return  `url(${window.location.origin}/IMG/${arrname[currentIndex]})`;
            }
        currentIndex++;
    }
};



// 2- When clicked on bullets (ul) change class of it to active (li) should be change content and background image of landing page
let currentSlider = 0,
indexBullet = 0;

function updateSlider() {
    bulletsBtn.forEach(bullet => bullet.classList.remove('active'));
    // currentSlider = currentSlider > 2 ? 0 : currentSlider < 0 ? 0 : currentSlider;
    // console.log(currentSlider);
    bulletsBtn[indexBullet = indexBullet === -1 ?  2 : indexBullet  % bulletsBtn.length].classList.add('active');
    // indexBullet++
    // bulletsBtn[currentSlider = currentSlider > 2 ? 0 : currentSlider < 0 ? 0 : currentSlider].classList.toggle('active');
    return landingPage.style.backgroundImage = `url(${window.location.origin}/IMG/${Images[currentSlider]})`
}



let startX = 0;

landingPage.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
})


landingPage.addEventListener('touchend', e=> {
    const endX = e.changedTouches[0].clientX;
    if(endX < startX - 50){
        currentSlider = (currentSlider + 1) % Images.length;
        indexBullet++;
        console.log(indexBullet);
        updateSlider();
    } else if (endX > startX + 50){
        currentSlider = (currentSlider - 1 + Images.length) % Images.length;
        indexBullet--;
        console.log(indexBullet);
        updateSlider();
    }
})


updateSlider();


// 3- When Clicked on arrow or bullet change content of article
arrowsBtn.forEach(arrow => {
        arrow.addEventListener('click', e => {
            landingParag.textContent = generateDummeyText(30);
            landingHeading.textContent = generateDummeyHeading(5);
            // console.log(generateDummeyText(30));
        })
});


let startXAxis = 0;

landingPage.addEventListener('touchstart', (e) => {
    startXAxis = e.touches[0].clientX;
})

landingPage.addEventListener('touchend', e => {
        const endXAxis = e.changedTouches[0].clientX;
        if(endXAxis < startXAxis - 50){
            landingParag.textContent = generateDummeyText(30);
            landingHeading.textContent = generateDummeyHeading(5);
            updateSlider();
        } else if (endXAxis > startXAxis + 50) {
            landingParag.textContent = generateDummeyText(30);
            landingHeading.textContent = generateDummeyHeading(5);
            updateSlider();
        }        
})


function generateDummeyText(numrepeated) {
    const dummey = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Iusto, praesentium eligendi voluptatem aspernatur mollitia at itaque ea nisi dignissimos minus eveniet voluptatibus sequi explicabo quia eos tenetur nulla accusantium laudantium';
    let dummeyWords = dummey.split(" "), dummeyText = [], index = 0;
    while(index < numrepeated){
        dummeyText.push(dummeyWords[Math.floor(Math.random() * dummeyWords.length)]);
        index++;
    }
    return dummeyText.join(" ") + ".";
}


function generateDummeyHeading(numrepeated) {
    const progLanguages = 'HTML CSS JavaScript C C++ PHP C# VB.net';
    let progWords = progLanguages.split(" "), dummeyHead = [];
    for(let i = 0; i < numrepeated; i++) 
        // dummeyHead.push(progWords[i % progWords.length]);
        dummeyHead.push(i === numrepeated - 1?  progWords[Math.floor(Math.random() * progWords.length)] : progWords[Math.floor(Math.random() * progWords.length)].concat(","));
    dummeyHead.unshift("Hello");
    return dummeyHead.join(" ") + "!";
}


/* =====================Done Review Landing Page and Navigation=============== */


/* [2]- TODO: Part One => Portfolio section */
const portfolioBtns = document.querySelectorAll('.portfolio ul li');
const portfolioFigrs = document.querySelectorAll('.portfolio figure');

const allCategoriesImgs = {
    app: ['shuffle-01.jpg', 'shuffle-05.jpg', 'shuffle-07.jpg'],
    photo: ['shuffle-06.jpg', 'shuffle-08.jpg'],
    web: ['shuffle-03.jpg', 'shuffle-04.jpg', 'shuffle-06.jpg'],
    print: ['shuffle-02.jpg', 'shuffle-01.jpg'],
};


function updateActiveBtns(btnclicked) {
    portfolioBtns.forEach(btn => btn.classList.remove('active'));
    btnclicked.classList.add('active');
}

function filterImages(category) {
    portfolioFigrs.forEach(fig => {
        const imageSrc = fig.querySelector('img').getAttribute('src');
        if(category === 'all')
            fig.style.display = ""; // show all images "" remove inline css like unset
        // use some if return => (true, false, true) => return trues only
        // use every if return => (true, false, true) => return false must all true to return true 
        // use filter if return => if condition is true return true
        // best practice use some
        // else if(allCategoriesImgs[category].filter(imgname => imageSrc.includes(imgname)).length > 0)
        else if(allCategoriesImgs[category].some(imgname => imageSrc.includes(imgname)))
            fig.style.display = ""; // show all images for allCategoriesImgs[category]
        else 
            fig.style.display = "none"; // hide all images
    })
};

portfolioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        updateActiveBtns(btn);
        filterImages(btn.classList[0]);
    })
})


/* ===================== Done Review Portfolio ================================= */

/* [3]- TODO: Part Three => Skills section */
const skillsSection = document.querySelector('.sec-skills');
const skillsHeaders = document.querySelectorAll('.sec-skills header');
const skillBtns = document.querySelectorAll('.sec-skills ul li');
const skillImageBtns = document.querySelectorAll('.sec-skills .skill img');
const skillsImg = ['shuffle-01.jpg', 'shuffle-02.jpg', 'shuffle-03.jpg', 'shuffle-04.jpg','skills-01.jpg', 'skills-02.jpg'];
const allSkillSpans = document.querySelectorAll('.sec-skills .other-skill span');
let currentImage = 0;


function createDummeyParag(timesrepeated) {
    const dummyStr = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis repellat molestiae, excepturi provident officiis quas, repudiandae debitis exercitationem facilis voluptatibus aperiam facere illo odio harum magnam ullam consequatur, aspernatur iusto!';
    const dummyArr = dummyStr.split(" ");
    let dummyParag = [];
    for(let i = 0; i < timesrepeated; i++) 
        dummyParag.push(dummyArr[Math.floor(Math.random() * dummyArr.length)]);
    return dummyParag.join(" ").concat(".");
}


function changeStateBtn(btnname) {
    skillBtns.forEach(btn => btn.classList.remove('active'));
    btnname.classList.add('active');
}



function changeImage(){
    // change image
        skillImageBtns.forEach(img => {
            img.setAttribute('src',`${window.location.origin}/IMG/${skillsImg[currentImage]}`);
            // currentImage = currentImage === skillsImg.length - 1 ? 0  : currentImage + 1 % skillsImg.length;
            currentImage = currentImage === skillsImg.length - 1 ? 0  : currentImage + 1 % skillsImg.length;
            // currentImage = Math.floor(Math.random() * skillsImg.length);
        });
}


function getRandomRange(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function changeSpanContent(){
    const skills = ['HTML', 'CSS', 'JavaScript', 'C', 'C++', 'Java', 'C#', 'PHP'];
    allSkillSpans.forEach(span => {
        // console.log(span.getAttribute('prog-percent'), span.textContent);
        // console.log(arr[i%arr.length]);
        span.setAttribute('prog-percent', getRandomRange(10,100).toString().concat('%'));
        console.log(span);
        span.textContent = skills[Math.floor(Math.random() * skills.length)];
    })
};

let indexOfslider = 0;
function changeSlider(){
    skillBtns.forEach(btn => btn.classList.remove('active'));
    skillBtns[indexOfslider === -1 ? 2 : indexOfslider % skillBtns.length].classList.toggle('active');
}

skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        skillsHeaders.forEach(header => {
            const p = header.querySelector('p');
            p.textContent = createDummeyParag(15);
            changeStateBtn(btn);
        })
        changeImage();
        changeSpanContent();
    })
});

let touchStartX = 0;

skillsSection.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
})



skillsSection.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;

    if(touchEndX < touchStartX - 50){
        indexOfslider = indexOfslider + 1 % skillBtns.length;
        changeSlider();
        createDummeyParag(15);
        changeImage();
    } else if (touchEndX > touchStartX + 50){
        indexOfslider -= 1 % skillBtns.length;
        changeSlider();
        createDummeyParag(15);
        changeImage();
    }
})

changeSlider();


/* ===================== Done Review skills ================================= */


/* [3]- TODO: Part Four => Pricing -> heighlighted Plan and Border */

const pricingPlans = document.querySelectorAll('.pricing .plans .plan');
const pricingBtns = document.querySelectorAll('.pricing .plans .plan a');
const pricingContact = document.querySelector('.pricing .pricing-foot a');


pricingPlans.forEach(plan => {
    const btn = plan.querySelector('a');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        pricingPlans.forEach(plan => plan.classList.remove('active'));
        plan.classList.add('active');
    })
})


pricingContact.addEventListener('click', (e) => {
    e.preventDefault();
    let mailWindow = 
        window.open('mailto:info@microdata.com?subject=Special%20Offer&body=please,%20I%20want%20request%20special%20offer&cc=mohammedsoliman144@gmail.com');
    // back to browser window and focus on it => as window.opener.focus()
    // in some cases this code does not run because browser security to prevent melicious scripts
    if(window.opener && !window.opener.closed) 
        window.opener.focus();
})

/* ===================== Done Review Pricing ================================= */

/* [4]- TODO: Part Four => subcribe => validate Email */
const parentInput = document.querySelector('.subscribe form .input');
const emailInput = document.querySelector('.subscribe form .input input[type="email"]');
const submitInput = document.querySelector('.subscribe form .input input[type="submit"]');

// Standard Email Validation In HTML5 used /^[a-zA-Z0-9+%_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/i
// best practice validate email => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
/*
    Some Validate Emails:
        my-email%address@test.co.uk
        user.name@domain.co
        john_doe123@sub.domain.org
        first+last@company.info

    Some Invalidate Emails:
        user@domain.123
        mohamed@domain.-
        mohamed@domain.!!
        mohamed @example.com
        my email@domain.com

*/

function validateEmail() {
    let regEmail1 = /^[a-zA-Z0-9+%_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/i;
    let regEmail2 = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    // best Practice use emailInput.value not emailInput.innerText or  emailInput.textContent or emailInput.innerHTML
    if(emailInput.value.trim() !== null)
        if(regEmail1.test(emailInput.value) && regEmail2.test(emailInput.value) ){
            parentInput.classList.toggle('valid');     
            submitInput.value = "Subscribed";
        }
        else {
            parentInput.classList.toggle('invalid');
            submitInput.value = "Not Subscribed";
        }
}

function resetValidation (){
    emailInput.value = null;
    emailInput.focus();
    parentInput.classList.remove('valid', 'invalid'); 
    submitInput.value = "Subscribe"; 
}

submitInput.addEventListener('click', (e) => {
    e.preventDefault();
    validateEmail();
});

emailInput.addEventListener('focus', e => {
    resetValidation();
});

/* ===================== Done Review Subscribe ================================= */

/* [5]- TODO: Part Four => Contact => validate Email */

/* 
      <section id="contact" class="contact-us container">
        <header class="sub-header">
          <h2>Contact Us</h2>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
            Mauris blandit aliquet elit, eget tincidunt.
          </p>
        </header>
        <div class="contact-text">
          <form method="post" action="index.js" class="contact">
            <input type="text" name="" id="" placeholder="your name" />
            <input type="email" name="" id="" placeholder="your email" />
            <textarea name="" id="" placeholder="your message"></textarea>
            <input type="submit" value="send message" />
          </form>
          <address>
            <div class="phones">
              <span>Get In Touch</span><br />
              <span>+00 123.456.789</span><br />
              <span>+00 123.456.789</span><br />
            </div>
            <div class="addresses">
              <span>Where We Are</span><br />
              <span>Awesome Address 17</span><br />
              <span>New York, NYC</span><br />
              <span>123-4567-890</span><br />
              <span>USA</span><br />
            </div>
          </address>
        </div>
      </section>


      <!-- test -->
            <span class="text"></span>
            <span class="email"></span>
            <span class="textarea"></span>

*/

const contactForm = document.querySelector('.contact-us .contact-text form');
const formInputs = document.querySelectorAll('.contact-us .contact-text form input, .contact-us .contact-text form textarea, .contact-us .contact-text form span');
const spanText = document.createElement('span');
spanText.classList.add('text');
const spanEmail = document.createElement('span');
spanEmail.classList.add('email');
const spanTextarea = document.createElement('span');
spanTextarea.classList.add('textarea');

function validateForm() {
    
    let regEmail1 = /^[a-zA-Z0-9+%_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/i;
    let regEmail2 = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

    if(document.querySelector('.contact-us .contact-text form input[type="text"]').value !== null 
        && !(/[0-9]+/g.test(document.querySelector('.contact-us .contact-text form input[type="text"]').value))
        && document.querySelector('.contact-us .contact-text form input[type="text"]').value.length >= 5){

        spanText.classList.contains('invalid') ? spanText.classList.remove('invalid') : "";
        spanText.classList.add('valid');
        document.querySelector('.contact-us .contact-text form').append(spanText);
    }
    else {
        spanText.classList.contains('valid') ? spanText.classList.remove('valid') :  "";
        spanText.classList.add('invalid');
        document.querySelector('.contact-us .contact-text form').append(spanText);
        return false;
    }

    if (document.querySelector('.contact-us .contact-text form input[type="email"]').value !== null 
        && regEmail1.test(document.querySelector('.contact-us .contact-text form input[type="email"]').value) 
        && regEmail2.test(document.querySelector('.contact-us .contact-text form input[type="email"]').value)) {

        spanEmail.classList.contains('invalid') ? spanEmail.classList.remove('invalid') :  "";
        spanEmail.classList.add('valid');
        document.querySelector('.contact-us .contact-text form').append(spanEmail);
    }
    
    else {
        spanEmail.classList.contains('valid') ? spanEmail.classList.remove('valid') :  "";
        spanEmail.classList.add('invalid');
        document.querySelector('.contact-us .contact-text form').append(spanEmail);
        return false;
    }
    
    if(document.querySelector('.contact-us .contact-text form textarea').value !== null  
        && document.querySelector('.contact-us .contact-text form textarea').value.length >= 5) {


            spanTextarea.classList.contains('invalid') ? spanTextarea.classList.remove('invalid') : "";
            spanTextarea.classList.add('valid');
            document.querySelector('.contact-us .contact-text form').append(spanTextarea);
    }     
    else {
        spanTextarea.classList.contains('valid') ? spanTextarea.classList.remove('valid') :  "";
        spanTextarea.classList.add('invalid');
        document.querySelector('.contact-us .contact-text form').append(spanTextarea);
        return false;
    }
    return true;
}


function resetInputs () {
    formInputs.forEach(input => {
        spanText.classList.remove('valid');
        spanEmail.classList.remove('valid');
        spanTextarea.classList.remove('valid');
        if(input.type !== 'submit')
            input.value = null;
        else input.value = "send message";
    })
}


contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm()) {
        validateForm();
        document.querySelector('.contact-us .contact-text form input[type=submit]').value = "Message Sent Successfully!";
        setTimeout(()=> {
            resetInputs();
        }, 3000);
    }
    else
        document.querySelector('.contact-us .contact-text form input[type=submit]').value = "Message Not Sent";
});

