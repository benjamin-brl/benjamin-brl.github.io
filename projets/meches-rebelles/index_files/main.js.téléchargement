/*
 * Gestion des numéros de téléphone
*/
const tels = document.querySelectorAll('a[data-tel]');
function normaliserNumero(numero) {
    let paquets = [];
    for (let i = 0; i < numero.length; i += 2) {
        let paquet = numero.substring(i, i + 2);
        if (i === 0) {
            paquet = "+33 " + paquet.substring(1);
        }
        paquets.push(paquet);
    }
    return paquets.join(" ");
}

tels.forEach(tel => {
    let num = tel.getAttribute('data-tel')
    numero = normaliserNumero(num)
    tel.textContent = numero
    tel.href = `tel:${num}`
});

/*
 * Gestion des mails
*/
const mails = document.querySelectorAll('a[data-mail]');
mails.forEach(mail => {
    let m = mail.getAttribute('data-mail')
    mail.textContent = m
    mail.href = `mailto:${m}`
});

/*
 * Gestion de la navbar
*/
const hamb = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-menu');
hamb.addEventListener('click', () => {
    hamb.classList.toggle('active');
    menu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamb.classList.remove('active');
        menu.classList.remove('active');
    });
});

/*
 * Gestion des onglets
*/
const onglets = document.querySelectorAll('#onglets .onglet');
onglets.forEach(onglet => {
    onglet.addEventListener('click', () => {
        const modal = document.querySelector('section#modal');
        const img = onglet.querySelector('img'); 
        if (modal) {
            removeModal(modal);
            createModal(img);
        } else {
            createModal(img);
        }
    });
});

function createModal(e) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.id = 'modal';
    section.classList = 'modal';
    section.appendChild(e.cloneNode());
    main.insertBefore(section, main.firstChild);
}

function removeModal(modal) {
    modal.remove();
}