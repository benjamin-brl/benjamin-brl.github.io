const racine = document.location.href.replace(/\/$/, '');
const p_courante = racine.substring(racine.lastIndexOf("/")+1);
const token = atob(decodeURIComponent(getCookie('token')))

console.log(racine)

console.log(`https://${location.hostname}/projets/dolibarr-api/${p_courante}`)

// redirige vers la page demandée
if (`https://${location.hostname}/projets/dolibarr-api/${p_courante}` !== racine && token === '') {
  location.href = './';
}
// redirige vers l'accueil
if (`https://${location.hostname}/projets/dolibarr-api/${p_courante}` === racine && token !== '') {
  location.href = './accueil.html';
}