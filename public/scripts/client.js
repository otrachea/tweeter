/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {

  const createTweetElement = function (tweetData) {
    return $(`
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
        <span>${tweetData.created_at}</span>
        <div>
          <i class="fa-solid fa-flag fa-xs"></i>
          <i class="fa-solid fa-retweet fa-sm"></i>
          <i class="fa-solid fa-heart fa-xs"></i>
        </div>
      </footer>`);
  }

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  const $tweet = createTweetElement(tweetData)
  $('.tweets-container').append($tweet);

});