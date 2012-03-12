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

    describe("select.hourpicker", function () {
      var $select;
      beforeEach(function () {
        $select = $("select.ui-hourpicker");
      });

      it("adds a dropdown for hours", function () {
        expect($("select.ui-hourpicker").length).toEqual(1);
      });

      it("adds an option for every hour, 12 hour style", function () {
        expect($("select.ui-hourpicker option").length).toEqual(12);
      });

      it("changes the value in the datepicker's input when it is changed", function () {
        expect($input.val()).not.toMatch(new RegExp($select.val()));
        $select.change();
        expect($input.val()).toMatch(new RegExp($select.val()));
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

      it("adds an option for 5 minute intervals", function () {
        expect($("select.ui-minutepicker option").length).toEqual(12);
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
  });
});
