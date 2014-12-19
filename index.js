var Gaffa = require('gaffa'),
    crel = require('crel'),
    List = require('gaffa-list'),
    Slab = require('slabs');

function updateTabCount(){
    this.parent._slab.tabs(this.parent.views.content.length + this.parent.views.list.length);
}

function Tabs(){
    this.views.content.on('inserted', updateTabCount);
    this.views.content.on('removed', updateTabCount);
    this.views.content.on('empty', updateTabCount);
    this.views.list.on('inserted', updateTabCount);
    this.views.list.on('removed', updateTabCount);
    this.views.list.on('empty', updateTabCount);
}
Tabs = Gaffa.createSpec(Tabs, List);

Tabs.prototype._type = 'Tabs';
Tabs.prototype.render = function(){
    var slab = new Slab();
    this.renderedElement = slab.element;
    crel(slab.element, {'class':'tabs slab'});
    crel(slab.content, {'class':'tabContent'});
    this.views.content.element = slab.content;
    this._slab = slab;
    
    var view = this;
    this._slab.on('update', function(){
        view.distance.set(this._distance);
    });
    this._slab.on('settle', function(){
        view.index.set(this.tab());
    });
    this.views.content.element = slab.content;
    this.views.list.element = slab.content;
};
Tabs.prototype.index = new Gaffa.Property(function(view, value){
    view._slab.tab(value);
});
Tabs.prototype.distance = new Gaffa.Property(function(view, value){
    view._slab.tab(value);
});

module.exports = Tabs;