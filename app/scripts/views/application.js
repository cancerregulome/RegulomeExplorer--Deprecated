// base app view.  Adds first level of structure to the Application.  Rendered after document is loaded
define([
  'views/base',
  'views/topbar/topbar',
  'views/console/console'
], function(BaseView, TopbarView, ConsoleView){

var BaseAppView = BaseView.extend({
    template: 'application.hbs',

    beforeRender: function () {
      this.consoleView = new ConsoleView({ collection: new Backbone.Collection([], {} ) });
      this.setView('#navigation-container', new TopbarView());
      this.setView('#modal-holder', this.consoleView);
    },

    afterRender: function() {
      var self = this;
      self.consoleView.on('nomessage', function() {
        self.$el.find('#navbarConsoleFlag').addClass('nomessage').removeClass('message');
      });
      self.consoleView.on('message', function() {
        self.$el.find('#navbarConsoleFlag').removeClass('nomessage').addClass('message');
      });
      
    },

    showError: function(text) {
     this.consoleView.addError(text);
    },

    showWarning: function(text) {
     this.consoleView.addWarning(text);
    }

});

  return BaseAppView;
});