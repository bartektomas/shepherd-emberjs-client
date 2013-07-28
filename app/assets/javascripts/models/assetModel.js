Vilio.Asset = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	filename : DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'), 
	links : DS.hasMany('Vilio.Link', { embedded: 'load' }),
	relationships: DS.hasMany('Vilio.Relationship', { embedded: 'load' }),
    metadata: DS.hasMany('Vilio.MetadatumValue', { embedded: 'load' })
});
