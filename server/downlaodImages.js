var casper = require('casper').create();
var count = 0;

casper.start();
if (casper.cli.has('urls')) {
  console.log(casper.cli.get('urls'))
  var urls = JSON.parse(casper.cli.get('urls'));
  casper.eachThen(urls, function(response) {
    console.log(response.data)
    this.thenOpen(response.data, function(response) {
      this.capture('public/images/' + (++count) + '.jpg', {
        top: 0,
        left: 0,
        width: 1000,
        height: 600,
      }, {
        format: 'jpg',
        quality: 75,
      });
      this.echo(count);
    });
  });

  casper.run();
}
