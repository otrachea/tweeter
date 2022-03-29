$(document).ready(() => {
  $(".counter").text(140 - $("#tweet-text").val().length);

  $("#tweet-text").on("input", function() {
    $(this)
    .siblings("div")
    .children("output")
    .text(140 - $(this).val().length);
  })
});