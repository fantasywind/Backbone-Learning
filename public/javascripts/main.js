$(function () {

var Alert = Backbone.Model.extend({
  initialize: function () {
    this.view = new AlertView(this.toJSON());
  },
  defaults: function () {
    return {
      id: alerts.get_serial(),
      title: '警告',
      text: '測試訊息',
      type: 'alert-warning'
    }
  }
});

var AlertView = Backbone.View.extend({
  className: 'alert',
  template: _.template( $("#alert-tmpl").html() ),
  events: {
    "click button": "hide_alert"
  },
  hide_alert: function (e) {
    alerts.get(this.id).destroy();
  },
  render: function ( model ) {
    this.id = model.id;
    this.$el = $( this.template( model ) ).addClass( model.type );
    return this;
  },
  initialize: function (options) {
    this.render(options);
  }
});

var Alerts = Backbone.Collection.extend({
  model: Alert,
  url: '/te',
  initialize: function () {
  },
  get_serial: function () {
    if (!this.length) return 1;
    return this.last().get('id') + 1;
  }
});

window.alerts = new Alerts();

var AppView = Backbone.View.extend({
  el: '#container',
  initialize: function () {
    this.listenTo(alerts, 'add', this.new_alert)
  },
  events: {
    "click #add": "add_alert"
  },
  add_alert: function (e) {
    var alertMsg = this.$('#alert-msg').val(),
        alertTitle = this.$('#alert-type').find("option:selected").text(),
        alertType = this.$('#alert-type').val(),
    alertObj = new Alert({
      text: alertMsg,
      type: alertType,
      title: alertTitle
    });
    alerts.add(alertObj);
  },
  new_alert: function (model) {
    this.$('#alert-container').append( model.view.$el );
  }
});

window.app_view = new AppView();
});
