define   ([
    'jquery',
    'underscore',
    'views/base',
    'json!configurations/display.json',
    'views/topbar/hangout_link',
    'views/topbar/about_link',
    'views/topbar/sign_in_modal',
    'views/topbar/cloud_storage'
],

function ( 
    $,
    _,
    BaseView,
    Display,
    HangoutLinkView,
    AboutLinkView,
    SignInModal,
    CloudStorageView
) {

return BaseView.extend({
    template: 'topbar/topbar.hbs',
    className: 'container',

    initialize: function (options) {
        _.extend(this, options);
        _.bindAll(this, "initHangoutLink", "initAboutLinks");
      
    },

    beforeRender: function () {
        var csview = new CloudStorageView({el : 'body'});
        csview.render();
        this.initHangoutLink();
        this.initAboutLinks();
    },

    afterRender: function() {
        this.initSignIn();
        // _.defer(function() {
        //     new CloudStorageView();
        // });
        // _.defer(this.initHangoutLink);
        // _.defer(this.initAboutLinks);

        this.$el.find(".titled").html(Display["title"] || "AppTemplate");
    },

    initHangoutLink: function() {
        var hangoutUrl = Display["hangoutUrl"];
        if (hangoutUrl) {
             this.setView('.modal-body', new HangoutLinkView({ "url": hangoutUrl }));
        }
    },

    initAboutLinks: function() {
        var aboutLinks = Display["aboutLinks"] || [];
        this.setView('.modal-body', new HangoutLinkView({ "links": aboutLinks }));
        // if (!_.isEmpty(aboutLinks)) {
        //     var UL = this.$el.find(".about-links");
        //     UL.empty();
        //     _.each(aboutLinks, function(aboutLink) {
        //         if (aboutLink.divider) {
        //             UL.append("<li class='divider'></li>");
        //             if (aboutLink.header) {
        //                 UL.append("<li class='nav-header'>" + aboutLink.header + "</li>");
        //             }
        //         } else {
        //             UL.append(AboutLink(aboutLink));
        //         }
        //     });
        // }
    },

    initSignIn:function () {
        this.$signInModal = new SignInModal({el : 'body'});

    //     var _this = this;
    //     var addAuthProviders = function(json) {
    //         _.each(json.providers, function (provider) {
    //             var sign_in_view = new SignInView({ "provider":provider });
    //             _this.$signInModal.find(".modal-body").append(sign_in_view.render().el);
    //             _this.$signInModal.find(".signout-all").click(function() {
    //                 sign_in_view.signout();
    //             });
    //             if (provider.id == "google") {
    //                 if (provider.active) _this.$el.find(".requires-google-oauth").show();
    //                 sign_in_view.on("signout", function() {
    //                     _this.$el.find(".requires-google-oauth").hide();
    //                 });
    //             }
    //         });
    //     };

    //     // prepare sign in process in case of 403 (Forbidden)
    //     var signInProcessStart = _.once(function() {
    //         $.ajax({
    //             url: "svc/auth/providers",
    //             type: "GET",
    //             dataType: "json",
    //             success: function(json) {
    //                 addAuthProviders(json);
    //                 _this.$signInModal.modal("show");
    //                 _this.$signInModal.find(".signout-all").click();
    //             }
    //         });
    //     });

    //     $(document).ajaxError(function(event, request) {
    //         if (request.status == 403) signInProcessStart();
    //     });

    //     $.ajax({ url:"svc/auth/whoami", method:"GET", context:this, success:addAuthProviders });
    }
});

// end define
});
