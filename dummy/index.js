'use strict';
const EOL = require('os').EOL;
/* eslint-disable */
const fs = require('fs-extra');
const chalk = require('chalk');
/* eslint-enable */

module.exports = {
  description: 'A test blueprint to write to files',

  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  async afterInstall( /*options*/ ) {
    await this.updateFoo('add');

    await this.updateBar('add');

    await this.updateBarAgain('add');
  },

  async afterUninstall( /*options*/ ) {
    await this.updateFoo('remove');

    await this.updateBar('remove');

    await this.updateBarAgain('remove');
  },

  async updateFoo(action) {
    const file = 'foo.js',
      marker = {
        after: '// !TOP!'
      },
      content = EOL + EOL + 'Update foo';

    let result;

    if (action === 'add') {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, 'foo');

    return result;
  },

  async updateBar(action) {
    const file = 'bar.js',
      marker = {
        after: '// !TOP!'
      },
      content = EOL + EOL + 'Update bar';

    let result;

    if (action === 'add') {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, 'bar');

    return result;
  },

  async updateBarAgain(action) {
    const file = 'bar.js',
      marker = {
        after: '// !TOP!'
      },
      content = EOL + EOL + 'Somthing else';

    let result;

    if (action === 'add') {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, 'bar again');

    return result;
  },

  // WARNING - make sure the text you are wanting to remove
  // is unique. This is simple find replace operation running
  // here. E.g if you ask to remove "var = foo" - any instances
  // of "var = foobar would leave bar all alone :(
  async removeFromFile(fullPath, contentsToRemove) {
    let returnValue = {
      path: fullPath,
      originalContents: '',
      contents: '',
      removed: false,
    };

    let exists = fs.existsSync(fullPath);

    if (exists) {
      let originalContents = '';

      originalContents = fs.readFileSync(fullPath, {
        encoding: 'utf8'
      });

      let contentsToWrite = originalContents.replace(contentsToRemove + EOL, '');

      if (contentsToWrite !== originalContents) {

        returnValue.removed = true;

        await fs.outputFile(fullPath, contentsToWrite);

        return returnValue;
      }
    }

    return Promise.resolve(returnValue);
  },

  writeUpdateFileStatusToUI(fileUpdateResult, action, message) {
    if (action === 'add') {
      if (fileUpdateResult.inserted) {
        this._writeStatusToUI(chalk['green'], 'updated', message);
      } else {
        this._writeStatusToUI(chalk['red'], 'skipped', message);
      }
    } else {
      if (fileUpdateResult.removed) {
        this._writeStatusToUI(chalk['red'], 'updated', message);
      } else {
        this._writeStatusToUI(chalk['yellow'], 'skipped', message);
      }
    }
  },
};