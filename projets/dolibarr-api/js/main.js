let api_key = atob(decodeURIComponent(getCookie('token')));
let domaine = decodeURIComponent(getCookie('domaine'));

/*
 * Gestion du fond d'écran
 ! Fonctionne sur mobile et écran <= 1080p
 ! Pas sur UHD, 4k et +
 */
const body = document.querySelector("body");
if (body.hasAttribute('data-bg') && body.getAttribute('data-bg') === 'yes') {
    var counter = 0;
    fetch("/assets/backgrounds/")
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(data, "text/html");
            let images = Array.from(htmlDoc.getElementsByTagName("a"))
                .filter(img => img.title.match(/\.jpg$|\.png$|\.gif$|\.webp$/))
                .map(img => img.title);
            counter += images.length;
            let number = Math.floor(Math.random() * counter) + 1;
            body.style.backgroundImage = `url('/assets/backgrounds/${images[number - 1]}')`;
        });
}

/*
 * Gestion de la navbar
 */
if (body.hasAttribute('data-nav') && body.getAttribute('data-nav') === 'yes') {
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
}

/*
 * Récupération des informations utiles
 */
if (body.hasAttribute('data-nav') && body.getAttribute('data-nav') === 'yes') {
    const deconnecter = document.getElementById("disconnect");
    deconnecter.addEventListener('click', e => {
        e.preventDefault()
        disconnect()
    });
}

function disconnect() {
    if (!getCookie('retenue_id')) {
        deleteCookie('identite');
    }
    if (!getCookie('retenue_domaine')) {
        deleteCookie('domaine');
    }
    deleteCookie('token');
    location.href = './';
}

/*
 * Récupération des comptes bancaires
 */
async function getBankAccounts(api_key, domaine) {
    url = `http://${domaine}bankaccounts`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "DOLAPIKEY": api_key
        },
    });

    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error("Erreur lors de la requête");
    }
}

async function fetchBankAccounts() {
    try {
        const banques = await getBankAccounts(api_key, domaine);
        return banques.map(bank => [
            bank.id,
            bank.entity,
            bank.import_key,
            bank.array_options,
            bank.array_languages,
            bank.contacts_ids,
            bank.linked_objects,
            bank.linkedObjectsIds,
            bank.canvas,
            bank.fk_project,
            bank.contact_id,
            bank.user,
            bank.origin,
            bank.origin_id,
            bank.ref,
            bank.ref_ext,
            bank.statut,
            bank.status,
            bank.country_id,
            bank.country_code,
            bank.state_id,
            bank.region_id,
            bank.barcode_type,
            bank.barcode_type_coder,
            bank.mode_reglement_id,
            bank.cond_reglement_id,
            bank.demand_reason_id,
            bank.transport_mode_id,
            bank.shipping_methode_id,
            bank.model_pdf,
            bank.last_main_doc,
            bank.fk_bank,
            bank.fk_account,
            bank.note_public,
            bank.note_private,
            bank.total_ht,
            bank.total_tva,
            bank.total_localtax1,
            bank.total_localtax2,
            bank.total_ttc,
            bank.lines,
            bank.name,
            bank.lastname,
            bank.firstname,
            bank.civility_id,
            bank.date_creation,
            bank.date_validation,
            bank.date_modification,
            bank.date_cloture,
            bank.user_author,
            bank.user_creation,
            bank.user_creation_id,
            bank.user_valid,
            bank.user_validation,
            bank.user_validation_id,
            bank.user_closing_id,
            bank.user_modification,
            bank.user_modification_id,
            bank.specimen,
            bank.label,
            bank.courant,
            bank.type,
            bank.bank,
            bank.clos,
            bank.rappro,
            bank.url,
            bank.code_banque,
            bank.code_guichet,
            bank.number,
            bank.cle_rib,
            bank.bic,
            bank.iban,
            bank.iban_prefix,
            bank.domiciliation,
            bank.pti_in_ctti,
            bank.proprio,
            bank.owner_address,
            bank.type_lib,
            bank.account_number,
            bank.fk_accountancy_journal,
            bank.accountancy_journal,
            bank.currency_code,
            bank.account_currency_code,
            bank.min_allowed,
            bank.min_desired,
            bank.comment,
            bank.date_solid,
            bank.ics,
            bank.ics_transfer,
            bank.solde,
            bank.date_update
        ]);
    } catch (error) {
        console.error(error);
        return [];
    }
}

/*
 * Gère l'ajout d'éléments dans des liste
*/
async function addList(list, info) {
    const option = document.createElement('option')
    option.value = info
    list.appendChild(option);
}

/*
 * Récupération des factures
 */
async function getInvoices(api_key, domaine) {
    url = `http://${domaine}invoices`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "DOLAPIKEY": api_key
        },
    });

    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error("Erreur lors de la requête");
    }
}

