// base app view.  Adds first level of structure to the Application.  Rendered after document is loaded
define([
  'views/base',
  'views/topbar/topbar',
  'templates'
], function(BaseView, TopbarView, JST){

var BaseAppView = BaseView.extend({
  template: 'console/console_list.hbs',

  events: {
    'click .close' : 'removeItem'
  },

    beforeRender: function () {
    },

    afterRender: function() {
      this.collection.on('add remove change reset', function(model, collection, options) {
        if (this.collection.length) {
          this.trigger('populated');
        }
        else {
          this.trigger('empty');
        }
        this.render();
      }, this);
    },

    serialize: function() {
      return { messages: this.collection.toJSON() };
    },

    addError: function(text) {
      this.collection.add({"text": text, "error": true});
    },

    addWarning: function(text) {
      this.collection.add({"text": text, "warning": true});
    },

    clearList: function() {
      this.collection.reset();
    },

    removeItem: function(el) {
      var index = $(el.target).data('index');
      var model = this.collection.at(index);
      this.collection.remove(model);
    },

});

  return BaseAppView;
});