const identifiant = document.getElementById('identifiant');
const password = document.getElementById('mdp');
const ip = document.getElementById('domaine');
const connection = document.getElementById('connect');
const retenue_id = document.getElementById('retenue_id');
const retenue_domaine = document.getElementById('retenue_domaine');
const catch_error = document.getElementById('catch_error');

// ! NE PAS TOUCHER

/*
* Gestion des cookies de log
*/
if (getCookie('retenue_id')) {
  identifiant.value = decodeURIComponent(getCookie('identite'));
  retenue_id.checked = true;
}
if (getCookie('retenue_domaine')) {
  ip.value = decodeURIComponent(getCookie('retenue_domaine'));
  retenue_domaine.checked = true;
}

/*
* Connexion et création des cookies
*/
connection.addEventListener('click', e => {
  e.preventDefault();
  var identite = antiXSS(identifiant.value);
  var motdepasse = antiXSS(encodeURIComponent(password.value));
  var domaine = antiXSS(ip.value + ((ip.value === '10.0.52.137') ? '/htdocs/api/index.php/' : (ip.value === '10.0.52.152') ? '/api/index.php/' : '/dolibarr/api/index.php/'));
  console.log(identite, motdepasse, domaine)
  if (retenue_domaine.checked == false) {
    deleteCookie('retenue_domaine');
  }
  if (retenue_id.checked == false) {
    deleteCookie('retenue_id');
  }
  login(identite, motdepasse, domaine)
    .then(result => {
      createCookie('token', btoa(result), 1);
      if (retenue_id.checked === true) {
        createCookie('identite', identite, 7);
        createCookie('retenue_id', true, 7);
      } else {
        createCookie('identite', identite, 1);
      }
      if (retenue_domaine.checked === true) {
        createCookie('domaine', domaine, 7);
        createCookie('retenue_domaine', ip.value, 7);
      } else {
        createCookie('domaine', domaine, 1);
      }
      location.href = './accueil.html';
    })
    .catch((error) => {
      console.error(error);
    });
});

/*
 * Fonction login gérant la connexion et la récupération du token
 */
async function login(id, mdp, domaine) {
  url = `http://${domaine}login?login=${id}&password=${mdp}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      catch_error.textContent = 'Serveur HS, réesayer plus tard';
      catch_error.style.color = '#f00';
      throw new Error('Erreur lors de la requête');
    }
    const data = await response.json();
    return data.success.token;
  } catch (error) {
    catch_error.textContent = 'Erreur de la saisis des identifiants';
    catch_error.style.color = '#f00';
    throw new Error(error);
  }
}