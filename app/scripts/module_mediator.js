define([
    'underscore',
    'jquery',
    'backbone',
    'mediator'
], function (_, $, Backbone, Mediator) {

	// Each module will have exactly one subscription to each channel.
	// It will hold the subscriber ID assigned to it.

	var channels = [
		"data:selectOne", 
		"data:selectMany", 
		"data:subset", 
		"data:remove",

		"data:export"
	];

return function() {
	var mediator = window[window.app].mediator;
	var subscriberId = {};
	return {
		
		subscribe: function(channel, callback, predicate, context) {
			if ( subscriberId[channel] ) { 
				mediator.remove(channel, subscriberId[channel]);
				delete subscriberId[channel];
			}
			subscriberId[channel] = mediator.subscribe(channel, callback, predicate, context);
		},

		publish: function( channel ){
			var args = Array.prototype.slice.call(arguments, 1);
			args.unshift( subscriberId[channel] );
			args.unshift(channel);
			mediator.publish.apply(mediator, args );
		}
	};
};
});