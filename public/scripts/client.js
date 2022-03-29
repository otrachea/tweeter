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
          <span>${Math.floor(((new Date()).getTime() - tweetData.created_at) / (1000 * 3600 * 24))} days ago</span>
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
      $('.tweets-container').append(createTweetElement(tweet));
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
    $.post("/tweets/", $(this).serialize());
  })

});