async function fetchInvoices() {
    try {
        const factures = await getInvoices(api_key, domaine);
        return factures.map(facture => [
            facture.id,
            facture.entity,
            facture.import_key,
            facture.array_options,
            facture.array_languages,
            facture.contacts_ids,
            facture.linked_objects,
            facture.linkedObjectsIds,
            facture.fk_project,
            facture.contact_id,
            facture.user,
            facture.origin,
            facture.origin_id,
            facture.ref,
            facture.ref_ext,
            facture.statut,
            facture.status,
            facture.country_id,
            facture.country_code,
            facture.state_id,
            facture.region_id,
            facture.mode_reglement_id,
            facture.cond_reglement_id,
            facture.demand_reason_id,
            facture.transport_mode_id,
            facture.shipping_methode_id,
            facture.model_pdf,
            facture.last_main_doc,
            facture.fk_bank,
            facture.fk_account,
            facture.note_public,
            facture.note_private,
            facture.total_ht,
            facture.total_tva,
            facture.total_localtax1,
            facture.total_localtax2,
            facture.total_ttc,
            facture.lines,
            facture.name,
            facture.lastname,
            facture.firstname,
            facture.civility_id,
            facture.date_creation,
            facture.date_validation,
            facture.date_modification,
            facture.date_cloture,
            facture.user_author,
            facture.user_creation,
            facture.user_creation_id,
            facture.user_valid,
            facture.user_validation,
            facture.user_validation_id,
            facture.user_closing_id,
            facture.user_modification,
            facture.user_modification_id,
            facture.specimen,
            facture.total_paid,
            facture.tottaldeposits,
            facture.totalcreditnotes,
            facture.sumpayed,
            facture.sumpayed_multicurrency,
            facture.sumdeposit,
            facture.sumdeposit_multicurrency,
            facture.sumcreditnote,
            facture.sumcreditnote_multicurrency,
            facture.remaintopay,
            facture.fk_incoterms,
            facture.label_incoterms,
            facture.location_incoterms,
            facture.brouillon,
            facture.socid,
            facture.fk_user_author,
            facture.fk_user_valid,
            facture.fk_user_modif,
            facture.date,
            facture.datem,
            facture.date_livraison,
            facture.delivery_date,
            facture.ref_client,
            facture.ref_customer,
            facture.type,
            facture.remise_absolue,
            facture.remise_percent,
            facture.revenuestamp,
            facture.resteapeyer,
            facture.close_code,
            facture.close_note,
            facture.paye,
            facture.module_source,
            facture.pos_source,
            facture.fk_fac_rec_source,
            facture.fk_facture_source,
            facture.date_lim_reglement,
            facture.cond_reglement_code,
            facture.mode_reglement_code,
            facture.line,
            facture.extraparams,
            facture.fac_rec,
            facture.date_pointoftax,
            facture.fk_multicurrency,
            facture.multiccurency_code,
            facture.multiccurency_tx,
            facture.multiccurency_total_ht,
            facture.multiccurency_total_tva,
            facture.multiccurency_total_ttc,
            facture.situation_cycle_ref,
            facture.situation_counter,
            facture.situation_final,
            facture.tab_previous_situation_invoice,
            facture.tab_next_situation_invoice,
            facture.retained_warrantly,
            facture.retained_warrantly_date_limit,
            facture.retained_warrantly_fk_cond_reglement,
            facture.cond_reglement_doc
        ]);
    } catch (error) {
        console.error(error);
        return [];
    }
}

/*
 * Récupération des notes de frais
 */
async function getExpenseReports(api_key, domaine) {
    url = `http://${domaine}expensereports`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "DOLAPIKEY": api_key
        },
    });

    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error("Erreur lors de la requête");
    }
}

async function fetchExpenseReports() {
    try {
        const notes = await getExpenseReports(api_key, domaine);
        return notes.map(note => [
            note.id,
            note.entity,
            note.import_key,
            note.array_options,
            note.array_languages,
            note.contacts_ids,
            note.linked_objects,
            note.linkedObjectsIds,
            note.canvas,
            note.fk_project,
            note.origin,
            note.origin_id,
            note.ref,
            note.ref_ext,
            note.status,
            note.region_id,
            note.demand_reason_id,
            note.transport_mode_id,
            note.model_pdf,
            note.last_main_doc,
            note.fk_bank,
            note.fk_account,
            note.note_public,
            note.note_private,
            note.total_ht,
            note.total_tva,
            note.total_localtax1,
            note.total_localtax2,
            note.total_ttc,
            note.lines,
            note.date_creation,
            note.date_validation,
            note.date_modification,
            note.date_cloture,
            note.user_author,
            note.user_creation,
            note.user_creation_id,
            note.user_valid,
            note.user_validation,
            note.user_validation_id,
            note.user_closing_id,
            note.user_modification,
            note.user_modification_id,
            note.specimen,
            note.date_debut,
            note.date_fin,
            note.paid,
            note.user_author_infos,
            note.user_validator_infos,
            note.rule_warning_message,
            note.date_create,
            note.fk_user_author,
            note.date_modif,
            note.fk_user_modif,
            note.date_refuse,
            note.detail_refuse,
            note.fk_user_refuse,
            note.date_cancel,
            note.detail_cancel,
            note.fk_user_cancel,
            note.datevalid,
            note.date_valid,
            note.fk_user_valid,
            note.user_valid_infos,
            note.date_approve,
            note.fk_user_approve,
            note.user_paid_infos,
            note.localtax1,
            note.localtax2,
            note.fk_multicurrency,
            note.multiccurency_code,
            note.multiccurency_tx,
            note.multiccurency_total_ht,
            note.multiccurency_total_tva,
            note.multiccurency_total_ttc,
            note.modepaymentid,
            note.fk_user_creat
        ]);
    } catch (error) {
        console.error(error);
        return [];
    }
}

