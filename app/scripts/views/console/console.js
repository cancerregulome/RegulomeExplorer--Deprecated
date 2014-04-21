// base app view.  Adds first level of structure to the Application.  Rendered after document is loaded
define([
  'views/base',
  'views/topbar/topbar',
  'views/console/console_list',
  'templates'
], function(BaseView, TopbarView, ConsoleListView, JST){

var BaseAppView = BaseView.extend({
  template: 'console/modal.hbs',

  events: {
    'click #clearConsoleButton': 'clearConsole'
  },

    beforeRender: function () {
      this.list = new Backbone.Collection([], {});
      this.consoleListView = new ConsoleListView( { collection: this.list })
      this.setView('.modal-body', this.consoleListView );
    },

    afterRender: function() {
      var self = this;
      self.consoleListView.on('empty', function() {
        self.trigger('nomessage');
      });
      self.consoleListView.on('populated', function() {
        self.trigger('message');
      });
    },

    addError: function(text) {
      this.list.add({"text": text, "error": true});
    },

    addWarning: function(text) {
      this.list.add({"text": text, "warning": true});
    },

    clearConsole: function() {
      this.list.reset();
    }

});

  return BaseAppView;
});