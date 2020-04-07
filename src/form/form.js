import '../assets/styles/styles.scss';
import './form.scss';

const form = document.querySelector('form');
const errorElem = document.querySelector('#errors')
let errors = [];

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
            console.log(json);
            const promesse = await fetch('https://restapi.fr/api/blogs', { //req async sur le serveur de test de Dyma
                method: "POST",
                body: json,
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            const body = await promesse.json();
            console.log('mon body : ', body)
        } catch(e) {
            console.log("erreur : ", e);
        }
        
    }
})


/*
    Fonction qui reçoit le contenu du formulaire et vérifie si tout les champs sont remplis
*/
const formIsValid = (article) => {
    if (!article.author || !article.categorie || !article.content) {
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