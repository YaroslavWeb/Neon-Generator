// Global options
let options = {
    value: 'NEON TEXT &#128561;',
    valueEmpty: '<img src="./libs/cat.gif" class="img-fluid">',
    color: '#007BFF',
    arrColor: [0,123,255],
    blur: 0,
    delay: 2,
    fontFamily: 'Cursive',
    fontSize: 72,
    emoji: [
        "&#129409;",
        "&#9940;",
        "&#9996;",
        "&#128526;",
        "&#128169;",
        "&#10084;",
        "&#128514;",
        "&#128519;",
        "&#128525;",
        "&#128545;",
        "&#127881;",
        "&#128561;",
        "&#128518;",
        "&#128567;",
        "&#127925;",
        "&#11088;",
        "&#127774;",
        "&#128049;",
        "&#127877;",
        "&#127767;",
        "&#129303;",
        "&#128076;",
        "&#128064;",
        "&#128571;"
    ],
    fa: [
        "far fa-user-circle",
        "fas fa-user-tie",
        "fas fa-sign-in-alt",
        "fas fa-battery-quarter",
        "fas fa-envelope-square",
        "fas fa-phone-square-alt",
        "fab fa-html5",
        "fab fa-skype",
        "fab fa-github",
        "fab fa-youtube",
        "fab fa-vk",
        "fab fa-instagram",
        "fab fa-google",
        "fab fa-gitlab",
        "fa fa-bell",
        "fa fa-bug",
        "fa fa-eye",
        "fa fa-gamepad",
        "fa fa-home",
        "fa fa-key",
        "fa fa-taxi",
        "fa fa-tv",
        "fa fa-wifi",
        "far fa-heart",
    ],
    animation: (arrColor, blur) => {
        return (
            `@keyframes neonAnim {
    from {
        text-shadow:
          0 0 ${blur + 10}px rgba(${arrColor[0]}, ${arrColor[1]}, ${arrColor[2]}, .7),
          0 0 ${blur + 40}px rgba(${arrColor[0]}, ${arrColor[1]}, ${arrColor[2]}, .7),
          0 0 ${blur + 100}px rgba(${arrColor[0]}, ${arrColor[1]}, ${arrColor[2]}, .7);
      }
      to {
        text-shadow:
          0 0 ${blur + 5}px rgba(${arrColor[0]}, ${arrColor[1]}, ${arrColor[2]}, .7),
          0 0 ${blur + 20}px rgba(${arrColor[0]}, ${arrColor[1]}, ${arrColor[2]}, .7),
          0 0 ${blur + 60}px rgba(${arrColor[0]}, ${arrColor[1]}, ${arrColor[2]}, .7);
      }
}`
        );
    }
}

// Codemirror init
let CSScode = CodeMirror(document.getElementById('code-css-preview'), {
    theme: "default",
    mode: "css",
    lineNumbers: true,
    readOnly: true,
    value: `.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: ${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`
});
CSScode.setSize("100%", 400);

let HTMLcode = CodeMirror(document.getElementById('code-html-preview'), {
    theme: "default",
    mode: "text/html",
    htmlMode: true,
    lineNumbers: true,
    readOnly: true,
    value: `<div class="neon">
    ${options.value}
</div>`
});
HTMLcode.setSize("100%", 100);

// darkmode switcher
const darkSwitch = document.getElementById('darkSwitch');
$(window).on('load', () => {
    if (darkSwitch) {
        initTheme();
        $(darkSwitch).on('change', () => {
            resetTheme();
        });
    }
});

function initTheme() {
    const darkThemeSelected =
        // dark === null, default !== null
        localStorage.getItem('darkSwitch') === null ||
        localStorage.getItem('darkSwitch') === 'dark';
    if (darkThemeSelected) {
        darkSwitch.checked = true;
    } else {
        darkSwitch.checked = false;
    }
    resetTheme();
}

function resetTheme() {
    if (darkSwitch.checked) {
        HTMLcode.setOption("theme", "darcula");
        CSScode.setOption("theme", "darcula");
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkSwitch', 'dark');
    } else {
        HTMLcode.setOption("theme", "default");
        CSScode.setOption("theme", "default");
        document.body.setAttribute('data-theme', 'default');
        localStorage.setItem('darkSwitch', 'default');
    }
}

