describe("datepicker", function () {
  var $input;

  beforeEach(function () {
    var test_dom = "<div><input class='datepicker'></input></div>";
    content(test_dom);
    $input = $(".datepicker").datepicker();
  });

  describe("jQuery.fn.datepicker", function datepicker() {
    it("opens a datepicker on the focus of any input with the 'datepicker' class", function () {
      //this is actually behavior from the spec helper
      //  but is an assumption that many other tests are built on
      $input.focus();
      expect($(".ui-datepicker-calendar").length).toEqual(1);
    });

    it("does not add a timepicker div", function () {
      expect($(".ui-timepicker").length).toEqual(0);
    })
  });
});
