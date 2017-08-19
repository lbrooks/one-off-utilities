var glob = require('glob'),
  path = require('path'),
  fs = require('fs');

var newName = process.argv[2];

glob('./*.*', function(err, files) {
  var processed = 0;
  files.forEach(function(file) {
    var fileObj = path.parse(file);

    var regEx_result = fileObj.name.match(/(S[0-9]+E[0-9\-]+)/i);
    var se = '';
    if(regEx_result){
      se = regEx_result[1].toUpperCase();
    } else {
      regEx_result = fileObj.name.match(/([0-9]+)x([0-9]+)/i);
      if(regEx_result) {
        var season = regEx_result[1];
        var episode = regEx_result[2];

        if(season.length === 1){
          season = '0' + season;
        }
        if(episode.length === 1){
          episode = '0' + episode;
        }
        se = 'S' + season + 'E' + episode;
      }
    }

    if(se){
      var origName = fileObj.base;
      var updateName = newName + ' - ' + se + fileObj.ext

      console.log('Rename: ' + origName + '\t -> \t' + updateName);

      fs.renameSync(file, './' + updateName);
      processed++;
    }
  });
  console.log(processed + ' files processed');
});
