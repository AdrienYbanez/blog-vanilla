const iconMobilMenu = document.querySelector('.header-menu-icon');
const headerMenu = document.querySelector('.header-menu');
let isMenuOpen = false;
let mobileMenuDom;


/*
    Fonction pour créer le menu mobile
*/
const createMobileMenu = () => {
    mobileMenuDOM = document.createElement('div');
    mobileMenuDOM.classList.add('mobile-menu');
    mobileMenuDOM.addEventListener('click', e => e.stopPropagation());
    mobileMenuDOM.append(headerMenu.querySelector('ul').cloneNode(true));
    iconMobilMenu.append(mobileMenuDOM);
}


/*
    Fonction pour afficher le menu
*/
const openMenu = () => {
    
    if ( !mobileMenuDom ) {
        createMobileMenu();
        
    }
    mobileMenuDOM.classList.add('open');
};



/*
    Fonction pour fermer le mnu
*/
const closeMenu = () => {

    mobileMenuDOM.classList.remove('open');
}


/*
    Choix d'ouverture ou de fermeture du menu mobile
*/
const toggleMobileMenu = (e) => {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
        
    }
    isMenuOpen = !isMenuOpen;
}


/*
    Ajout d'un eventlistener pour ouvrir et fermer le menu mobile
*/
iconMobilMenu.addEventListener('click', e => {
    e.stopPropagation();
    toggleMobileMenu();
})


/*
    Ajout d'un eventlistener sur window pour fermer le menu
*/
window.addEventListener('click', e => {
    if (isMenuOpen) {
        toggleMobileMenu();
    }
})

window.addEventListener('resize', e => {
    if (window.innerWidth > 480 & isMenuOpen) {
        toggleMobileMenu();
    } 
})
