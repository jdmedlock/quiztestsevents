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

function EventTracker(name) {
  this.name = name;
  this.events = [];
}

EventTracker.prototype.on = function (eventName, callback) {
  this.events.push( {type: 'on', eventName: eventName, callback: callback, tracker: this });
};

EventTracker.prototype.notify = function (evtTracker, eventName) {
  this.events.push( { type: 'notify', eventName: eventName, callback: null, tracker: evtTracker });
};

EventTracker.prototype.trigger = function (eventName, callbackParms) {
  var event = this.events.forEach(function(entry) {
    if (entry.eventName === eventName) {
      switch (entry.type) {
        case 'on':
          entry.callback.call(entry.tracker, callbackParms);
          break;
        case 'notify':
          entry.tracker.trigger(entry.eventName, callbackParms);
        break;
      }
    }
  });
};

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

// Additional tests
console.log('\n');
var parent1 = new EventTracker('parent 1');
var parent2 = new EventTracker('parent 2');
var child = new EventTracker('dispatcher');

parent1.on('christmas_morning', function (param) {
  console.log('Parent 1 received event');
});

parent2.on('christmas_morning', function (param) {
  console.log('Parent 2 received event - param:', param);
});

child.notify(parent1, 'christmas_morning');
child.notify(parent2, 'christmas_morning');
child.trigger('christmas_morning', 'presents!');