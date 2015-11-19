/*
 * grunt-qiniu-upload
 * https://github.com/wjs/grunt-qiniu-upload
 *
 * Copyright (c) 2015 wjs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs');
  var path = require('path');
  var qiniu = require('qiniu');


  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('qiniu_qupload', 'a grunt plugin which can upload assets to qiniu.', function() {

    function PutPolicy(scope, callbackUrl, callbackBody, returnUrl, returnBody, asyncOps, endUser, expires) {
      this.scope = scope || null;
      this.callbackUrl = callbackUrl || null;
      this.callbackBody = callbackBody || null;
      this.returnUrl = returnUrl || null;
      this.returnBody = returnBody || null;
      this.asyncOps = asyncOps || null;
      this.endUser = endUser || null;
      this.expires = expires || 3600;
    }

    function uptoken(bucketname) {
      var putPolicy = new qiniu.rs.PutPolicy(bucketname);
      //putPolicy.callbackUrl = callbackUrl;
      //putPolicy.callbackBody = callbackBody;
      //putPolicy.returnUrl = returnUrl;
      //putPolicy.returnBody = returnBody;
      //putPolicy.asyncOps = asyncOps;
      //putPolicy.expires = expires;

      return putPolicy.token();
    }

    function PutExtra(params, mimeType, crc32, checkCrc) {
      this.paras = params || {};
      this.mimeType = mimeType || null;
      this.crc32 = crc32 || null;
      this.checkCrc = checkCrc || 0;
    }

    function uploadFile(localFile, bucketName, prefix, overwrite) {
      var extra = new qiniu.io.PutExtra();
      //extra.params = params;
      //extra.mimeType = mimeType;
      //extra.crc32 = crc32;
      //extra.checkCrc = checkCrc;

      var key = prefix + path.basename(localFile);
      if (overwrite) {
        var client = new qiniu.rs.Client();
        client.remove(bucketName, key, function(err, ret) {
          if (!err) {
            // ok
            console.log('overwrite mode, delete old file success! >>> ', key);
          } else {
            console.log('overwrite mode, delete old file error! >>> ', err);
            // http://developer.qiniu.com/docs/v6/api/reference/codes.html
          }
        });
      }
      qiniu.io.putFile(uptoken(bucketName), key, localFile, extra, function(err, ret) {
        if (!err) {
          // 上传成功， 处理返回值
          console.log('upload success! >>> ', ret.key);
          // ret.key & ret.hash
        } else {
          // 上传失败， 处理返回代码
          console.log(err);
          // http://developer.qiniu.com/docs/v6/api/reference/codes.html
        }
      });
    }

    function uploadFileOrDir(filePath, bucketName, prefix, overwrite) {
      if (grunt.file.exists(filePath)) {
        if (grunt.file.isFile(filePath)) {
          uploadFile(filePath, bucketName, prefix, overwrite);
        } else if (grunt.file.isDir(filePath)) {
          grunt.file.recurse(filePath, function(abspath, rootdir, subdir, filename) {
            uploadFile(abspath, bucketName, prefix, overwrite);
          });
        } else {
          console.error('[ERROR] >>> ', filePath, 'is not a file or directory!');
        }
      } else {
        console.error('[ERROR] >>> ', filePath, 'is not exists!');
      }
    }


    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      cwd: '.',
      ak: null,
      sk: null,
      bucket: null,
      overwrite: false,
      assets: null
    });

    // qiniu.io is async
    this.async();

    if (options && options.ak && options.sk) {
      qiniu.conf.ACCESS_KEY = options.ak;
      qiniu.conf.SECRET_KEY = options.sk;

      if (options.cwd && options.bucket && options.assets && Array.isArray(options.assets)) {
        for (var i = options.assets.length - 1; i >= 0; i--) {
          uploadFileOrDir(path.resolve(options.cwd, options.assets[i].src), options.bucket, options.assets[i].prefix, options.overwrite);
        }
      }
    }

  });

};
