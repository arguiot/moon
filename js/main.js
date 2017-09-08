var updateShareDisplay = function() {
    var wScroll = window.scrollY;
    if (wScroll > (window.innerHeight * 2/3 + 300)) {
        document.querySelector('.share').style.display = 'none'
    } else {
        document.querySelector('.share').style.display = ''
    }
}

updateShareDisplay()
window.addEventListener('scroll', updateShareDisplay)

var curPhase = 6

document.querySelectorAll('.phase-selector button').forEach(function (elem) {
    elem.addEventListener('click', function() {
        curPhase = Number(this.getAttribute('data-phase'))
    })
})