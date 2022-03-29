const clear = function(selector) {
  $(selector).val("");
}

$(document).ready(() => {

  clear("#tweet-text")

  $("#tweet-text").on("input", function () {
    const counter = $(this)
      .siblings("div")
      .children("output");

    // sets counter text
    counter.text(140 - $(this).val().length);

    // if over 140 characters, counter is now red
    if ($(this).val().length > 140 ) {
      counter.css("color", "#ff0000");
    } else {
      counter.css("color", "");
    }
  })
});