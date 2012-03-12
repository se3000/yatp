(function ($) {
  function Timepicker() {
    var timepickerDiv, hourpicker, minutepicker, meridiempicker,
        datepicker, input;

    this.updateTime = function updateTime() {
      var date = input.val();
      var hour = hourpicker.val();
      var minute = minutepicker.val();
      var meridiem = meridiempicker.val();
      input.val(date + " " + hour + ":" + minute + " " + meridiem)
    };

   this.setupMinutepicker = function setupMinutepicker() {
      minutepicker = $("<select class='ui-minutepicker' />");
      for(var i = 0; i <= 59; i += 5) {
        minutepicker.append("<option value ='"+ i +"'>"+ i +"</option>");
      }
      return minutepicker;
    };

    this.setupHourpicker = function setupDatepicker() {
      hourpicker = $("<select class='ui-hourpicker' />");
      for(var i = 1; i <= 12; i += 1) {
        hourpicker.append("<option value ='"+ i +"'>"+ i +"</option>");
      }
      return hourpicker;
    };

    this.setupMeridiempicker = function setupMeridiempicker() {
      meridiempicker = $("<select class='ui-meridiempicker' />");
      meridiempicker.append("<option value='am'>am</option>");
      meridiempicker.append("<option value='pm'>pm</option>");

      return meridiempicker;
    };

    this.setupTimepicker = function setupTimepicker(datepickerInst) {
      timepickerDiv = $("<div class='ui-timepicker' />");
      datepicker = datepickerInst;
      input = datepicker.input;
      this.setupHourpicker();
      this.setupMinutepicker();
      this.setupMeridiempicker();

      timepickerDiv.append(hourpicker)
        .append(minutepicker)
        .append(meridiempicker);

      return this;
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
    datepickerDiv.append(inst.timepicker.getDiv());
    return inst.timepicker;
  }

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
    this._originalSelectDate(id, dateStr);
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
