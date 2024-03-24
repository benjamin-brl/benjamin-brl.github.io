const div = document.createElement('div');
const h1 = document.createElement('h1');

// * Génère les cartes
const paneDiv = document.createElement('div');
paneDiv.classList.add('pane');
fetchBankAccounts().then(banques => {
  banques.forEach(banque => {
    makeCard(banque);
  });
});
const main = document.querySelector('main');
main.appendChild(paneDiv);

async function makeCard(banque) {
  let nomBanque = banque[14];
  const bankDiv = document.createElement('div');
  bankDiv.classList.add('bank');
  bankDiv.classList.add('light-blur');
  const bankNameHeading = document.createElement('h1');
  bankNameHeading.classList.add('bank-name');
  bankNameHeading.textContent = nomBanque;
  const infos = document.createElement('p');
  banque.forEach((info, i) => {
    if (i !== 14 && info !== '' && info !== null && info !== undefined) {
      if (i === 45 || i === 90) {
        info = TimestampToDate(info)
      }
      infos.textContent += info + '\n';
    }    
  });
  bankDiv.appendChild(bankNameHeading);
  bankDiv.appendChild(infos);
  paneDiv.appendChild(bankDiv);
}