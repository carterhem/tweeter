/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    const length = $(this).val().length;
    //grab the length of the value of the input
    $(".counter").val(140 - length);

  
    if ($(".counter").val() < 0) {
    //if we are under zero in character counter - change counter to red
      $(".counter").removeClass("counterBlack");
      $(".counter").addClass("counterRed");
    } else if ($(".counter").val() > 0) {
      //if we remove characters to get under 140, remove red class (numbers go back to black)
      $(".counter").removeClass("counterRed");
    }
  });

  const renderTweets = function(tweets) {
    //loops through tweets
    for (const tweet of tweets) {
      //calls createTweetElement for each tweet
      $(".tweetContainer").prepend(createTweetElement(tweet));
      //takes return value and prepends it to each tweet container
    }
  };

  const createTweetElement = function(tweet) {
    const clean = function(string) {
      //creating function to nullify script in textarea
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(string));
      return div.innerHTML;
    };
    const $tweet = `
    <article class="tweet">
          <header class="tweetHeader">
            <div class="tweetPoster">
            <img src="${tweet.user.avatars}" />
              <p>${tweet.user.name}</p>
            </div>
            <address>${tweet.user.handle}</address>
          </header>
          <div class="textInTweet">
            <h5>
            ${clean(tweet.content.text)}
            </h5>
          </div>
          <footer class="tweetFooter">
            <p> ${timeago.format(tweet.created_at)}</p>
            <div class="icons">
              <a
                ><i class="fas fa-flag"></i><i class="fas fa-retweet"></i
                ><i class="fas fa-heart"></i
              ></a>
            </div>
          </footer>
        </article>
    `;

    return $tweet;
  };

  $("#tweetForm").submit(function(event) {
    event.preventDefault();
    //stopping the default call

    const x = $("#tweet-text").val();
    const y = x.length;
    //creating variables for error validation

    if (x === null || x === "") {
      //if input is null or empty string - throw a relevant error
      $(".errorBox").slideDown();
      $(".errorMessage").text("Error: no data was submitted!");
      setTimeout(() => {
        //adding settimout so error message eventually leaves
        $(".errorBox").slideUp();
      }, 4000);
      return false;
    }

    if (y > 140) {
         //if input is over 140
      $(".errorBox").slideDown();
      $(".errorMessage").text(
        "Error: there is a maximum limit of 140 characters!"
      );
      setTimeout(() => {
        //adding settimout so error message eventually leaves
        $(".errorBox").slideUp();
      }, 4000);
      return false;
    }

    const tweetFormData = $(this).serialize();
    //serializing form input
    $.post("/tweets", tweetFormData).then((response) => {
      loadTweets();
       //calling loadtweets
      $("#tweetForm").trigger("reset");
      //resetting the form so input clears
    });
  });

  const loadTweets = function(tweets) {
    $.get("/tweets").then((response) => {
      //sending to rendertweets
      renderTweets(response);
    });
  };
  loadTweets();
  //calling loadtweets
});
