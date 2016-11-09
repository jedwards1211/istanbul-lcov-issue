process.on('message', function (message) {
  console.log(message)
  setTimeout(process.exit, 1000)
})
