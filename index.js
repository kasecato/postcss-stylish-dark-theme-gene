const postcss = require('postcss');
const Color = require('color');

module.exports = postcss.plugin('postcss-stylish-dark-theme-gene', () => {

    /*------------------------------------------------------------------------------------------------------------------
     * Property > Color
     *----------------------------------------------------------------------------------------------------------------*/
    const PROP_COLOR = /(color)|(background)|(border)|(shadow)|(outline)|(fill)/i;
    const hasPropColor = (prop) => PROP_COLOR.exec(prop);

    /*------------------------------------------------------------------------------------------------------------------
     * Value > Color
     *----------------------------------------------------------------------------------------------------------------*/
    const HEX_COLOR = /(#[\da-f]{3,6})/ig;
    const NME_COLOR = /(aliceblue)|(antiquewhite)|(aqua)|(aquamarine)|(azure)|(beige)|(bisque)|(black)|(blanchedalmond)|(blue)|(blueviolet)|(brown)|(burlywood)|(cadetblue)|(chartreuse)|(chocolate)|(coral)|(cornflowerblue)|(cornsilk)|(crimson)|(cyan)|(darkblue)|(darkcyan)|(darkgoldenrod)|(darkgray)|(darkgreen)|(darkgrey)|(darkkhaki)|(darkmagenta)|(darkolivegreen)|(darkorange)|(darkorchid)|(darkred)|(darksalmon)|(darkseagreen)|(darkslateblue)|(darkslategray)|(darkslategrey)|(darkturquoise)|(darkviolet)|(deeppink)|(deepskyblue)|(dimgray)|(dimgrey)|(dodgerblue)|(firebrick)|(floralwhite)|(forestgreen)|(fuchsia)|(gainsboro)|(ghostwhite)|(gold)|(goldenrod)|(gray)|(green)|(greenyellow)|(grey)|(honeydew)|(hotpink)|(indianred)|(indigo)|(ivory)|(khaki)|(lavender)|(lavenderblush)|(lawngreen)|(lemonchiffon)|(lightblue)|(lightcoral)|(lightcyan)|(lightgoldenrodyellow)|(lightgray)|(lightgreen)|(lightgrey)|(lightpink)|(lightsalmon)|(lightseagreen)|(lightskyblue)|(lightslategray)|(lightslategrey)|(lightsteelblue)|(lightyellow)|(lime)|(limegreen)|(linen)|(magenta)|(maroon)|(mediumaquamarine)|(mediumblue)|(mediumorchid)|(mediumpurple)|(mediumseagreen)|(mediumslateblue)|(mediumspringgreen)|(mediumturquoise)|(mediumvioletred)|(midnightblue)|(mintcream)|(mistyrose)|(moccasin)|(navajowhite)|(navy)|(oldlace)|(olive)|(olivedrab)|(orange)|(orangered)|(orchid)|(palegoldenrod)|(palegreen)|(paleturquoise)|(palevioletred)|(papayawhip)|(peachpuff)|(peru)|(pink)|(plum)|(powderblue)|(purple)|(rebeccapurple)|(red)|(rosybrown)|(royalblue)|(saddlebrown)|(salmon)|(sandybrown)|(seagreen)|(seashell)|(sienna)|(silver)|(skyblue)|(slateblue)|(slategray)|(slategrey)|(snow)|(springgreen)|(steelblue)|(tan)|(teal)|(thistle)|(tomato)|(turquoise)|(violet)|(wheat)|(white)|(whitesmoke)|(yellow)|(yellowgreen)/ig;
    const RGB_COLOR = /(rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,?\s*\d*\.?\d*\s*\))/ig;
    const HSL_COLOR = /(hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,?\s*\d*\.?\d*\s*\))/ig;
    const HWB_COLOR = /(hwba?\(\s*\d+\s*,\s*\d+\s*%?\s*,\s*\d+\s*%?\s*,?\s*\d*\.?\d*\s*\))/ig;
    const CMY_COLOR = /(cmyk?\(\s*\d+\s*%?\s*,\s*\d+\s*%?\s*,\s*\d+\s*%?\s*,\s*\d+\s*%?\s*\))/ig;
    const NCL_COLOR = /([rygcbm]\s*\d+\s*,\s*\d+\s*%?\s*,\s*\d+\s*%?)/ig;
    const REGX_COLOR_LIST = [RGB_COLOR, HEX_COLOR, NME_COLOR, HSL_COLOR, HWB_COLOR, CMY_COLOR, NCL_COLOR];


    /*------------------------------------------------------------------------------------------------------------------
     * Decl > Property
     *----------------------------------------------------------------------------------------------------------------*/
    const geneDarkTheme = (/*Declaration*/decl) => {
        hasPropColor(decl.prop)
            ? negateColor(decl)
            : decl.remove();
    };

    /*------------------------------------------------------------------------------------------------------------------
     * Decl > Value
     *----------------------------------------------------------------------------------------------------------------*/
    const negateColor = (/*Declaration*/decl) => {
        let foundColor;
        REGX_COLOR_LIST.find(regx =>
            regx.exec(decl.value)
                ? foundColor = decl.value = decl.value.replace(regx, color => new Color(color.toLocaleLowerCase()).negate())
                : false
        );
        if (!foundColor) {
            decl.remove();
        }
    };

    /*------------------------------------------------------------------------------------------------------------------
     * Comment
     *----------------------------------------------------------------------------------------------------------------*/
    const removeComment = (/*Comment*/comment) => {
        comment.remove();
    };

    /*------------------------------------------------------------------------------------------------------------------
     * Rule or AtRule
     *----------------------------------------------------------------------------------------------------------------*/
    const removeEmptyRule = (/*Rule*/rule) => {
        if (rule.nodes && rule.nodes.length === 0) {
            rule.remove();
        }
    };


    /*------------------------------------------------------------------------------------------------------------------
     * PostCSS Entry Point
     *----------------------------------------------------------------------------------------------------------------*/
    return (/*Root*/root) => {

        root.walkDecls(geneDarkTheme);

        root.walkComments(removeComment);

        root.walkRules(removeEmptyRule);

        root.walkAtRules(removeEmptyRule);

        return root;
    };

});
