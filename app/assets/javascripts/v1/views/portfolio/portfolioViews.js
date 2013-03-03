Luxin.PortfolioSelect2 = Luxin.Select2.extend({
	
	// bind change in selected portfolio to trigger routing 
	// to show portfolio or portfolio list if null
    valueDidChange: Ember.observer(function() {
        this._super();
        var selection = this.get('selection');
        if (selection) {
            console.log('select2 value changed to ' + selection.get('name'));
        	this.get('controller').transitionToRoute('portfolio.show', selection);
        } else {
        	this.get('controller').transitionToRoute('portfolios.index');
        }
    }, 'value')
});

Luxin.PortfoliosIndexView = Ember.View.extend({
  	templateName: 'v1/templates/portfolio/list'
});

Luxin.PortfoliosNewView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/edit'
});

Luxin.PortfoliosView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/portfolios'
});

Luxin.PortfolioView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/portfolio'
});

Luxin.PortfolioShowView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/show'
});

Luxin.PortfolioEditView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/edit'
});