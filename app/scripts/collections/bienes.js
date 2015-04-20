define([
	'underscore',
	'backbone',
	'models/apart'
], function (_, Backbone,ProjectsBienes) {
	'use strict';

	var BienesCollection = Backbone.Collection.extend({
		model: ProjectsBienes,
		url: '/Bien/'
	});

	return BienesCollection;
});