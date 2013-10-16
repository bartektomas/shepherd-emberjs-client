Vilio.RelationshipsController = Ember.ArrayController.extend({	
    // relationship selected from the list
    selectedRelationship: null,

	// broken per https://github.com/emberjs/data/issues/587
	empty: function() {
		var numOfAssets = this.get('content.length');
		return numOfAssets === 0;
	}.property('content.length')
});

Vilio.RelationshipsIndexController = Ember.ArrayController.extend({});

Vilio.RelationshipController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
    needs: ['portfolios', 'relationshipsNew'],
    portfolioToAddTo: null,

    // list of portfolios that this asset does not have a relationship
    // with and can be added to by this user
    availablePortfolios: function() {
        console.log('getting available portfolios');
        var ports =  this.get('controllers.portfolios.content');
        var assetPorts = this.get('content.asset.portfolios');
        var availablePorts = [];
        if (assetPorts) {
            var arrays = [ports.toArray(), assetPorts.toArray()]
            availablePorts = arrays.shift().filter(function(v) {
                return arrays.every(function(a) {
                    return a.indexOf(v) === -1;
                });
            });
        }
        return availablePorts;
    }.property('content.asset.portfolios'),
    // array of portfolios that asset does not have
    // a relationship with
    hasAvailablePortfolios: function() {
       return this.get('availablePortfolios.length') > 0;
    }.property('content.asset.portfolios'),
    addToPortfolio: function() {
        console.log('adding to portfolio');
        var portfolio = this.get('portfolioToAddTo');
        var asset = this.get('content.asset');
        this.get('controllers.relationshipsNew').create(asset, portfolio);
    }
});

Vilio.RelationshipEditController = Vilio.RelationshipController.extend({});

Vilio.RelationshipsNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
	needs: ['portfolio'],

	portfolio: function() {
		return this.get('controllers.portfolio.content.id');
	}.property('controllers.portfolio.content'),

    create: function(asset, portfolio) {
		var relationship = this.store.transaction().createRecord(Vilio.Relationship);
        relationship.set('asset', asset);
        relationship.set('portfolio', portfolio);
        portfolio.get('relationships').pushObject(relationship);
        this.set('content', relationship);
        this.saveEdits().then(function() {
            console.log('relationship created');
        });
    }
});

