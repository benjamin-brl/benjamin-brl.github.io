const envoie = document.getElementById('envoie')

envoie.addEventListener('click', e => {
  e.preventDefault()
  const client = antiXSS(document.getElementById('client').value);
  const type = antiXSS(document.getElementById('type').value);
  const date = DateToTimestamp(antiXSS(document.getElementById('date').value));
  const cond_reg = antiXSS(document.getElementById('cond_reg').value);
  const mode_reg = antiXSS(document.getElementById('mode_reg').value);
  const compt_bank = antiXSS(document.getElementById('compt_bank').value);
  const mode_doc = antiXSS(document.getElementById('mode_doc').value);
  const note_pub = antiXSS(document.getElementById('note_pub').value);
  const note_priv = antiXSS(document.getElementById('note_priv').value);
  note = {
    "socid": client, //!Important
    "type": type,
    "date": date,
    "cond_reg": cond_reg,
    "mode_reg": mode_reg,
    //? "": compt_bank,
    //? "": mode_doc,
    "note_public": note_pub,
    "note_private": note_priv
  }
  sendInvoices(note, domaine, api_key);
  location.reload();
})

fetchInvoices().then(factures => {
  factures.forEach(facture => {
    console.log(facture)
  });
});

async function sendInvoices(note, domaine, api_key) {
  url = `http://${domaine}invoices`;
  fetch(url, {
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