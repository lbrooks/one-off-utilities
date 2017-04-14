// Util to move all files into their own 'Season <#>' folder based on the S## in their file name.

var glob = require('glob'),
  path = require('path'),
  fs = require('fs');

glob('./*.*', function(err, files) {
  var processed = 0;
  files.forEach(function(file) {
    var fileObj = path.parse(file);

    var regEx_result = fileObj.name.match(/S([0-9]+)/i);
    var se = regEx_result[1].toUpperCase();

    var seasonFolder = 'Season ' + se;
    if (!fs.existsSync('./' + seasonFolder)){
        fs.mkdirSync(seasonFolder);
    }    
    if(se){
      console.log('Move: ' + fileObj.base + '\t -> \t' + './' + seasonFolder + '/');

      fs.renameSync(file, './' + seasonFolder + '/' + fileObj.base);
      processed++;
    }
  });
  console.log(processed + ' files processed');
});
