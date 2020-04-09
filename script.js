// Global options
let options = {
    value: 'CALL ME <i class="fab fa-skype"></i>',
    valueEmpty: 'Text is empty <i class="fa fa-exclamation-circle"></i>',
    color: '00A3E0',
    colorEmpty: 'F03A17',
    arrColor: [0, 163, 224],
    arrColorErr: [240, 58, 23],
    blur: 0,
    delay: 2,
    fontFamily: 'Bahnschrift',
    fontSize: 81,
    animation: (arrColor, blur) => {
        return (
            `@keyframes neonAnim {
    from {
        text-shadow: 
          0 0 ${blur + 10}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5),
          0 0 ${blur + 40}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5),
          0 0 ${blur + 100}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5);
      }
      to {
        text-shadow: 
          0 0 ${blur + 5}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5),
          0 0 ${blur + 20}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5),
          0 0 ${blur + 60}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5);
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
    value:
        `.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: ${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`
});
CSScode.setSize("100%", 400)

let HTMLcode = CodeMirror(document.getElementById('code-html-preview'), {
    theme: "default",
    mode: "text/html",
    htmlMode: true,
    lineNumbers: true,
    readOnly: true,
    value:
        `<div class="neon">
    ${options.value}
</div>`
});
HTMLcode.setSize("100%", 100)

// inital default values
$(document).ready(function () {
    // preview
    $('#text-preview').html(options.value);

    // preview css
    $('#text-preview').css({
        'animation': `neonAnim ${options.delay}s alternate-reverse infinite`,
        'color': `${options.color}`,
        'font-family': options.fontFamily,
        'font-size': options.fontSize + 'px'
    });

    // animation init
    $('#animationKeyframes').text(options.animation(options.arrColor, options.blur))

    // text
    $('#input-value-preview').val(options.value);

    // font family
    $('#select-family-preview').val("Bahnschrift");

    // color
    $('#colorpicker').val("#00A3E0");

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
            'color': `#${options.colorEmpty}`
        });

        $('#animationKeyframes').text(options.animation(options.arrColorErr, options.blur));
    }
})

// colorpicker
$('#colorpicker').colorpicker({
    format: "hex",
}).on('colorpickerChange colorpickerCreate', function (e) {

    console.log(e);

    options.color = e.color.original.color;

    options.arrColor = [
        Math.round(e.color['_color'].color[0]),
        Math.round(e.color['_color'].color[1]),
        Math.round(e.color['_color'].color[2])
    ];

    console.log("Parse rgba: " + options.arrColor);
    console.log("Parse HEX: " + options.color);

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
    $('#input-value-preview').val('').focus();

    $('#text-preview').html(options.valueEmpty);

    HTMLcode.setValue(
        `<div class="neon">
    ${options.valueEmpty}
</div>`);

    $('#text-preview').css({
        'color': `#${options.colorEmpty}`
    });

    $('#animationKeyframes').text(options.animation(options.arrColorErr, options.blur));
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