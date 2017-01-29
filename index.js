const postcss = require('postcss');
const Color = require('color');

module.exports = postcss.plugin('postcss-stylish-dark-theme-gene', () => {

    const PROP_COLOR = /(color)|(background)|(border)|(shadow)|(outline)/i;

    const HEX_COLOR = /(#[\da-f]{3,6})/i;
    const RGB_COLOR = /(rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,?\s*\.?\d*\s*\))/i;
    const HSL_COLOR = /(hsla?\(\s*\d+\s*,\s*\d+\s*%?\s*,\s*\d+\s*%?\s*,?\s*\.?\d*\s*\))/i;
    const HWB_COLOR = /(hwba?\(\s*\d+\s*,\s*\d+\s*%?\s*,\s*\d+\s*%?\s*,?\s*\.?\d*\s*\))/i;
    const CMY_COLOR = /(cmyk?\(\s*\d+\s*%?\s*,\s*\d+\s*%?\s*,\s*\d+\s*%?\s*,\s*\d+\s*%?\s*\))/i;
    const NCL_COLOR = /([rygcbm]\s*\d+\s*,\s*\d+\s*%?\s*,\s*\d+\s*%?)/i;
    const RGX_COLOR_LIST = [HEX_COLOR, RGB_COLOR, HSL_COLOR, HWB_COLOR, CMY_COLOR, NCL_COLOR];

    const hasPropColor = (prop) => PROP_COLOR.exec(prop);

    const hasColor = (value) => RGX_COLOR_LIST.find(rgx => rgx.exec(value));

    const geneDarkTheme = (/*Declaration*/decl) => {
        if (hasPropColor(decl.prop) && hasColor(decl.value)) {
            negateColor(decl);
            return;
        }
        decl.remove();
    };

    const negateColor = (/*Declaration*/decl) => {
        if (decl.value.replace) {
            RGX_COLOR_LIST.every((rgx) => {
                decl.value.replace(rgx, (color) => {
                    const c = new Color(color);
                    decl.value = c.negate();
                });
            });
        }
    };

    const removeComment = (/*Comment*/comment) => {
        comment.remove();
        return comment;
    };

    const removeEmptyRule = (/*Rule*/rule) => {
        if (rule.nodes && rule.nodes.length === 0) {
            rule.remove();
        }
        return rule;
    };

    /*------------------------------------------------------------------------------------------------------------------
     * PostCSS Entry Point
     *----------------------------------------------------------------------------------------------------------------*/
    return (/*Root*/root) => {

        root.walkDecls(geneDarkTheme);

        root.walkComments(removeComment);

        root.walkRules(removeEmptyRule);

        return root;
    };

});
