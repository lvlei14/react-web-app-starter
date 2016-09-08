#!/usr/bin/env node

var server = require('./static-server');

if (process.argv[2] == '-h' || process.argv[2] == '--help') {
  console.log('\nusage: pushstate-server [directory] [port] [file] [proxy]\n');
  process.exit(0);
}
server.start({
  directory: process.argv[2],
  port: process.argv[3],
  file: process.argv[4],
  proxy: process.argv[5],
});
