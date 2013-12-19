define([
    'underscore',
    'jquery',
    'backbone',
    'mediator-js'
], function (_, $, Backbone, Mediator) {

// This wraps the logic of mediator-js.
// It prevents a module which publishes a message to be notified of its own message.
// Removal of the loop at this level is appropriate and useful. 


// 	A Subscriber object is returned when calling Mediator.subscribe. It allows you to update options on a given subscriber, or to reference it by an id for easy removal later.

// {
//   id, // guid
//   fn, // function
//   options, // options
//   context, // context for fn to be called within
//   channel, // provides a pointer back to its channel
//   update(options){ ...} // update the subscriber ({ fn, options, context })
// }
    
// channel takes the format
//	"level1:level2: ... :levelN"
//
//	best practice:
//
//	"<application>:<application usage>:<"
//
//	"App:data-select"

var from = function(headerObj) { return headerObj && headerObj.from ? headerObj.from : ""; };

return function() {
	var mediator = new Mediator();
	return {

		publish: function( channel, from ) {
			
			var packet = { from: from || "" };
			var args = Array.prototype.slice.call(arguments, 2);

			args.unshift(from);
			args.unshift(channel);

			mediator.publish.apply(mediator, args );
		},

		// predicate is function with one parameter.
		// data: an array of every data objects passed to "publish"

		subscribe: function( channel, callback, predicate, context) {
			
			context = context || {};
			var options = {};

			var wrappedCallback = function(headerObj) {
				var args = Array.prototype.slice.call(arguments, 1);
				callback.apply(this,args);
			}

			var subObj = mediator.subscribe(channel, wrappedCallback, options, context);
			var predFunc = function(headerObj) { return from(headerObj) !== subObj.id };

			if ( typeof predicate === 'function' ) {
				options.predicate = function(headerObj) { 
					var args = Array.prototype.slice.call(arguments, 1);
					return  predFunc(headerObj) && predicate(args); };
			} else {
				options.predicate = predFunc;
			}

			subObj.update({options: options});
			
			return { id : subObj.id };
		},

		remove : function (channel, id ) {
			mediator.remove(channel, id);
		}
	};
};

});