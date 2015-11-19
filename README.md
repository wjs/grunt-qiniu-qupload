# grunt-qiniu-qupload

> a grunt plugin which can upload assets to qiniu.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-qiniu-qupload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-qiniu-qupload');
```

## The "qiniu_qupload" task

### Overview
In your project's Gruntfile, add a section named `qiniu_qupload` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  qiniu_qupload: {
    default_options: {
      options: {
        ak: '<Your AccessKey>',
        sk: '<Your SecretKey>',
        bucket: '<Bucket>',
        overwrite: true,
        assets: [{
          src: 'test/upload/assets/css',
          prefix: 'assets/css/'
        },{
          src: 'test/upload/assets/js',
          prefix: 'assets/js/'
        }]
      }
    }
  },
});
```

### Options

#### options.ak
Type: `String`
Default value: `null`

<Your AccessKey>.

#### options.sk
Type: `String`
Default value: `null`

<Your AccessKey>.

#### options.bucket
Type: `String`
Default value: `null`

qiniu bucket where you want to upload your file.

#### options.overwrite
Type: `Boolean`
Default value: `false`

if overwrite existing files.

#### options.assets
Type: `Array`
Default value: `null`

your assets. elements in the array must be in struct like `{src: '<local assets Dir>', prefix: <Key Prefix>}`.

### Usage Examples

In this example, the default options are used to upload all the files in `'test/upload/assets/css'` and `''test/upload/assets/js`. Before you run the command `grunt`, you have to change the option `ak`, `sk` and `bucket` to your qiniu account setting.

```js
grunt.initConfig({
  qiniu_qupload: {
    default_options: {
      options: {
        ak: '<Your AccessKey>',
        sk: '<Your SecretKey>',
        bucket: '<Bucket>',
        overwrite: true,
        assets: [{
          src: 'test/upload/assets/css',
          prefix: 'assets/css/'
        },{
          src: 'test/upload/assets/js',
          prefix: 'assets/js/'
        }]
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
