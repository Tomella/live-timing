# DEPRECATED - Look at project lt2 (Live Timing 2) It's much simpler.

## Simple live timing for MotoGP

The MotoGP live timing has a rich JSON datafeed but they only show a bit of the data in their free live timing.

### Getting started
There are some things to do to get started. If you want to automate it more go ahead.
* Make sure you have NodeJS, NPM, Gulp and Bower installed globally
* > cd live-timing
* > npm install
* > bower install
* > gulp

Always leave gulp running as it builds the concatenated JS and CSS on the fly.
Serve up your content:
> node server

### How it builds
Everything builds into the liveTiming directory. It builds to have a small foot print so that it can
easily be overlayed with other applications with little likelyhood of name clashes with:
* The HTML at the base
* All other content under the directories.

Just copy the liveTiming directory to where ever you want and then go http://my.host.com/liveTiming and it should work.
It uses CDN for AngularJS and the rest is tiny
