/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {

  const createTweetElement = function (tweetData) {
    return $(`
      <article>
        <header>
          <div>
            <img src="${tweetData.user.avatars}">
            <div>${tweetData.user.name}</div>
          </div>
          <div>${tweetData.user.handle}</div>
        </header>
        <div>
          ${tweetData.content.text}
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
    for (let i = tweets.length - 1; i >= 0; i--) {
      $('.tweets-container').append(createTweetElement(tweets[i]));
    }
  }

  const loadTweets = function () {
    $.get("http://localhost:8080/tweets", function (data) {
      renderTweets(data);
    });
  }

  loadTweets();

  $("form").on("submit", function (event) {
    event.preventDefault();
    let text = $(this).children("textarea").val();
    if (!text) {
      alert("Tweet cannot be empty");
      return;
    }

    if (text.length > 140) {
      alert("Tweet must be 140 characters or less");
      return;
    }

    $.post("/tweets/", $(this).serialize());

  })

});