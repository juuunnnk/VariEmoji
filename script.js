const emoji = document.getElementById('emoji');
const emobg = document.getElementById('box-emoji');
const emocolor = document.getElementById('emocolor');
const bgcolor = document.getElementById('bgcolor');
const button = document.getElementById('reset')

emocolor.oninput = function () {
    emoji.style.color = this.value;
}

bgcolor.oninput = function () {
    emobg.style.backgroundColor = this.value;
}

const sliders = document.querySelectorAll('.slider');
const sliderValues = document.querySelectorAll('.value')

for (let i = 0; i < sliders.length; i++) {
    sliderValues[i].innerHTML = sliders[i].value;
}

sliders.forEach(function (slider) {
    const sliderIndex = slider.getAttribute("data-index");
    const output = document.querySelector(`.value[data-index="${sliderIndex}"]`);
    slider.oninput = function () {
        emoji.style.setProperty(`--${this.id}`, this.value);
        output.innerHTML = this.value * 2 / 100;
    };
});