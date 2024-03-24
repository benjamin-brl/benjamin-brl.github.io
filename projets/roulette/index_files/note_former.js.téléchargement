const formulaire = document.querySelector('form')
const checkbox = formulaire.querySelector('input[type=checkbox]')
const note = formulaire.querySelector('#note')
const submit = formulaire.querySelector('input[type=submit]')

checkbox.addEventListener('click', e => {
    SetRemDisabled(checkbox.checked, note)
    SetRemDisabled(1-checkbox.checked, submit)
})

function SetRemDisabled(Check, input) {
    if (!Check) {
        input.removeAttribute("disabled");
    } else if (!input.hasAttribute("disabled")) {
        input.setAttribute("disabled", "");
    }
}

note.addEventListener('input', e => {
    console.log(note.value)
    SetRemDisabled(1-checkerNote(note.value), submit)
})

function checkerNote(entrer) {
    const regex = /^[0-9]+(\.[0-9]+)?$/
    console.log(regex.test(entrer))
    return regex.test(entrer)
}