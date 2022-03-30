/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(() => {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function (tweetData) {
    return $(`
      <article>
        <header>
          <div>
            <img src="${tweetData.user.avatars}">
            <div>${escape(tweetData.user.name)}</div>
          </div>
          <div>${escape(tweetData.user.handle)}</div>
        </header>
        <div>
          ${escape(tweetData.content.text)}
        </div>
        <hr>
        <footer>
          <span>${timeago.format(tweetData.created_at)}</span>
          <div>
            <i class="fa-solid fa-flag fa-xs"></i>
            <i class="fa-solid fa-retweet fa-sm"></i>
            <i class="fa-solid fa-heart fa-xs"></i>
          </div>
        </footer>
      </article>`
    );
  }

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $('.tweets-container').prepend(createTweetElement(tweet));
    }
  }

  const loadTweets = function () {
    $.get("http://localhost:8080/tweets")
      .then(data => renderTweets(data));
  }

  loadTweets();

  $("form").on("submit", function (event) {
    event.preventDefault();
    let text = $(this).children("textarea").val();
    if (!text) {
      $("main").prepend($(`
        <section class="error-container">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>Tweet cannot be empty.</span>
          <i class="fa-solid fa-triangle-exclamation"></i>
        </section>`
      ));
      return;
    }

    if (text.length > 140) {
      $("main").prepend($(`
        <section class="error-container">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>Tweet must be 140 characters or less.</span>
          <i class="fa-solid fa-triangle-exclamation"></i>
        </section>`
      ));
      return;
    }

    if ($(".error-container").length !== 0) {
      $(".error-container").remove();
    }    

    // $.post("/tweets/", $(this).serialize(), () => {
    //   $(this).children("textarea").val("");
    //   $.get("http://localhost:8080/tweets", function (data) {
    //     $('.tweets-container').prepend(createTweetElement(data.pop()));
    //   });
    // });

    $.post("/tweets/", $(this).serialize(), () => {
      $(this).children("textarea").val("");
      $.get("http://localhost:8080/tweets").then((data) => {
        $('.tweets-container').prepend(createTweetElement(data.pop()));
      });
    });

    // $.post("/tweets/", $(this).serialize())
    //   .then(() => $(this).children("textarea").val(""))
    //   .then($.get("http://localhost:8080/tweets", function (data) {
    //     $('.tweets-container').prepend(createTweetElement(data.pop()));
    // }));

  })

});