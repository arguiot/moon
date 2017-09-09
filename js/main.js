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
var hemisphere = document.querySelector('.phase-selector').getAttribute('data-hemisphere')

document.getElementById('hemisphere').innerHTML = hemisphere

document.querySelectorAll('.phase-selector button').forEach(function (elem) {
    elem.addEventListener('click', function() {
        curPhase = Number(this.getAttribute('data-phase'))
        document.getElementById('phase-name').innerHTML = this.getAttribute('title') 
    })
})

document.getElementById('swap-hems').addEventListener('click', function() {
    if (hemisphere == 'northern') {
        hemisphere = 'southern'
    } else {
        hemisphere = 'northern'
    }

    document.getElementById('hemisphere').innerHTML = hemisphere;
    document.querySelector('.phase-selector').setAttribute('data-hemisphere', hemisphere);
})