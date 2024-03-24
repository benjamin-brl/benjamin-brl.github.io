const dates = document.querySelectorAll('td[data-date]');

dates.forEach(date => {
    let d = date.getAttribute('data-date')
    d = d !== '' ? dateFormer(d) : ' n/d '
    date.textContent = d
    date.removeAttribute('data-date')
})

function dateFormer(d) {
    var date = new Date(d)
    var j = date.getDate()
    var m = date.getMonth()+1
    var a = date.getFullYear()
    var dateF = `${j}/${m < 10 ? '0'+m : ''+m}/${a}`
    return dateF
}