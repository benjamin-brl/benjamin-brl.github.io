const eleves = document.querySelectorAll('#tab_tirage>tr');
const bouton_tir = document.querySelector('#tirage');
const div_eleve_tire = document.querySelector('#eleve_tire');
const info_classe = document.querySelector('caption');

function TirageID(max) {
    min = Math.ceil(1);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1));
}

function AfficherTirage(info, id_classe, id_eleve) {
    const lien_attrib_note = document.createElement('a');
    const span = document.createElement('span');
    span.textContent += info;
    lien_attrib_note.id = 'info_eleve_tire';
    lien_attrib_note.href = `./?a=notes&c=${id_classe}&e=${id_eleve}`
    lien_attrib_note.appendChild(span)
    div_eleve_tire.appendChild(lien_attrib_note);
}

function RemoveEleveTire() {
    var infos = div_eleve_tire.querySelectorAll('#info_eleve_tire');
    infos.forEach(info => {
        info.remove()
    });
}

function TirageEleve(eleves) {
    if (div_eleve_tire.hasChildNodes()) {
        RemoveEleveTire()
    }
    const num_eleve_tire = TirageID(eleves.length)
    const eleve_tire = eleves[num_eleve_tire];
    const infos_eleve_tire = eleve_tire.querySelectorAll('td')
    infos_eleve_tire.forEach(info => {
        AfficherTirage(info.textContent, info_classe.id, info.id)
    })
}

bouton_tir.addEventListener('click', e => {
    e.preventDefault;
    TirageEleve(eleves);
})