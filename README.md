RegulomeExplorer
================

TCGA Regulome Explorer

Regulome Explorer is a tool for exploring and understanding genomic association analyses.  It is an HTML5 web application that uses multiple visualizations to provide users with a means to dive into relationships between complex, heterogenous data features.

The previous version of RE is deployed at [explorer.cancerregulome.org/all_pairs/](explorer.cancerregulome.org/all_pairs/) and [explorer.cancerregulome.org/re/](explorer.cancerregulome.org/re/)

This is a new implementation of RE that does not share codebase with the previous version.  If you are looking for the source code for the previous version of RE, go to [www.googlecode.com/p/regulome-explorer/](www.googlecode.com/p/regulome-explorer/)

This new version was never completed and has been deprecated.  The current version is copied from its location on [www.googlecode.com/p/regulome-explorer/](www.googlecode.com/p/regulome-explorer/) to [cancerregulome/RegulomeExplorer](https://github.com/cancerregulome/RegulomeExplorer)

Build Instructions
==================

Requirements:
NodeJS > 0.10.1
git

Clone the repo to a local directory and change to that directory

```
git clone http://github.com/cancerregulome/RegulomeExplorer /local/git/re
cd  /local/git/re
```

Install grunt-cli and bower for global access

```
npm install -g grunt-cli bower
```

Install the remaining development packages

```
npm install
```

Install the client application dependencies:

```
bower install
```

Build the web application:

```
grunt build
```

Set up the development environment
==================================

Edit Gruntfile.js.  In the JSON object passed to grunt.initConfig() find the connect.proxies object.
Point the local development server to proxy to the external mongo databases :

```
proxies: [
   {
                    context : '/svc',  //identify request to proxy via URL
                    host : 'server1',  
                    port : 8000, 
                    // https : false,
                    changeOrigin : false,
                    // rewrite: {
                    //     '^/mongo' : ''  //remove /mongo from proxied request
                    // }
                }
	]
```

the *rewrite* attribute can be used to modify the proxy call before passing it to the remote server.
