import '../assets/styles/styles.scss';
import './form.scss';

const form = document.querySelector('form');
const errorElem = document.querySelector('#errors')
let errors = [];
const btnRetour = document.querySelector('.btn-annulation');
let articleId;


const fillForm = (article) => {
    form.author.value = article.author || '';
    form.image.value = article.image || '';
    form.categorie.value = article.categorie || '';
    form.title.value = article.title || '';
    form.content.value = article.content || '';
}


const initForm = async () => {
    const params = new URL(location.href);
    articleId = params.searchParams.get('id');
    
    if (articleId) {
        try {
            const response = await fetch('https://restapi.fr/api/blogs/' + articleId);
            if (response.status < 300) {
                const article = await response.json();
                fillForm(article);
            }
        } catch (e) {
            console.log('erreur : ', e);
        }
    }
    
}

initForm();


/*
    Ajout d'un eventlistener pour gérer la soumission du formulaire
*/
form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const article = Object.fromEntries(formData.entries());
    if (formIsValid(article)) {
        try {
            const json = JSON.stringify(article);
            let promesse
            if (articleId) {
                promesse = await fetch(`https://restapi.fr/api/blogs/${articleId}`, { //req async sur le serveur de test de Dyma
                    method: "PATCH",
                    body: json,
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
            } else {
                promesse = await fetch('https://restapi.fr/api/blogs', { //req async sur le serveur de test de Dyma
                    method: "POST",
                    body: json,
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
            }
            if (promesse.status < 299) {
                location.assign('/index.html');
            }
        } catch(e) {
            console.log("erreur : ", e);
        }
        
    }
})


/*
    Fonction qui reçoit le contenu du formulaire et vérifie si tout les champs sont remplis
*/
const formIsValid = (article) => {
    if (!article.author || !article.categorie || !article.content || !article.title || !article.image) {
        errors = [];
        errors.push('Vous devez renseigner tous les champs');
    } else {
        errors = [];
    }
    if (errors.length) {
        let errorHTML = '';
        errors.forEach( (e) => {
            errorHTML += `<li>${ e }</li>`
        })
        errorElem.innerHTML = errorHTML;
        return false;
    } else {
        errorElem.innerHTML = '';
        return true;
    }
}

btnRetour.addEventListener('click', () => location.assign('./index.html'));