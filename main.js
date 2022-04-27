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

//  TIMELINE
function qs(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

const sections = qs('.section', true);
const timeline = qs('.timeline');
const line = qs('.line');
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
  const targetY = window.innerHeight * .8;

function scrollHandler(e) {
    const {
    scrollY
    } = window;
    up = scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;

    const dist = targetY - timelineRect.top;
    // console.log(dist);

    if (down && !full) {
    set = Math.max(set, dist);
    line.style.bottom = `calc(100% - ${set}px)`;
    }

    if (dist > timeline.offsetHeight + 50 && !full) {
    full = true;
    line.style.bottom = `-50px`;
    }

    sections.forEach(item => {
      // console.log(item);
      const rect = item.getBoundingClientRect(); //     console.log(rect);

    if (rect.top + item.offsetHeight / 5 < targetY) {
        item.classList.add('show-me');
    }
    }); // console.log(up, down);

    prevScrollY = window.scrollY;
}

scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler);

// Projects
const workBtnContainer = document.querySelector('.work_categories');
const projectContainer = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
if (filter == null) {
    return;
}


// 이전에 선택된 아이를 없애고 새로 선택된 아이 나타내기
const active = document.querySelector('.category_btn.selected');
if (active != null) {
    active.classList.remove('selected');
}
e.target.classList.add('selected');



projectContainer.classList.add('anim-out');
setTimeout(() => {
    projects.forEach((project) => {
    // console.log(project.dataset.type);
    if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
    } else {
        project.classList.add('invisible');
    }
    });
    projectContainer.classList.remove('anim-out');
}, 300);
});