var casper = require('casper').create();

if (casper.cli.has('url')) {
  casper.start(casper.cli.get('url'), function() {
    this.capture('public/images/' + casper.cli.get('name') + '.jpg', {
      top: 0,
      left: 0,
      width: 1000,
      height: 600,
    }, {
      format: 'jpg',
      quality: 75,
    });
  });

  casper.run();
}
