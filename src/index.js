import './assets/styles/styles.scss';
import './index.scss';

const articleContainerElem = document.querySelector('.articles-container');
const categoriesContainerElem = document.querySelector('.categories-container');


/*
    Création du menu à partir d'une liste d'articles reçu en argument
*/
const createMenuCategories = (articles) => {
    const listeCategories = articles.reduce((acc, article) => {
        if (acc[article.categorie]) {
            acc[article.categorie]++;
        } else {
            acc[article.categorie] = 1;
        }
        
        return acc;
    }, {});

    const categoriesArr = Object.keys(listeCategories).map((categorie) => {
        return [categorie, listeCategories[categorie]];
    });
    
    categoriesArr.map((categorie) => {
        categoriesContainerElem.append(``)
    })
    console.log(categoriesArr);
}

const displayMenuCategories = (categoriesArr) => {
    const liElements = categoriesArr.map((catElem) => {
        const li = document.createElement('li');
        li.innerHTML = `<li>${ catElem[0]} ( <strong>${ catElem[1] }</strong> )</li>`
    })
}

/*
    Fonction récupérant tous les articles dans la base de données
*/
const fetchArticles = async () => {
    try {
        const response = await fetch("https:restapi.fr/api/blogs");
        const bodyResponse = await response.json();
        console.log('mes articles : ', bodyResponse)
        createArticles(bodyResponse);
        createMenuCategories(bodyResponse);
    } catch(e) {
        console.log('erreur : ', e);
    }
}


/*
    Fonction créant les éléments html à partir de la liste 
    des articles reçu en paramètre
    Ajout des event listener sur les btn
*/
const createArticles = (listeArticles) => {
    const articlesDOM = listeArticles.map( (article) => {
        const articleDOM = document.createElement('div');
        articleDOM.classList.add('article');
        articleDOM.innerHTML = `
        <img src="${ article.image }" alt="Image de profil">
        <h2>${ article.title }</h2>
        <p class="article-author">
            ${ article.author} - ${ (new Date(article.createdAt)).toLocaleDateString("fr-FR", {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })}
        </p>
        <p class="article-content">
            ${ article.content }
        </p>
        <div class="article-actions">
            <button class="btn btn-suppression" data-id=${ article._id }>Supprimer</button>
            <button class="btn btn-primary btn-edit" data-id=${ article._id }>Modifier</button>
        </div>
        `
        return articleDOM
    });
    console.log('mes articles DOM : ', articlesDOM);
    articleContainerElem.innerHTML = '';
    articleContainerElem.append(...articlesDOM);
    const deleteButtons = articleContainerElem.querySelectorAll('.btn-suppression');
    const editButtons = articleContainerElem.querySelectorAll('.btn-edit');

    editButtons.forEach( button => {
        button.addEventListener('click', e => {
            const target = e.target;
            const articleId = target.dataset.id;
            location.assign(`./form.html?id=${articleId}`);
        })
    })

    deleteButtons.forEach( button => {
        button.addEventListener('click', async e => {
            try { 
                const target = e.target;
                const articleId = target.dataset.id;
                const response = await fetch(`https://restapi.fr/api/blogs/${ articleId }`, {
                    method: "DELETE"
                });
                const body = await response.json();
                console.log('mon retour : ', body);
                fetchArticles();
            } catch(e) {
                console.log('erreur : ', e);
            }

        })
    })
}

fetchArticles();