/**
 * Created by cbobach on 26-07-16.
 *
 */

window.onload = function () {
    addThemeColors();
    addMenuColors('base_color', base_colors, '500');
    addMenuColors('contrast_color', contrast_colors, 'A400');
    toggleMenu();

};

function addThemeColors() {
    var colorLight = '#fafafa';
    var colorDark = '#303030';

    var element = document.getElementById('theme_color');
    var bodyStyle = document.body.style;

    var dark = document.createElement('div');
    dark.style.backgroundColor = colorDark;
    dark.addEventListener('click', function () {
        bodyStyle.backgroundColor = colorDark;
        bodyStyle.color = colorLight;
    });

    var light = document.createElement('div');
    light.style.backgroundColor = colorLight;
    light.addEventListener('click', function () {
        bodyStyle.backgroundColor = colorLight;
        bodyStyle.color = colorDark;
    });

    element.appendChild(dark);
    element.appendChild(light);

}

function addMenuColors(elementId, colors, colorStrength) {
    // Necessary own property check
    for(var color in colors) {
        if (colors.hasOwnProperty(color)) {
            // console.log(colors[color][colorStrength]);

            var r = colors[color][colorStrength][0];
            var g = colors[color][colorStrength][1];
            var b = colors[color][colorStrength][2];

            var div = document.createElement('div');
            div.id = color;
            div.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b +')';

            var element = document.getElementById(elementId);
            element.addEventListener('click', onSelect);
            element.appendChild(div);
            // console.log(color);
        }
    }
}

function onSelect(event) {
    event.stopImmediatePropagation();
    var element = event.target;
    var parentId = element.parentNode.attributes['id'];

    // Resetting selection
    var nodes = document.getElementById(parentId.value).childNodes;
    for (var i = 0; i < nodes.length; i++){
        var node = nodes[i];
        node.setAttribute('class', '');
    }

    element.setAttribute('class', 'selected');

    updateTheme();
}

function updateTheme() {
    var theme = document.getElementById('theme');
    theme.innerHTML = '';

    var colors = document.getElementsByClassName('selected');

    var base = colors[0].getAttribute('id');
    var contrast = colors[1].getAttribute('id');


    var baseColors = base_colors[base];
    var contrastColors = contrast_colors[contrast];

    for (var colorDark in baseColors) {
        if (baseColors.hasOwnProperty(colorDark)) {

            for (var colorLight in baseColors) {
                if (baseColors.hasOwnProperty(colorLight)) {

                    if (parseInt(colorLight) < parseInt(colorDark)) {

                        for (var colorContrast in contrastColors) {
                            if (contrastColors.hasOwnProperty(colorContrast)) {
                                var colorC = contrastColors[colorContrast];
                                var colorD = baseColors[colorDark];
                                var colorL = baseColors[colorLight];

                                var rgbDark = 'rgb(' + colorD[0] + ',' + colorD[1] + ',' + colorD[2] +')';
                                var rgbLight = 'rgb(' + colorL[0] + ',' + colorL[1] + ',' + colorL[2] +')';
                                var rgbCont = 'rgb(' + colorC[0] + ',' + colorC[1] + ',' + colorC[2] +')';

                                var bcLight = document.createElement('div');
                                bcLight.className = 'light_color';
                                bcLight.setAttribute('title',
                                    'Dark:          ' + rgbDark + '\n' +
                                    'Light:         ' + rgbLight + '\n' + '' +
                                    'Contrast: ' + rgbCont);
                                bcLight.style.backgroundColor = rgbLight;

                                var dark = document.createElement('div');
                                dark.className = 'dark_color';
                                dark.style.backgroundColor = rgbDark;

                                var cont = document.createElement('div');
                                cont.className = 'cont_color';
                                cont.style.backgroundColor = rgbCont;

                                var remove = document.createElement('div');
                                remove.className = 'remove';
                                remove.innerHTML = 'X';
                                remove.addEventListener('click', function () {
                                    this.parentNode.style.display = 'none';
                                });

                                bcLight.appendChild(remove);
                                bcLight.appendChild(dark);
                                bcLight.appendChild(cont);
                                theme.appendChild(bcLight);
                            }
                        }

                    }
                }
            }
        }
    }
}

function toggleMenu() {
    var toggle = document.getElementById('toggle_menu');

    toggle.addEventListener('click', function () {
        var theme = document.getElementById('theme_color');
        var themeStyle = window.getComputedStyle(theme);
        var base = document.getElementById('base_color');
        var baseStyle = window.getComputedStyle(base);
        var contrast = document.getElementById('contrast_color');
        var contrastStyle = window.getComputedStyle(contrast);

        if (baseStyle.getPropertyValue('display') === 'flex' &&
            contrastStyle.getPropertyValue('display') === 'flex' &&
            themeStyle.getPropertyValue('display') === 'flex') {
            theme.style.display = 'none';
            base.style.display = 'none';
            contrast.style.display = 'none';
            toggle.innerHTML = 'MENU';
        } else {
            theme.style.display = 'flex';
            base.style.display = 'flex';
            contrast.style.display = 'flex';
            toggle.innerHTML = 'X';
        }
    });
}