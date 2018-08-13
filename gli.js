#!/usr/bin/env node

const {h, render} = require('ink');
const argv = require('minimist')(process.argv.slice(2));
const GlitchProjects = require('import-jsx')('./GlitchProjects.jsx', {pragma: 'h'});

const opts = argv._;
const pins = argv.p||argv.pins;

if(opts.length<1){
  console.log('Whoops! You need to pass a username `$ gli davidsharp` 🤦‍')
  process.exit()
}

const unmount = render(h(GlitchProjects,{opts,pins}));