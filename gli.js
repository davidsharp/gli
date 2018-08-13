#!/usr/bin/env node

const {h, render} = require('ink');
const argv = require('minimist')(process.argv.slice(2));
const GlitchProjects = require('import-jsx')('./GlitchProjects.jsx', {pragma: 'h'});

const opts = argv._;

const unmount = render(h(GlitchProjects,{opts}));