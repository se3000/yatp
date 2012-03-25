(function ($) {
  function Timepicker() {
    var timepickerDiv, datepicker, input;

    this.updateTime = function updateTime() {
      var date = input.val();
      var hour = this.hourpicker.val();
      var minute = this.minutepicker.val();
      var meridiem = this.meridiempicker.val();
      input.val(date + " " + hour + ":" + minute + " " + meridiem)
    };

    this.updateValue = function updateValue() {
      var id = "#" + this.datepicker.id;
      $.datepicker._selectDate(id);
    };

    this.format = function format(value) {
      var stringValue = value.toString();
      if (stringValue.length < 2)
        stringValue = "0" + stringValue;
      return stringValue;
    };

    this.setupMinutepicker = function setupMinutepicker() {
      this.minutepicker = $("<select class='ui-minutepicker' />");
      for(var i = 0; i <= 59; i += 5) {
        this.minutepicker.append("<option value ='"+ this.format(i) +"'>"+ this.format(i) +"</option>");
      }
      return this.minutepicker;
    };

    this.setupHourpicker = function setupDatepicker() {
      this.hourpicker = $("<select class='ui-hourpicker' />");
      for(var i = 1; i <= 12; i += 1) {
        this.hourpicker.append("<option value ='"+ this.format(i) +"'>"+ this.format(i) +"</option>");
      }
      return this.hourpicker;
    };

    this.setupMeridiempicker = function setupMeridiempicker() {
      this.meridiempicker = $("<select class='ui-meridiempicker' />");
      this.meridiempicker.append("<option value='am'>am</option><option value='pm'>pm</option>");

      return this.meridiempicker;
    };

    this.setupTimepicker = function setupTimepicker(datepickerInst) {
      this.setupHourpicker();
      this.setupMinutepicker();
      this.setupMeridiempicker();
      timepickerDiv = $("<div class='ui-timepicker' />");
      this.datepicker = datepickerInst;
      input = this.datepicker.input;

      timepickerDiv.append(this.hourpicker)
        .append(this.minutepicker)
        .append(this.meridiempicker);

      return this;
    };

    this.setupCallbacks = function setupCallbacks() {
      var self = this;
      this.meridiempicker.on('change', function() {self.updateValue()});
      this.hourpicker.on('change', function() {self.updateValue()});
      this.minutepicker.on('change', function() {self.updateValue()});
    };

    this.getDiv = function getDiv() {
      return timepickerDiv;
    };
  }

  var addTimepicker = function addTimepicker(inst) {
    var datepickerDiv = inst.dpDiv;

    if (! inst.timepicker) {
      var timepicker = new Timepicker();
      timepicker.setupTimepicker(inst);
      inst.timepicker = timepicker;
    }
    inst.timepicker.setupCallbacks();
    datepickerDiv.append(inst.timepicker.getDiv());
    return inst.timepicker;
  };

  $.datepicker._originalUpdate = $.datepicker._updateDatepicker;
  $.datepicker._originalSelectDate = $.datepicker._selectDate;

  $.datepicker._updateDatepicker = function myUpdateDatepicker(inst) {
    this._originalUpdate(inst);
    if ($.datepicker._get(inst, 'useTimepicker'))
      addTimepicker(inst);

    return this;
  };

  $.datepicker._selectDate = function mySelectDate(id, dateStr) {
    var inst = this._getInst($(id)[0]);
    inst.inline = true;
    this._originalSelectDate(id, dateStr);
    inst.inline = false;
    if ($.datepicker._get(inst, 'useTimepicker')) {
      inst.timepicker.updateTime();
    }
    return this;
  };

  $.fn.datetimepicker = function datetimepicker() {
    this.datepicker({
      useTimepicker: true
    })
    return this;
  };
})(jQuery)
