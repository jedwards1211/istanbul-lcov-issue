var fs = require('fs')
var path = require('path')
var spawn = require('child_process').spawn

var main = path.resolve(__dirname, '..', 'src', 'index.js')

var template = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'template.js'), 'utf8')

describe('lcov reporter', function () {
  it('works for file that changes during test', function (done) {
    this.timeout(10000)
    fs.writeFileSync(main, template, 'utf8')
    var child = spawn(process.argv[0], [main], {stdio: [0, 1, 2, 'ipc']})
    child.send({hello: 'world'})
    child.on('exit', function () {
      fs.writeFileSync(main, template + '\n' + template, 'utf8')
      var child = spawn(process.argv[0], [main], {stdio: [0, 1, 2, 'ipc']})
      child.send({hello: 'world'})
      child.on('exit', function () {
        done()
      })
    })
  })
})
