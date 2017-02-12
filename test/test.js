const postcss = require('postcss');
const expect = require('chai').expect;

const plugin = require('../');

var test = function (input, output, done) {
    postcss([plugin()]).process(input).then((result) => {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};


describe('postcss-stylish-dark-theme-gene', () => {

    it('named color.', (done) => {
        test(
            'a { color: white; } p { display: block; }',
            'a { color: rgb(0, 0, 0); }',
            done
        );
    });

    it('not exists named color.', (done) => {
        test(
            'a { color: none; } p { display: block; }',
            '',
            done
        );
    });

    it('three-letter hex color.', (done) => {
        test(
            'a { color: #000; } p { display: block; }',
            'a { color: rgb(255, 255, 255); }',
            done
        );
    });

    it('six-letter hex color.', (done) => {
        test(
            'a { color: #ffffff; } p { display: block; }',
            'a { color: rgb(0, 0, 0); }',
            done
        );
    });

    it('rgb color.', (done) => {
        test(
            'a { color: rgb(1, 2, 3); } p { display: block; }',
            'a { color: rgb(254, 253, 252); }',
            done
        );
    });

    it('rgba color.', (done) => {
        test(
            'a { color: rgba(1, 2, 3, 0.4); } p { display: block; }',
            'a { color: rgba(254, 253, 252, 0.4); }',
            done
        );
    });

    it('hsl color.', (done) => {
        test(
            'a { color: hsl(1, 2%, 3%); } p { display: block; }',
            'a { color: rgb(247, 248, 248); }',
            done
        );
    });

    it('hsla color.', (done) => {
        test(
            'a { color: hsla(1, 2%, 3%, 0.4); } p { display: block; }',
            'a { color: rgba(247, 248, 248, 0.4); }',
            done
        );
    });

    it('background-color.', (done) => {
        test(
            'a { background-color: white; } p { display: block; }',
            'a { background-color: rgb(0, 0, 0); }',
            done
        );
    });

    it('border-color.', (done) => {
        test(
            'a { border-color: white; } p { display: block; }',
            'a { border-color: rgb(0, 0, 0); }',
            done
        );
    });

    it('border-top-color.', (done) => {
        test(
            'a { border-top-color: black; } p { display: block; }',
            'a { border-top-color: rgb(255, 255, 255); }',
            done
        );
    });

    it('border-right-color.', (done) => {
        test(
            'a { border-right-color: white; } p { display: block; }',
            'a { border-right-color: rgb(0, 0, 0); }',
            done
        );
    });

    it('border-bottom-color.', (done) => {
        test(
            'a { border-bottom-color: black; } p { display: block; }',
            'a { border-bottom-color: rgb(255, 255, 255); }',
            done
        );
    });

    it('border-left-color.', (done) => {
        test(
            'a { border-left-color: white; } p { display: block; }',
            'a { border-left-color: rgb(0, 0, 0); }',
            done
        );
    });

    it('background-image.', (done) => {
        test(
            'a { background-image: linear-gradient(to bottom, black, white); } ' +
            'p { display: block; }',
            'a { background-image: linear-gradient(to bottom, rgb(255, 255, 255), rgb(0, 0, 0)); }',
            done
        );
    });

    it('outline-color.', (done) => {
        test(
            'a { outline-color: white; } p { display: block; }',
            'a { outline-color: rgb(0, 0, 0); }',
            done
        );
    });

    it('text-shadow.', (done) => {
        test(
            'a { text-shadow: 1px 1px 2px black; } p { display: block; }',
            'a { text-shadow: 1px 1px 2px rgb(255, 255, 255); }',
            done
        );
    });

    it('box-shadow.', (done) => {
        test(
            'a { box-shadow: 10px 5px 5px black; } p { display: block; }',
            'a { box-shadow: 10px 5px 5px rgb(255, 255, 255); }',
            done
        );
    });

    it('background.', (done) => {
        test(
            'a { background: white url(../foo.jpg) no-repeat center center; } ' +
            'p { display: block; }',
            'a { background: rgb(0, 0, 0) url(../foo.jpg) no-repeat center center; }',
            done
        );
    });

    it('multiple colors.', (done) => {
        test(
            'a { background: white url(../foo.jpg), black url(../bar.jpg); } ' +
            'p { display: block; }',
            'a { background: rgb(0, 0, 0) url(../foo.jpg), rgb(255, 255, 255) url(../bar.jpg); }',
            done
        );
    });

    it('outline.', (done) => {
        test(
            'a { outline: 1px solid white; } p { display: block; }',
            'a { outline: 1px solid rgb(0, 0, 0); }',
            done
        );
    });

    it('border.', (done) => {
        test(
            'a { border: 1px solid white; } p { display: block; }',
            'a { border: 1px solid rgb(0, 0, 0); }',
            done
        );
    });

    it('border-top.', (done) => {
        test(
            'a { border-top: 1px solid white; } p { display: block; }',
            'a { border-top: 1px solid rgb(0, 0, 0); }',
            done
        );
    });

    it('border-right.', (done) => {
        test(
            'a { border-right: 1px solid white; } p { display: block; }',
            'a { border-right: 1px solid rgb(0, 0, 0); }',
            done
        );
    });

    it('border-bottom.', (done) => {
        test(
            'a { border-bottom: 1px solid white; } p { display: block; }',
            'a { border-bottom: 1px solid rgb(0, 0, 0); }',
            done
        );
    });

    it('border-left.', (done) => {
        test(
            'a { border-left: 1px solid white; } p { display: block; }',
            'a { border-left: 1px solid rgb(0, 0, 0); }',
            done
        );
    });

    it('comment.', (done) => {
        test(
            'a { /* comment */ }',
            '',
            done
        );
    });

    it('atrule.', (done) => {
        test(
            '@media all and (min-width:500px) {}',
            '',
            done
        );
    });

});