/*
 * Récupération des utilisateurs
 */
async function getUsers(api_key, domaine) {
    url = `http://${domaine}users`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "DOLAPIKEY": api_key
        },
    });

    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error("Erreur lors de la requête");
    }
}

async function fetchUsers() {
    try {
        const users = await getUsers(api_key, domaine);
        return users.map(user => [
            user.id,
            user.entity,
            user.import_key,
            user.array_options,
            user.array_languages,
            user.contacts_ids,
            user.linked_objects,
            user.linkedObjectsIds,
            user.canvas,
            user.fk_project,
            user.contact_id,
            user.user,
            user.origin,
            user.origin_id,
            user.ref,
            user.ref_ext,
            user.statut,
            user.status,
            user.country_id,
            user.country_code,
            user.state_id,
            user.region_id,
            user.barcode_type,
            user.barcode_type_coder,
            user.mode_reglement_id,
            user.cond_reglement_id,
            user.demand_reason_id,
            user.transport_mode_id,
            user.last_main_doc,
            user.fk_bank,
            user.fk_account,
            user.note_public,
            user.note_private,
            user.name,
            user.lastname,
            user.firstname,
            user.civility_id,
            user.date_creation,
            user.date_validation,
            user.date_modification,
            user.date_cloture,
            user.user_author,
            user.user_creation,
            user.user_creation_id,
            user.user_valid,
            user.user_validation,
            user.user_validation_id,
            user.user_closing_id,
            user.user_modification,
            user.user_modification_id,
            user.specimen,
            user.employee,
            user.civility_code,
            user.gender,
            user.birth,
            user.email,
            user.personal_email,
            user.socialnetworks,
            user.job,
            user.signature,
            user.address,
            user.zip,
            user.town,
            user.office_phone,
            user.office_fax,
            user.user_mobile,
            user.personal_mobile,
            user.admin,
            user.login,
            user.datec,
            user.datem,
            user.socid,
            user.fk_member,
            user.fk_user,
            user.fk_user_expense_validator,
            user.fk_user_holiday_validator,
            user.clicktodial_url,
            user.clicktodial_login,
            user.clicktodial_poste,
            user.datelastlogin,
            user.datepreviouslogin,
            user.iplastlogin,
            user.ippreviouslogin,
            user.datestartvalidity,
            user.dateendvalidity,
            user.photo,
            user.lang,
            user.rights,
            user.user_group_list,
            user.conf,
            user.users,
            user.parentof,
            user.accountancy_code,
            user.thm,
            user.tjm,
            user.salary,
            user.salaryextra,
            user.weeklyhours,
            user.color,
            user.dateemployment,
            user.deteemploymentend,
            user.dafault_c_exp_tax_cat,
            user.ref_employee,
            user.national_registration_number,
            user.default_range,
            user.fk_warehouse,
            user.liste_limit
        ]);
    } catch (error) {
        console.error(error);
        return [];
    }
}

/*
 * Gestion des dates
*/
function TimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const jour = (`0${date.getDate()}`).slice(-2);
    const mois = (`0${(date.getMonth() + 1)}`).slice(-2);
    const annee = date.getFullYear();
    return `${jour}/${mois}/${annee}`;
}

function DateToTimestamp(dateFr) {
    const [annee, mois, jour] = dateFr.split('-');
    const date = new Date(`${mois}/${jour}/${annee}`);
    return Math.floor(date.getTime() / 1000);
}

/*
* Gestion du regEx anti XSS
*/
function antiXSS(chaine) {
    return chaine.replace(/<[^>'"]*('|")[^'"]*('|")>|<[^>]*>|("|')/g, function (e) {
        if (e === '"') {
            return '&quot;';
        } else if (e === "'") {
            return '&#x27;';
        } else {
            return '';
        }
    });
}

/*
* Gestion des longueurs max des textarea
*/
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function () {
        if (textarea.value.length > 2000) {
            textarea.value = textarea.value.slice(0, 2000);
        }
    });
});

/*
* Récupère l'ID de l'utilisateur courant
*/
async function getID() {
    let url = `http://${domaine}users/info`;
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'DOLAPIKEY': api_key,
            'Accept': 'application/json'
        }
    });
    if (response.ok) {
        const Data = await response.json();
        let id = Data.id;
        return id;
    }
    else {
        throw (response.Error);
    }
}