const fs = require('fs');
const Downloader = require('nodejs-file-downloader');

const path = './downloads/blacklisted.netset';
const parent = './downloads';

module.exports.match_ip = (ip, call) => {

    fs.exists(parent, (exists) => {
      if(!exists){
        load_ip_sets_from_server().then(e => {
          console.log('File Downloaded')
        });
        call(true, null);
      }

      else {
        const file = fs.readFileSync(path, 'utf-8');
        const split = file.split('\n');
        call(false, split.includes(ip))
      }

    });

};

module.exports.load_ip_sets_from_server = async(update = true) => {

  if(fs.existsSync(path) && !update) return;

  const downloader = new Downloader({
    url: 'https://raw.githubusercontent.com/Umkus/ip-index/8a13f6011245e0283129932c1e66583a4cd5da68/dist/blacklisted.netset',
    directory: "./downloads",//This folder will be created, if it doesn't exist.
    maxAttempts: 10,//Default is 1.
    cloneFiles: false,
    onError:function(error){//You can also hook into each failed attempt.

    },
    onProgress:function(percentage, chunk, remainingSize){//Gets called with each chunk.

    }
  });

  try {
    await downloader.download();//Downloader.download() returns a promise.
  } catch (error) {

  }

};


