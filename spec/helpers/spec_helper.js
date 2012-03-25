$ = jQuery;

$(document).ready(function () {
  $(".datepicker").datepicker();
  $(".datetimepicker").datetimepicker();
  $(".trial").datetimepicker();
});

window.content = function content(html) {
  return $('div#jasmine_content').html(html).contents();
}

beforeEach(function () {
  $(".datepicker, .datetimepicker").val('').blur().datepicker('hide');
});

afterEach(function () {
  $(".datepicker, .datetimepicker").val('').blur().datepicker('hide');
  $("#jasmine_content").empty();
});
