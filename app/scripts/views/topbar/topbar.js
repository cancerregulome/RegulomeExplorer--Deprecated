define   ([
    'jquery',
    'underscore',
    'views/base',
    'json!configurations/display.json'
],

function (
    $,
    _,
    BaseView,
    Display
) {

return BaseView.extend({
    template: 'topbar/topbar.hbs',
    className: 'container',

    events: {
            // 'click .signin' : 'toggleModal',
            'click #topbar-search-button' : 'publishSearch',
            'click navbar-gene-variants'  : 'showGeneVariants'
    },

    initialize: function (options) {
        _.extend(this, options);
        //_.bindAll(this, "initHangoutLink", "initAboutLinks", "toggleModal", "publishSearch");
        _.bindAll(this, "publishSearch");
      
    },

    beforeRender: function () {
    },

    afterRender: function() {
        this.$el.find(".titled").html(Display["title"] || "AppTemplate");
    },

    toggleModal: function() {
        return false;
    },

    publishSearch: function() {
        var term = this.$el.find('#querySearchTerm').val();
        if ( term !== "" ) this.mediator.publish( "search:term:selected", term);
        return false;
    },
});

// end define
});
