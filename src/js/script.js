import 'normalize.css'

import '../scss/style.scss';

//FOR SWIPER
var swiperContainers = document.querySelectorAll('.swiper');
let swipers = [];

//FOR button-next TO SHOW ALL INNER
var buttonsNext = document.querySelectorAll('.button-next');
var buttonsNextArrows = document.querySelectorAll('.button-next::before');
var lists = document.querySelectorAll('.dropdown-list');

//FOR DROPMENU
var burger = document.querySelector('.header__button-burger');
var overlayBurger = document.querySelector('.overlay-burger');
var dropMenu = document.querySelector('.header__menu-drop');
var header = document.querySelector('.header');

//FOR MODALS
var buttonsModal = document.querySelectorAll('.buttons-services button');
var overlayModal = document.querySelector('.overlay-modal');
var buttonsClose = document.querySelectorAll('.modal__button-burger');
var tempModal = null;

//FOR SELECT IN NAV
var navs = document.querySelectorAll('nav');

//MAIN
for (let i = 0; i < navs.length; i++) {
    const items = navs[i].querySelectorAll('li');
    for (let j = 0; j < items.length; j++) {
        items[j].addEventListener('click', () => {
            toggleNavItem(items, j);
        });
    }
}

for (let i = 0; i < buttonsModal.length; i++) {
    const tempButton = buttonsModal[i];
    tempButton.addEventListener('click', () => {
        const modalName = tempButton.dataset.idmodal;
        const tempModal = document.getElementById(modalName);
        toggleModal(tempModal);
    })
}

for (let i = 0; i < buttonsClose.length; i++) {
    const tempClose = buttonsClose[i];
    tempClose.addEventListener('click', () => {
        toggleModal(tempClose.closest('.modal'));
    });
}

overlayModal.addEventListener('click', () => {
    toggleModal(tempModal);
    tempModal = null;
});

for (let i = 0; i < buttonsNext.length; i++) {
    buttonsNext[i].addEventListener('click', () => {
        buttonsNext[i].classList.toggle('show');
        const list = buttonsNext[i].closest('.dropdown-list');
        lists[i].classList.toggle('visible-content');
    });
}

window.addEventListener('resize', () => {
    updateSwiper();
    updateDropdownLists();
    if (window.innerWidth >= 1440 && dropMenu.classList.contains('open'))
        toggleMenuDrop();
});

burger.addEventListener('click', () => {
    toggleMenuDrop();
});

overlayBurger.addEventListener('click', () => {
    toggleMenuDrop();
});

updateSwiper();
updateDropdownLists();

//FUNCTIONS
function updateSwiper() {
    //SWIPER
    if (window.innerWidth < 768 && swiperContainers[0].dataset.mobile == 'false') {
        for (let i = 0; i < swiperContainers.length; i++) {
            swipers[i] = getMySwapper(i);
            swiperContainers[i].dataset.mobile = 'true';
        }
    }
    else if (window.innerWidth >= 768) {
        for (let i = 0; i < swiperContainers.length; i++) {
            swiperContainers[i].dataset.mobile = 'false';
            if (swiperContainers[i].classList.contains('swiper-initialized'))
                swipers[i].destroy();
        }
    }
}

function toggleNavItem(items, ind) {
    const active = items[0].classList[0] + '--active';
    for (let i = 0; i < items.length; i++)
        items[i].classList.remove(active);
    items[ind].classList.add(active)
}

function updateDropdownLists() {
    //RESET STYLES FOR LIST BRANDS
    for (let i = 0; i < lists.length; i++) {
        if (window.innerWidth < 768 && lists[i].classList.contains('visible-content')) {
            lists[i].classList.remove('visible-content');
            buttonsNext[i].classList.remove('show');
        }
    }
}

function toggleModal(modal) {
    if (modal) {
        modal.classList.toggle('open');
        overlayModal.classList.toggle('on');
        if (modal.classList.contains('open'))
            tempModal = modal;
        updateScroll();
    }

}

function updateScroll() {
    if (overlayBurger.classList.contains('on') || overlayModal.classList.contains('on'))
        document.body.classList.add('scroll-off');
    else
        document.body.classList.remove('scroll-off');
}

function toggleMenuDrop() {
    burger.classList.toggle('open');
    dropMenu.classList.toggle('open');
    overlayBurger.classList.toggle('on');
    updateScroll();
}

function getMySwapper(i) {
    return new Swiper(swiperContainers[i], {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        dynamicBullets: true,

        dynamicMainBullets: true,

        allowTouchMove: true,

        slidesPerView: 'auto',

    });
}