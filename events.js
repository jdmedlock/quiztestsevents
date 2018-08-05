// Create your own Event Tracker system:
//
// 1. create an `EventTracker` object
//    • it should accept a name when constructed
// 2. extend the `EventTracker` prototype with:
//    • an `on` method
//    • a `notify` method
//    • a `trigger` method
//
// EXAMPLE:
// function purchase(item) { console.log( 'purchasing ' + item); }
// function celebrate() { console.log( this.name + ' says birthday parties are awesome!' ); }
//
// var nephewParties = new EventTracker( 'nephews ');
// var richard = new EventTracker( 'Richard' );
//
// nephewParties.on( 'mainEvent', purchase );
// richard.on( 'mainEvent', celebrate );
// nephewParties.notify( richard, 'mainEvent' );
//
// nephewParties.trigger( 'mainEvent', 'ice cream' );
//
// SPECIAL CONSIDERATIONS:
// Since the Udacity quiz grading system seems to sometimes have problems
// with ES6 syntax (as of August 2018) this app is written in ES5. 
//

function EventTracker(eventName) {
  this.eventName = eventName;
  this.events = [];
}

EventTracker.prototype.on = function (eventName, callback) {
  console.log('Entered "on"');
  this.events.push( {eventName: eventName, callback: callback} );
}

EventTracker.prototype.notify = function (evtTracker, eventName) {
  console.log('Entered "notify"');
  evtTracker.trigger(eventName, null);
}

EventTracker.prototype.trigger = function (eventName, callbackParms) {
  console.log('Entered "trigger"');
  var event = this.events.find(function(entry) {
    return entry.eventName === eventName;
  });
  console.log('event: ', event);
  event.callback(callbackParms);
}

// Test the functionality of the EventTracker system
function purchase(item) { 
  console.log( 'purchasing ' + item);
}

function celebrate() {
  console.log( this.name + ' says birthday parties are awesome!' );
}

var nephewParties = new EventTracker( 'nephews ');
var richard = new EventTracker( 'Richard' );

nephewParties.on( 'mainEvent', purchase );
richard.on( 'mainEvent', celebrate );
nephewParties.notify( richard, 'mainEvent' );

nephewParties.trigger( 'mainEvent', 'ice cream' );

// Log the attributes for each instance of the EventTracker class to
// aid in debugging
console.log('newphewParties events: ', nephewParties.events);
console.log('richard events: ', richard.events);
