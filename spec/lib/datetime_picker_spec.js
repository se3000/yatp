describe("datetimepicker.js", function () {
  var $input;

  beforeEach(function () {
    var test_dom = "<div><input class='datetimepicker'></input></div>";
    content(test_dom);
    $input = $(".datetimepicker").datetimepicker();
    $input.focus();
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
    });

    describe("changing the value in the input", function () {
      describe("when the value has already been set", function () {
        beforeEach(function () {
          $("select.ui-meridiempicker").change();
          $input.value = "03/25/2012 10:40 am"
        });

        it("sets the same value in the minutepicker", function () {
          expect($("select.ui-minutepicker").val()).toEqual("40");
        });
      });
    });
  });

  describe("#parseTime", function () {
    it("parses the time and date into 2 seperate strings", function () {
      times = parseDateTime("04/03/2012 01:00 am");
      expect(times[0]).toEqual("04/03/2012");
      expect(times[1]).toEqual("01:00 am");
    });

    it("doesn't blow up if there it can't parse the string", function () {
      times = parseDateTime("ABCDEFGHI");
    });
  });
});
