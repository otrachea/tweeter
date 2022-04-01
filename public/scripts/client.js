/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(() => {

  // Transforms any scripting attack to normal text
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Creates tweet element from tweetData
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
  };

  // Adds array of tweets to tweets-container with newest tweet at top
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $('.tweets-container').prepend(createTweetElement(tweet));
    }
  };

  // Uses ajax get request to get all tweets from server then renders them
  const loadTweets = function () {
    $.get("http://localhost:8080/tweets")
      .then(data => renderTweets(data));
  };

  loadTweets();

  // When "Tweet" button is clicked
  $("form").on("submit", function (event) {
    // Prevents page from refreshing when submit button clicked
    event.preventDefault();

    let text = $(this).children("textarea");

    // Error for empty tweet
    if (!text.val()) {
      $(".error-container span").text("Tweet cannot be empty");
      $(".error-container").slideDown();
      return;
    }

    // Error for tweet over 140 chars
    if (text.val().length > 140) {
      $(".error-container span").text("Tweet must be 140 characters or less");
      $(".error-container").slideDown();
      return;
    }

    // If tweet is valid, slides up error container if it was displayed before
    if ($(".error-container").css("display") !== "none") {
      $(".error-container").slideUp();
    }

    // Sends tweet to server using ajax post request
    $.post("/tweets/", $(this).serialize(), () => {
      // Clears textarea
      $(this).children("textarea").val("");

      // After tweet saved to server, get all tweets from server again
      $.get("http://localhost:8080/tweets", function (data) {
        // Gets latest tweet from server, prepends to container and slides down
        let newTweet = createTweetElement(data.pop());
        newTweet.css("display", "none");
        $('.tweets-container').prepend(newTweet);
        newTweet.slideDown();
      });
    });
  });

  // When compose tweet button is clicked, slides new tweet container up or down
  $("nav > div > button").on("click", function () {
    let section = $(".new-tweet");
    if (section.css("display") === "none") {
      section.slideDown();
      // Sets focus to textarea after sliding down
      $("#tweet-text").focus();
    } else {
      section.slideUp();
    }
  });

  // When clicking scroll up button, smooth scrolls to top of window
  $("main > button").on("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Adds fade in animation class to css
  const fadeIn = function (element) {
    element.addClass("fade-in");
    element.removeClass("fade-out");
  };

  // Adds fade out animation class to css
  const fadeOut = function (element) {
    element.addClass("fade-out");
    element.removeClass("fade-in");
  };

  // Makes navbar + items disappear at certain height when user scrolls down
  $(document).on("scroll", function () {
    // navCheck is true when site is in desktop mode
    // navCheck is false when site is in tablet/mobile mode
    let navCheck = (window.innerWidth >= 1024) ? "nav > div" : "nav";

    // 120px is height of navbar
    if (window.scrollY >= 120) {
      fadeIn($("main > button"));
      fadeOut($(navCheck));
    } else {
      fadeOut($("main > button"));
      fadeIn($(navCheck));
    }
  });

  // Makes textarea in compose tweet area change height dynamically
  $("#tweet-text").on("input", function () {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + 'px';
  });
});