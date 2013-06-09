

var ShipModel = Backbone.Model.extend({
  SIZE_X: 20,
  SIZE_Y: 20,

  colorTable: {
      0: '#FFF',
      1: '#000',
      2: '#444',
      3: '#888',
      4: '#CCC'
  },

  initialize: function() {
    this.cells = [];
    for(var i = 0; i < this.SIZE_X; ++i) {
      var row = [];
      for(var j = 0; j < this.SIZE_Y; ++j) {
        row.push(0);
      }
      this.cells.push(row);
    }
    this.clear();
  },

  serialize: function() {
      var values = [];
      this._forEach(function(i, j, v) {
        values.push(v);
      }, true);
      return values.join('');
  },

  unserialize: function(data) {
      var self = this;
      this._forEach(function(i, j) {
          return parseInt(data.charAt(i*self.SIZE_Y + j));
      });
  },

  _forEach: function(c, silent) {
    for(var i = 0; i < this.SIZE_X; ++i) {
      for(var j = 0; j < this.SIZE_Y; ++j) {
        var a = c(i, j, this.cells[i][j]);
        if(a !== undefined) {
          this.cells[i][j] = a;
        }
      }
    }
    if(silent !== true) 
        this.trigger('change', this);
  },

  clear: function() {
    this._forEach(function() { return 0 });
  },

  getColor: function(i, j) {
    return this.colorTable[this.cells[i][j]];
  },

  setProperty: function(i, j, name, value) {
    this.cells[i][j] = value;
    this.trigger('change', this);
  }

});

function button(el) {
}

function toolbar(el, action) {
  $(el).find(".button").click(function() {
    action($(this).attr('href').slice(1))
    return false;
  })
}


var CellView = Backbone.View.extend({

  tagName: 'div',
  SIZE: 20,

  events: {
    'click': 'click',
    'hover': 'hover'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    var i = this.i = this.options.i;
    var j = this.j = this.options.j;
    this.editor = this.options.editor;
    var cell_size = this.SIZE;
    var cell = $(this.el);

    cell.css({
      position: 'absolute',
      top: i*cell_size,
      left: j*cell_size,
      width: cell_size,
      height: cell_size
    });

    this.model.bind('change', this.render);
  },

  render: function() {
    var el = $(this.el);
    var c;
    if(c = this.model.getColor(this.i, this.j)) {
      el.css({'background-color': c});
    } else {
      el.css({'background-color': 'none'});
    }
    return this;
  },

  click: function(e) {
    var el = self.el;
    var editor = this.editor;
    this.model.setProperty(this.i, this.j, editor.selectedProperty, editor.selectedValue);
    return false;
  },

  hover: function() {
    if(this.editor.draw_enabled) {
        var editor = this.editor;
        this.model.setProperty(this.i, this.j, editor.selectedProperty, editor.selectedValue);
    }
    return false;
  }
});

var Toolbar = Backbone.View.extend({

  events: {
    'click .button': 'click'
  },

  click: function(e) {
    this.action($(e.target).attr('href').slice(1))
    e.preventDefault();
    return false;
  },

  action: function(act) {
    this.trigger('action', act);
  }

});

var ColorPicker = Backbone.View.extend({
  events: {
    'click .button': 'click'
  },

  click: function(e) {
    var data = $(e.currentTarget).attr('href').slice(1).split('/')
    var fn = data[0];
    var args = data.slice(1);
    this.action(fn ,args);
    this.$('.selector').removeClass('selected');
    $(e.currentTarget).addClass('selected');
    e.preventDefault();
    return false;
  },

  action: function(act, args) {
    this.trigger('action', act, args);
  }

});

var Editor = Backbone.View.extend({

  events: {
    'mousedown': 'mousedown',
    'mouseup': 'mouseup'
  },

  initialize: function() {
    var self = this;
    _.bindAll(this, 'toolbar_action');
    self.selectedProperty = 'color';
    self.selectedValue = 1;

    self.cells_views = [];
    self.toolbar = new Toolbar({
      el: $('#canvas_actions')
    })
    self.color = new ColorPicker({
      el: $('#color_picker')
    })

    self.toolbar.bind('action', this.toolbar_action);
    self.color.bind('action', this.toolbar_action);

    this.model._forEach(function(i, j) {
      var cell = new CellView({
        model: self.model,
        i: i,
        j: j,
        editor: self 
      });
      self.cells_views.push(cell);
      self.el.append(cell.el);
    });
  },

  mousedown: function() {
    this.draw_enabled = true;
    return false;
  },

  mouseup: function() {
    this.draw_enabled = false;
    return false;
  },

  toolbar_action: function(act, args) {
    if(act == 'clear') {
      this.model.clear();
    } else if (act == 'color') {
        this.selectedProperty = 'color';
        this.selectedValue = parseInt(args[0]);
    }
  }
});

