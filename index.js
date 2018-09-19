#! /usr/bin/env node

var program = require('commander');
var fs = require('fs');


function run(name, options) {

  var comp = options.pureC ? 'PureComponent' : 'Component';
  var ext = options.ext;
  var stylesheet = options.style & options.style == true ? 'css' : options.style;
  var dir = options.dir;
  var withRedux = options.withRedux;
  var stateless = options.stateless;
  console.log(name)

  if (stylesheet && !['css', 'scss', 'less'].includes(stylesheet)) {
    console.log('stylesheet file name not valid exit code:2');
    return;
  }

  var className = name.charAt(0).toUpperCase() + name.substr(1);
  console.log(className)
  var classNameFull = `${className}.${ext}`;
  var dirName = className.toLowerCase();
  var filePath, ssPath, fileContent = '';

  if (dir == true) {
    if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
    filePath = `${dirName}/${classNameFull}`;
    ssPath  = `${dirName}/${dirName}.${stylesheet}`
  } else {
    filePath = `${classNameFull}`;
    ssPath  = `${dirName}.${stylesheet}`
  }

  if (filePath && fs.existsSync(filePath)) {
    console.log('File already present exit code:2');
    return;
  }

  if (!stateless) {
    fileContent = require('./fileContent/content.js')(className, comp, withRedux, {ssPath: `${dirName}.${stylesheet}`, stylesheet})
  } else {
    fileContent = require('./fileContent/stateless.js')(className,{ssPath: `${dirName}.${stylesheet}`, stylesheet})
  }

  fs.writeFile(filePath, fileContent , (err) => {
    if (err) throw err;
    else {
      if (!stylesheet || fs.existsSync(ssPath)) return;

      try{
        fs.writeFileSync(ssPath, '');
      }catch (e){
        console.log("Cannot write file ", e);
      }
    }
  });

}

program
  .version('1.0.0')
  .option('-e, --ext <type>', 'extention of file', 'js')
  .option('-p, --pureC [type]', 'extend with PureComponent', false)
  .option('-s, --style [type]', 'include (or)css file')
  .option('-d, --dir [type]', 'create new directory', false)
  .option('-r, --withRedux [type]', 'file with redux', false)
  .option('-S, --stateless [type]', 'stateless component', false)
  .arguments('<name>')
  .action(run)
  .parse(process.argv);

