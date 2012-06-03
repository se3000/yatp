describe("datetimepicker.js", function () {
  var $input, inst, timepicker;

  describe("defaults", function () {
    beforeEach(function () {
      var test_dom = "<div><input class='datetimepicker'></input></div>";
      content(test_dom);
      $input = $(".datetimepicker").datetimepicker();
      $input.focus();
      inst = $.datepicker._getInst($input[0]);
      timepicker = inst.timepicker;
    });

    describe("jQuery.fn.datetimepicker", function datepicker() {
      it("is a function", function () {
        expect($.fn.datetimepicker).not.toEqual(undefined);
      });

      it("opens a standard datepicker div", function () {
        expect($(".ui-datepicker").length).toEqual(1);
      });

      it("adds a timepicker div", function () {
        expect($(".ui-timepicker").length).toEqual(1);
      })

      it("does not close the datepicker when a select changes and focus on input", function () {
        expect($(".ui-datepicker:visible").length).toEqual(1);
        var $select = $("select.ui-minutepicker");
        $select.change();
        $input.focus();
        $(".ui-datepicker td:contains(10)").click()
        expect($(".ui-datepicker:visible").length).toEqual(1);
      })

      describe("select.hourpicker", function () {
        var $select;
        beforeEach(function () {
          $select = $("select.ui-hourpicker");
        });

        it("adds a dropdown for hours", function () {
          expect($("select.ui-hourpicker").length).toEqual(1);
        });

        it("formats the hours to fit hh format", function () {
          expect($("select.ui-hourpicker option").eq(0).text()).toEqual("01");
          expect($("select.ui-hourpicker option").eq(8).text()).toEqual("09");
        });

        it("adds an option for every hour, 12 hour style", function () {
          expect($("select.ui-hourpicker option").length).toEqual(12);
        });

        it("changes the value in the datepicker's input when it is changed", function () {
          expect($input.val()).not.toMatch(new RegExp($select.val()));
          $select.change();
          expect($input.val()).toMatch(new RegExp($select.val()));
        });

        it("does not change the date value", function () {
          $select.change();
          var originalValue = $input.val();
          $(".ui-datepicker-next").click();
          $select.change();
          expect($input.val()).toEqual(originalValue);
        });

        it("uses the current date when when no date has been selected", function () {
          var dateRegExp = new RegExp($.datepicker._formatDate(inst));

          expect($input.val()).not.toMatch(dateRegExp);
          $select.change();
          expect($input.val()).toMatch(dateRegExp);
        });
      });

      describe("select.minutepicker", function () {
        var $select;
        beforeEach(function () {
          $select = $("select.ui-minutepicker");
        });

        it("adds a dropdown for minutes", function () {
          expect($("select.ui-minutepicker").length).toEqual(1);
        });

        it("adds an option for each 5 minute interval", function () {
          expect($("select.ui-minutepicker option").length).toEqual(12);
        });

        it("formats the minutes to fit mm format", function () {
          expect($("select.ui-minutepicker option").eq(0).text()).toEqual("00");
          expect($("select.ui-minutepicker option").eq(1).text()).toEqual("05");
        });

        it("changes the value in the datepicker's input when it is changed", function () {
          expect($input.val()).not.toMatch(new RegExp($select.val()));
          $select.change();
          expect($input.val()).toMatch(new RegExp($select.val()));
        });

        it("uses the current date when when no date has been selected", function () {
          var dateRegExp = new RegExp($.datepicker._formatDate(inst));

          expect($input.val()).not.toMatch(dateRegExp);
          $select.change();
          expect($input.val()).toMatch(dateRegExp);
        });
      });

      describe("select.meridiempicker", function () {
        var $select;
        beforeEach(function () {
          $select = $("select.ui-meridiempicker");
        });

        it("adds a dropdown for am/pm", function () {
          expect($select.length).toEqual(1);
        });

        it("adds an option for AM or PM", function () {
          expect($select.find("option").length).toEqual(2);
        });

        it("changes the value in the datepicker's input when it is changed", function () {
          expect($input.val()).not.toMatch(new RegExp($select.val()));
          $select.change();
          expect($input.val()).toMatch(new RegExp($select.val()));
        });

        it("uses the current date when when no date has been selected", function () {
          var dateRegExp = new RegExp($.datepicker._formatDate(inst));

          expect($input.val()).not.toMatch(dateRegExp);
          $select.change();
          expect($input.val()).toMatch(dateRegExp);
        });
      });

      describe("changing the value in the input", function () {
        beforeEach(function () {
          $input.val("03/25/2012 10:40 pm").change();
        });

        it("sets the same value in the hourpicker", function () {
          expect($("select.ui-hourpicker").val()).toEqual("10");
        });

        it("sets the same value in the minutepicker", function () {
          expect($("select.ui-minutepicker").val()).toEqual("40");
        });

        it("sets the same value in the meridiempicker", function () {
          expect($("select.ui-meridiempicker").val()).toEqual("pm");
        });

        it("allows you to type chars: ' apmAPM'", function () {
          var possibleChars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'))
          expect(possibleChars).toContain(' ')
          expect(possibleChars).toContain('a')
          expect(possibleChars).toContain('p')
          expect(possibleChars).toContain('m')
          expect(possibleChars).toContain('A')
          expect(possibleChars).toContain('P')
          expect(possibleChars).toContain('M')
        });
      });
    });

    describe("#parseTime", function () {
      it("parses the time and date into 2 seperate strings", function () {
        times = timepicker.parseDateTime("04/03/2012 01:00 am");
        expect(times[0]).toEqual("04/03/2012");
        expect(times[1]).toEqual("01:00 am");
        expect(times[2]).toEqual("01");
        expect(times[3]).toEqual("00");
        expect(times[4]).toEqual("am");
      });

      it("doesn't blow up if there it can't parse the string", function () {
        times = timepicker.parseDateTime("ABCDEFGHI");
      });
    });
  });

  describe("with minute configuration", function () {
    var minuteSpacing = 7;

    beforeEach(function () {
      var test_dom = "<div><input class='datetimepicker'></input></div>";
      content(test_dom);
      $input = $(".datetimepicker").datetimepicker({minuteSpacing: minuteSpacing});
      $input.focus();
      inst = $.datepicker._getInst($input[0]);
      timepicker = inst.timepicker;
    });

    describe("select.minutepicker", function () {
      var $select;
      beforeEach(function () {
        $select = $("select.ui-minutepicker");
      });

      it("adds a dropdown for minutes", function () {
        expect($("select.ui-minutepicker").length).toEqual(1);
      });

      it("adds an option for minutes spaced as specified", function () {
        var count = Math.floor(59/minuteSpacing) + 1;
        expect($("select.ui-minutepicker option").length).toEqual(count);
      });

      it("formats the minutes to fit mm format", function () {
        expect($("select.ui-minutepicker option").eq(0).text()).toEqual("00");
        expect($("select.ui-minutepicker option").eq(1).text()).toEqual(timepicker.format(minuteSpacing));
        expect($("select.ui-minutepicker option").eq(2).text()).toEqual(timepicker.format(2*minuteSpacing));
      });
    });
  });

  describe("with useMeridiem", function () {
    beforeEach(function () {
      var test_dom = "<div><input class='datetimepicker'></input></div>";
      content(test_dom);
      $input = $(".datetimepicker").datetimepicker({useMeridiem: false});
      $input.focus();
      inst = $.datepicker._getInst($input[0]);
      timepicker = inst.timepicker;
    });

    it("does not add a dropdown for am/pm", function () {
      expect($("select.ui-meridiempicker").length).toEqual(0);
    });

    it("adds a dropdown for hours", function () {
      expect($("select.ui-hourpicker").length).toEqual(1);
    });

    it("formats the hours to fit hh format", function () {
      expect($("select.ui-hourpicker option").eq(0).text()).toEqual("01");
      expect($("select.ui-hourpicker option").eq(18).text()).toEqual("19");
    });

    it("adds an option for every hour, 24 hour style", function () {
      expect($("select.ui-hourpicker option").length).toEqual(24);
    });
  });
});
