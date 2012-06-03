(function ($) {
  function Timepicker() {
    var timepickerDiv, datepicker, input, minuteSpacing;

    this.updateTime = function updateTime() {
      if (this.transactionFlag) return;
      var dateTime = this.parseDateTime(input.val());
      var date = dateTime[0] || this.getDate();
      var time = dateTime[1];

      date = date + " " + this.hourpicker.val();
      date = date + " " + this.minutepicker.val();
      if (useMeridiem) date = date + " " +this.meridiempicker.val();
      input.val(date);
    };

    this.getDate = function getDate() {
      return $.datepicker._formatDate(this.datepicker)
    };

    this.updateTimePicker = function updateTimePicker() {
      var dateTime = this.parseDateTime(input.val());

      this.transactionFlag = true;
        this.hourpicker.val(dateTime[2]);
        this.minutepicker.val(dateTime[3]);
        this.meridiempicker.val(dateTime[4]);
      this.transactionFlag = false;
    };

    this.parseDateTime = function parseDateTime(originalTime) {
      var parsed = [];
      var dateMatcher = new RegExp("(\\d\\d/\\d\\d/\\d\\d\\d\\d)");
      var timeMatcher = new RegExp("(\\d\\d):(\\d\\d) ?((?:a|p)m)", "i");
      var parsedDate = originalTime.match(dateMatcher);
      var parsedTime = originalTime.match(timeMatcher);

      if (parsedDate != null) parsed[0] = parsedDate[0];
      if (parsedTime != null) {
        parsed[1] = parsedTime[0];
        parsed[2] = parsedTime[1];
        parsed[3] = parsedTime[2];
        parsed[4] = parsedTime[3];
      }

      return parsed;
    };

    this.format = function format(value) {
      var stringValue = value.toString();
      if (stringValue.length < 2) stringValue = "0" + stringValue;
      return stringValue;
    };

    this.setupMinutepicker = function setupMinutepicker() {
      this.minutepicker = $("<select class='ui-minutepicker' />");
      for(var i = 0; i <= 59; i += minuteSpacing) {
        this.minutepicker.append("<option value ='"+ this.format(i) +"'>"+ this.format(i) +"</option>");
      }
      return this.minutepicker;
    };

    this.setupHourpicker = function setupDatepicker() {
      this.hourpicker = $("<select class='ui-hourpicker' />");
      if (useMeridiem) {
        var hourCount = 12;
      } else {
        var hourCount = 24;
      }
      for(var i = 1; i <= hourCount; i += 1) {
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
      minuteSpacing = $.datepicker._get(datepickerInst, 'minuteSpacing') || 5;
      useMeridiem = ($.datepicker._get(datepickerInst, 'useMeridiem') == undefined);
      this.setupHourpicker();
      this.setupMinutepicker();
      this.setupMeridiempicker();
      timepickerDiv = $("<div class='ui-timepicker' />");
      this.datepicker = datepickerInst;
      input = this.datepicker.input;

      timepickerDiv.append(this.hourpicker).append(this.minutepicker);
      if (useMeridiem) timepickerDiv.append(this.meridiempicker);

      return this;
    };

    this.setupCallbacks = function setupCallbacks() {
      var self = this;
      this.hourpicker.on('change', function() {self.updateTime()});
      this.minutepicker.on('change', function() {self.updateTime()});
      if (useMeridiem) this.meridiempicker.on('change', function() {self.updateTime()});
      input.on('change', function() {self.updateTimePicker()});
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
  $.datepicker._updateDatepicker = function myUpdateDatepicker(inst) {
    this._originalUpdate(inst);
    if ($.datepicker._get(inst, 'useTimepicker'))
      addTimepicker(inst);

    return this;
  };

  $.datepicker._originalSelectDate = $.datepicker._selectDate;
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

  $.datepicker._originalPossibleChars = $.datepicker._possibleChars;
  $.datepicker._possibleChars = function possibleChars(format) {
    var chars = $.datepicker._originalPossibleChars(format);
    chars = chars + ' apmAPM';

    return chars;
  };

  $.fn.datetimepicker = function datetimepicker(options) {
    if (!options) var options = {};
    this.datepicker({
      minuteSpacing: options.minuteSpacing,
      useMeridiem: options.useMeridiem,
      useTimepicker: true
    })
    return this;
  };
})(jQuery)
