#!/usr/bin/env node

const {h, render} = require('ink');
const argv = require('minimist')(process.argv.slice(2));
const GlitchProjects = require('import-jsx')('./GlitchProjects.jsx', {pragma: 'h'});
var prompt = require('prompt');

const opts = argv._;
const pins = argv.p||argv.pins;

if(opts.length<1){
  //console.log('Whoops! You need to pass a username `$ gli davidsharp` 🤦‍')
  //process.exit()
  prompt.message='🎏  '
  prompt.delimiter=' ~ '
  prompt.start();
  prompt.get(['Glitch Username'], function (err, result) {
    render(h(GlitchProjects,{opts:[result['Glitch Username']],pins}))
  });
}
else render(h(GlitchProjects,{opts,pins}));