// Global options
let options = {
    value: 'CALL ME <i class="fab fa-skype"></i>',
    color: '00A3E0',
    arrColor:[0,163,224],
    blur:0,
    delay:2,
    fontFamily:'Bahnschrift',
    fontSize:81,
    animation: (arrColor,blur)=>{
        return(
`@keyframes neonAnim {
    from {
        text-shadow: 
          0 0 ${blur+10}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5),
          0 0 ${blur+40}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5),
          0 0 ${blur+100}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5);
      }
      to {
        text-shadow: 
          0 0 ${blur+5}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5),
          0 0 ${blur+20}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5),
          0 0 ${blur+60}px rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.5);
      }
}`
        )
    } 
}
// Codemirror init
let CSScode = CodeMirror(document.getElementById('code-css-preview'), {
    theme: "darcula",
    mode: "css",
    lineNumbers: true,
    readOnly: true,
    value: 
`.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: #${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`
})
CSScode.setSize("100%", 400)

let HTMLcode = CodeMirror(document.getElementById('code-html-preview'), {
    theme: "darcula",
    mode: "text/html",
    htmlMode: true,
    lineNumbers: true,
    readOnly: true,
    value: 
`<div class="neon">
    ${options.value}
</div>`,
})
HTMLcode.setSize("100%", 100)

// Init preview values
$('#text-preview').html(options.value)
$('#text-preview').css({
    'animation':`neonAnim ${options.delay}s alternate-reverse infinite`,
    'color': `#${options.color}`,
    'font-family': options.fontFamily,
    'font-size': options.fontSize+'px'
})
$('#animationKeyframes').text(options.animation(options.arrColor, options.blur))
    
// EVENTS
// Change text preview && HTML code
$('#input-value-preview').keyup(event => {
    options.value = event.target.value
    $('#text-preview').html(options.value)
    HTMLcode.setValue(
`<div class="neon">
    ${options.value}
</div>`)
})

// Change color preview && CSS code
setPreviewColor = (picker) => {
    options.color = picker.toString()
    options.arrColor = [
        Math.round(picker.rgb[0]),
        Math.round(picker.rgb[1]),
        Math.round(picker.rgb[2])
    ]
    $('#text-preview').css({
        'color': `#${options.color}`,
    })
    $('#animationKeyframes').text(options.animation(options.arrColor, options.blur))
    CSScode.setValue(
`.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: #${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`
    )
}

// Change font-family && CSS code
$('#select-family-preview').change((event)=>{
    options.fontFamily = event.target.value
    $('#text-preview').css({
        'font-family': options.fontFamily,
    })
    CSScode.setValue(
`.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: #${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`
    )
})

// Change font-size && CSS code
$('#input-size-preview').change((event)=>{
    
    options.fontSize = event.target.value
    $('#text-preview').css({
        'font-size':options.fontSize+'px'
    })
    CSScode.setValue(
`.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: #${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`
    )
})

// Change blur && CSS code
$('#input-blur-preview').change((event)=>{
    options.blur = Number(event.target.value)
    $('#animationKeyframes').text(options.animation(options.arrColor, options.blur))
    CSScode.setValue(
`.neon {
    animation: neonAnim 2s alternate-reverse infinite;
    color: #${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`
    )
})

// Change delay && CSS code
$('#input-delay-preview').change((event)=>{
    options.delay = Number(event.target.value)
    $('#text-preview').css({
        'animation':`neonAnim ${options.delay}s alternate-reverse infinite`
    })
    CSScode.setValue(
`.neon {
    animation: neonAnim ${options.delay}s alternate-reverse infinite;
    color: #${options.color};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
}
${options.animation(options.arrColor, options.blur)}`
    )
})

// Add icon && HTML code
let addIcon = (icon) =>{
    options.value += icon
    $('#input-value-preview').val(options.value)
    $('#text-preview').html(options.value)
    HTMLcode.setValue(
`<div class="neon">
    ${options.value}
</div>`)
}

// Clear input value preview
$('#clear-value-preview').click(()=>{
options.value = ''
$('#input-value-preview').val(options.value)
$('#text-preview').html(options.value)
HTMLcode.setValue(
`<div class="neon">
    ${options.value}
</div>`)
})

// Copy code by button
let copyToClipboard = (text)=>{
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

$('.copy-css').click(()=>{
    copyToClipboard(CSScode.getValue())
})
$('.copy-html').click(()=>{
    copyToClipboard(HTMLcode.getValue())
})


