/*
 * Copyright © maty21
 * @author: maty21
 * github: https://github.com/maty21/json-server-extension
 *
*/
// const path = require('path');

// const jsonData = path.resolve(__dirname, 'db.json');
const jsonConcat = require('json-concat');
const Finder = require('fs-finder');
const fsExtra = require('fs-extra');
const requireDir = require('require-dir');
const colors = require('colors');

class jsonExtender {
  constructor(options) {
    const base = __dirname;
    this.generatedPath = options.generatedPath || `${base}/generated`;
    this.filePath = options.filePath;
    this.staticPath = options.staticPath || `${base}/static`;
    this.filesToGenerate = [];
    this.startingPoint = null;
    this.outputs = [];
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
    });
  }

  register(params) {
    if (params instanceof Array) {
      this.filesToGenerate.push(...params);
    } else if (typeof params === 'string') {
      const requires = requireDir(params);
      const funcs = Object.keys(requires).map((key) => requires[key]);
      this.filesToGenerate.push(...funcs);
    }
  }

  generate(isRun = true) {
    if (!isRun) {
      return new Promise((resolve, reject) => resolve({ files: '', filePath: `${this.filePath}` }));
    }
    return new Promise((resolve, reject) => {
      this.status = 'success';
      let prevFunc = this.extend.bind(this);
      this.filesToGenerate.reverse().map((func) => {
        this.startingPoint = prevFunc = func(prevFunc);
      });
      this.startingPoint(this.createJson.bind(this));
      this.promise.then((data) => resolve(data)).catch((e) => reject(e));
    });
  }

  createJson(object) {
    const absolutePath = `${this.generatedPath}/${object.path}`;
    fsExtra.outputJSONSync(absolutePath, object.data, {}, (err) => {
      console.log(err); // => null
    });
  }

  extend(arr) {
    const generatedFiles = Finder.from(`${this.generatedPath}`).findFiles('*.json');
    const staticFiles = Finder.from(`${this.staticPath}`).findFiles('*.json');
    const files = [...staticFiles,
      ...generatedFiles];
    jsonConcat({
      src: [
        // jsonData,
        ...files,
      ],
      dest: this.filePath,
    }, (json) => {
      console.log('___________________________________________________________________________________________'.green);
      console.log('finished successfuly'.green);
      console.log('the files created and combined:'.green);
      let counter = 1;
      files.map((file) => {
        console.log(` ${counter}) ${file}`.green);
        counter++;
      });
      console.log(`the result saved to ${this.filePath} `.green);
      console.log('___________________________________________________________________________________________'.green);
      this.resolve({ files: `${files}`, filePath: `${this.filePath}` });
    });
  }
}

module.exports = jsonExtender;
