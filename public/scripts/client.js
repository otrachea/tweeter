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
    let text = $(this).children("textarea");

    if (!text.val()) {
      $(".error-container span").text("Tweet cannot be empty");
      $(".error-container").slideDown();
      return;
    }

    if (text.val().length > 140) {
      $(".error-container span").text("Tweet msut be 140 characters or less");
      $(".error-container").slideDown();
      return;
    }

    if ($(".error-container").css("display") !== "none") {
      $(".error-container").slideUp();
    }    

    $.post("/tweets/", $(this).serialize())
      .then(() => $(this).children("textarea").val(""))
      .then($.get("http://localhost:8080/tweets").then(data => {
        $('.tweets-container').prepend(createTweetElement(data.pop()));
    }));

  })

  const showNewTweet = function() {
    let section = $(".new-tweet");
    if (section.css("display") === "none") {
      section.slideDown();
      $("#tweet-text").focus();
    } else {
      section.slideUp();
    }
  }

  $("nav > div > button").on("click", showNewTweet);
});