let login = getCookie('identite');
const user = document.getElementById('user');

/*
* Gestion de l'écrit du nom
*/
fetchUsers().then(users => {
    users.forEach(user => {
        if (user[68] === login) {
            const prenom = user[35];
            const nom = user[34];
            const text = `Bienvenue, ${nom} ${prenom}`;
            let i = 0;
            const speed = 50;
            function typeWriter() {
                const user = document.getElementById('user');
                if (i < text.length) {
                    user.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter(), speed);
                }
            }
            typeWriter()
        }
    });
});