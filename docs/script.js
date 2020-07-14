const emoji = document.getElementById('emoji');
const emobg = document.getElementById('box-emoji');
const emocolor = document.getElementById('emocolor');
const bgcolor = document.getElementById('bgcolor');
const reset = document.getElementById('resetBtn')
const emoKeycolor = "#e6c81e";
const bgKeycolor = "#8f8f8f"

emocolor.oninput = function () {
    emoji.style.color = this.value;
}

bgcolor.oninput = function () {
    emobg.style.backgroundColor = this.value;
}

const sliders = document.querySelectorAll('.slider');
const sliderValues = document.querySelectorAll('.value')
const emotions = [sliders];


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


let url = new URL(window.location);


// ロード時にパラメーターを読み込む
function loadParam() {
    const urlParam = url.searchParams
    // 色の設定
    if (urlParam.has(`emcolor`)) {
        let emValue = urlParam.get(`emcolor`);
        let bgValue = urlParam.get(`bgcolor`);
        let emcValue = decodeURIComponent(emValue);
        let bgcValue = decodeURIComponent(bgValue);
        emoji.style.color = emcValue;
        emobg.style.backgroundColor = bgcValue;
        emocolor.value = emcValue
        bgcolor.value = bgcValue;
    }
    if (urlParam.has(`joy`)) {
        sliders.forEach(function (emotion) {
            const sliderIndex = emotion.getAttribute("data-index");
            const output = document.querySelector(`.value[data-index="${sliderIndex}"]`);
            let emoVal = urlParam.get(emotion.id);
            emoji.style.setProperty(`--${emotion.id}`, emoVal);
            output.innerHTML = emoVal * 2 / 100;
            emotion.value = emoVal;
        })
    }
}

window.onload = loadParam();




reset.onclick = function () {
    resetParam();
    emoji.style.color = emoKeycolor;
    emobg.style.backgroundColor = bgKeycolor;
    emocolor.value = emoKeycolor
    bgcolor.value = bgKeycolor;
    sliders.forEach(function (emotion) {
        const sliderIndex = emotion.getAttribute("data-index");
        const output = document.querySelector(`.value[data-index="${sliderIndex}"]`);
        emoji.style.setProperty(`--${emotion.id}`, 0);
        output.innerHTML = 0;
        emotion.value = 0;
    })
}

// パラメーターのリセット
function resetParam() {
    sliders.forEach(function (emotion) {
        url.searchParams.delete(emotion.id);
    })
    url.searchParams.delete("emcolor");
    url.searchParams.delete("bgcolor");
    return url.href
}


// シェアボタンの処理
function shareClick() {
    resetParam();
    for (let i = 0; i < sliders.length; i++) {
        let sliderId = sliders[i].id;
        let sliderValue = sliders[i].value;
        url.searchParams.append(sliderId, sliderValue);
    }
    let ecValue = emocolor.value;
    let bgValue = bgcolor.value;
    url.searchParams.append("emcolor", ecValue);
    url.searchParams.append("bgcolor", bgValue);
    return url.href;
}

const twBtn = document.getElementById('twitter');
const fbBtn = document.getElementById('facebook');
const liBtn = document.getElementById('line');


twBtn.onclick = function () {
    var shareURL = shareClick();
    var twHref = 'https://twitter.com/share?text=' + encodeURIComponent("いまの表情") + '&url=' + encodeURIComponent(shareURL) + '&hashtags=' + encodeURIComponent("variemoji");
    this.href = twHref;
}

fbBtn.onclick = function () {
    var shareURL = shareClick();
    var fbHref = 'http://www.facebook.com/share.php?u=' + encodeURIComponent(shareURL);
    this.href = fbHref;
}

liBtn.onclick = function () {
    var shareURL = shareClick();
    var liHref = 'https://line.me/R/msg/text/?' + encodeURIComponent("いまの表情") + ' ' + encodeURIComponent(shareURL);;
    this.href = liHref;
}