$(() => {

  // Clears textarea on refresh
  $("#tweet-text").val("");

  $("#tweet-text").on("input", function () {
    // Gets counter text element
    const counter = $(this)
      .siblings("div")
      .children("output");

    // Sets counter text
    counter.text(140 - $(this).val().length);

    // If over 140 characters, counter is now red
    if ($(this).val().length > 140) {
      counter.css("color", "#ff0000");
    } else {
      counter.css("color", "");
    }
  });
});