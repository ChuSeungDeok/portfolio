'use strict'
// navbar가 내려가면 투명하게
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    if (window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }   
});

// navbar 메뉴 클릭시 스크롤링
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=>{
    // console.log(event.target.dataset.link);
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    scrollIntoView(link);
});

// home contact 버튼 누를시 contact 으로 스크롤
const contactMeBtn = document.querySelector('.home__contact');
contactMeBtn.addEventListener('click', ()=>{
    scrollIntoView('#contact');
});


// 스크롤 down할떄 천천히 흐려지게 만들기
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    home.style.opacity = 1 - window.scrollY / homeHeight;
});



// 스크롤 함수
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior : "smooth"});
}

