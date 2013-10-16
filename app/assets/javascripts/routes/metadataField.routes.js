Shepherd.FieldsRoute = Ember.Route.extend({
    model: function() {
        return Shepherd.MetadatumField.find();
    },
    // load values lists for forms
    setupController: function(controller, model) {
        this._super(controller, model);
        var metadatumValuesListsController = this.controllerFor('metadata_lists');
        if (metadatumValuesListsController) 
          metadatumValuesListsController.set('model', Shepherd.MetadatumValuesList.find({}));
        this.controllerFor('topNav').set('selected', 'Metadata Fields');
    }	
});


Shepherd.FieldsIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
    	this.render('fields.index', {
	    	into: 'fields',
    		outlet: 'main'
    	});
    }
});

Shepherd.FieldRoute = Ember.Route.extend({});

Shepherd.FieldShowRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('field');
    },
    renderTemplate: function() {
        this.render('field.show', {
          into: 'fields',
          outlet: 'main'
        });
    },
    events: {
        edit: function() {
            var model = this.controller.get('content');
            this.transitionTo('field.edit', model);
        }
    }
});

Shepherd.FieldsNewRoute = Ember.Route.extend({
	model: function() {
		var transaction = this.store.transaction();
		return transaction.createRecord(Shepherd.MetadatumField, {});
	},
    renderTemplate: function() {
		this.render('fields.new', {
			into: 'fields',
            outlet: 'main'
		});
	},
	events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('fields.index');
		},
		save: function() {
			var route = this;
			this.controller.saveEdits().then(function() {
				route.transitionTo('field.show', route.controller.get('content'));
			}, function() {
                // error handled on controller
            });
		}
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});

Shepherd.FieldEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('field');
    },
   	// create transaction and add model to it
	setupController: function(controller, model) {
        this._super(controller, model);
		this.store.transaction().add(model);
	},
    renderTemplate: function() {
        this.render('field.edit', {
            into: 'fields',
            outlet: 'main'
        });
    },
    events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('fields.index');
		},
		save: function() {
			var route = this;
			this.controller.saveEdits().then(function() {
				route.transitionTo('field.show', route.controller.get('content'));
			}, function() {
                // error handled on controller                               
            });
		},
        remove: function() {
            var route = this;
            this.controller.deleteRecord().then(function() {
                route.transitionTo('fields.index');
            });
        }
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});
