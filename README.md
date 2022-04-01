# Tweeter Project

Tweeter is a simple, single-page AJAX-base Twitter clone made using jQuery, HTML5, CSS3 and SASS. This project was mainly used to practice fundamental front-end skills and to learn AJAX.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance

## Installation
After cloning the repo, please install all dependencies. Run the server using `npm start local` and then go to `localhost:8080/` to view the site.

## Final Product

!["Screenshot of the desktop site"](https://github.com/otrachea/tweeter/blob/master/docs/desktop-mode.png)
!["Screenshot of the tablet/mobile site"](https://github.com/otrachea/tweeter/blob/master/docs/tablet-mobile-mode.png)

## Compose a new tweet
To use the site, click on the "Write a new tweet" button in the top right corner and a container will appear at the top of the tweet feed. The cursor will automatically focus the area to type the tweet in. Tweets cannot be empty and be 140 characters or less. A counter in the bottom right corner of the new tweet area shows long how the tweet currently is. Once satisfied with the tweet, can press the tweet button and it will be added to the feed of tweets.

When scrolling far enough down the compose tweet button will disappear and a red button in the bottom right corner will appear. This button takes the user back to the top of the page.

## Extra features
- The height of the text area in new tweet area dynamically changes depending on the amount of text there is.
- A bouncing animatino of the arrow in the compose new tweet button in the navbar.
- When the new tweet box is currently hidden, and the user clicks the compose new tweet button then it is shown, the textarea inside it is auto-focused.
- When the new tweet box is currently shown, and the user clicks the compose new tweet button, the new tweet box will become hidden.
- When the user scrolls down far enough a button appears that scrolls user back to top and the compose new tweet button disappears.
- In mobile mode, the navbar is transparent and when scrolling down the logo and compose new tweet button disappear. They reappear upon scrolling back to the top of the page.

## Known Issues
There is no functionality for users to login. The three icons at the button of the have no functionality. Upon refreshing the server, all tweets will be lost (except for the two hard-coded ones).

## Todo
- Dark mode button
- New colour scheme