// inital default values
$(document).ready(function ($) {
    // emoji list
    $.each(options.emoji, function (i, r) {
        $("#emoji-row").append('<div class="col-3 col-sm-2 mt-2"><button type="button" class="btn btn-sm btn-light w-100" onclick="addIcon(this.innerHTML)">' + r + '</button></div>');
    });

    // fa list
    $.each(options.fa, function (i, r) {
        $("#fa-row").append('<div class="col-3 col-sm-2 mt-2"><button type="button" class="btn btn-sm btn-light w-100" onclick="addIcon(this.innerHTML)"><i class="' + r + '"></i></button></div>');
    });

    // preview
    $('#text-preview').html(options.value);

    // preview css
    $('#text-preview').css({
        'animation': `neonAnim ${options.delay}s alternate-reverse infinite`,
        'color': `${options.color}`,
        'font-family': options.fontFamily,
        'font-size': options.fontSize + 'px'
    });

    // animation
    $('#animationKeyframes').text(options.animation(options.arrColor, options.blur))

    // text
    $('#input-value-preview').val(options.value);

    // font-family
    $('#select-family-preview').val(options.fontFamily);

    $("#input-blur-preview").ionRangeSlider({
        min: 0,
        max: 30,
        from: 5
    });

    $("#input-size-preview").ionRangeSlider({
        min: 10,
        max: 100,
        from: 72
    });

    $("#input-delay-preview").ionRangeSlider({
        min: 1,
        max: 10,
        step: 0.5,
        from: 2
    });

    // preloader remove
    $('#preloader').fadeOut();
});

// EVENTS
// Change text preview && HTML code
$('#input-value-preview').keyup(event => {
    options.value = event.target.value
    if (options.value.replace(/\s/g, '') != '') {
        $('#text-preview').html(options.value)
        HTMLcode.setValue(
            `<div class="neon">
    ${options.value}
</div>`);
    } else {
        $('#text-preview').html(options.valueEmpty)
        HTMLcode.setValue(
            `<div class="neon">
    ${options.valueEmpty}
</div>`);
        $('#text-preview').css({
            'color': `${options.color}`
        });

        $('#animationKeyframes').text(options.animation(options.arrColor, options.blur));
        console.log(options.arrColor)
    }
})

// colorpicker
$('#colorpicker').colorpicker({
    format: "hex"
}).on('colorpickerChange', e => {
    options.color = e.color.original.color;
    let ArrRGB = options.color.toRgbString().match(/\d+/g)
    options.arrColor = [
        Math.round(ArrRGB[0]),
        Math.round(ArrRGB[1]),
        Math.round(ArrRGB[2])
    ];

    $('#text-preview').css({
        'color': `${options.color}`
    });

    $('#animationKeyframes').text(options.animation(options.arrColor, options.blur))
    CSScode.setValue(
        `.neon {
        animation: neonAnim 2s alternate-reverse infinite;
        color: ${options.color};
        font-family: ${options.fontFamily};
        font-size: ${options.fontSize}px;
    }
    ${options.animation(options.arrColor, options.blur)}`);
});

// Change font-family && CSS code
$('#select-family-preview').change((event) => {
    options.fontFamily = event.target.value;

    $('#text-preview').css({
        'font-family': options.fontFamily,
    });

    CSScode.setValue(
        `.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: ${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`);
});

// Change font-size && CSS code
$('#input-size-preview').change((event) => {

    options.fontSize = event.target.value
    $('#text-preview').css({
        'font-size': options.fontSize + 'px'
    })

    CSScode.setValue(
        `.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: ${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`);
});

// Change blur && CSS code
$('#input-blur-preview').change((event) => {
    options.blur = Number(event.target.value)
    $('#animationKeyframes').text(options.animation(options.arrColor, options.blur))
    CSScode.setValue(
        `.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: ${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`);
});

// Change delay && CSS code
$('#input-delay-preview').change((event) => {
    options.delay = Number(event.target.value);

    $('#text-preview').css({
        'animation': `neonAnim ${options.delay}s alternate-reverse infinite`
    });

    CSScode.setValue(
        `.neon {
    animation: neonAnim ${options.delay}s alternate-reverse infinite;
    color: ${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`);
});

// Add icon && HTML code
let addIcon = (icon) => {
    options.value += icon
    $('#input-value-preview').val(options.value)
    $('#text-preview').html(options.value)
    HTMLcode.setValue(
        `<div class="neon">
    ${options.value}
</div>`);
}

// Clear input value preview
$('#clear-value-preview').click(() => {
    options.value = '';
    $('#input-value-preview').val(options.value).focus();
    $('#text-preview').html(options.valueEmpty);
    HTMLcode.setValue(
        `<div class="neon">
    ${options.valueEmpty}
</div>`);
    $('#animationKeyframes').text(options.animation(options.arrColor, options.blur));
});

// Copy code by button
let copyToClipboard = (text) => {
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

// clipboard events
$('.copy-css').click(() => {
    copyToClipboard(CSScode.getValue());
});

$('.copy-html').click(() => {
    copyToClipboard(HTMLcode.getValue());
});
