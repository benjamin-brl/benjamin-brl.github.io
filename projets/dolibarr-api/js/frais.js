const envoie = document.getElementById('envoie');
const id = getID();
console.log(id)

envoie.addEventListener('click', e => {
  e.preventDefault()
  const date_deb = DateToTimestamp(antiXSS(document.getElementById('date_deb').value));
  const date_fin = DateToTimestamp(antiXSS(document.getElementById('date_fin').value));
  if (date_deb < date_fin) {
    const montant = antiXSS(document.getElementById('montant').value);
    const note_pub = antiXSS(document.getElementById('note_pub').value);
    const note_priv = antiXSS(document.getElementById('note_priv').value);
    note = {
      "fk_user_author":id,
      "date_debut":date_deb,
      "date_fin":date_fin,
      "fk_user_approve":1,
      "note_public":note_pub,
      "note_private":note_priv,
      "total_ttc": montant
    }
    sendExpenseReports(note, domaine, api_key);
    location.reload();
  } else {
    console.error(`La date de début (${TimestampToDate(date_deb)}) ne peut être après la date de fin (${TimestampToDate(date_fin)})`)
  }
})

fetchExpenseReports().then(notes => {
  notes.forEach(note => {
    console.log(note)
  });
});

async function sendExpenseReports(note, domaine, api_key) {
  url = `http://${domaine}expensereports`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "DOLAPIKEY": api_key
    },
    body: JSON.stringify(note),
  })
    .then(response => {
      if (response.ok) {
        console.log("La note de frais a été envoyée avec succès !");
      } else {
        console.error("Une erreur s'est produite lors de l'envoi de la note de frais.");
      }
    })
    .catch(error => {
      console.error("Une erreur s'est produite lors de l'envoi de la note de frais :", error);
    });
}

