/*global define*/
define([
  'jquery',
  'backbone',
  'views/home'
], function ($, Backbone, homeView) {
  'use strict';

  var HomeView = new homeView(),
    Router = Backbone.Router.extend({
      routes: {
          '':     'home',
          'home': 'home',
          'verificacion': 'ver',
          'confirmacion': 'con'
      },

      initialize: function() {
      },

      home: function() {
          HomeView.render();
      },

      ver: function() {
          console.log("verificación");
      },

      con: function() {
          console.log("confirmación");
      }
  });
  return Router;
});


