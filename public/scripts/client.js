$(document).ready(function() {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function(tweet) {
    const imgSrc = tweet.user.avatars;
    const name = tweet.user.name;
    const id = tweet.user.handle;
    const content = tweet.content.text;
    let current = Date.now() - tweet.created_at;
    const timeScales = [["seconds", 1000], ["minutes", 60], ["hours", 60], ["days", 24], ["years", 365]];
    let time = 0;
    let timeStr = "0 seconds";
    for (const timeScale of timeScales) {
      current = current/(timeScale[1]);
      time = Math.floor(current);
      if (time === 0) break; 
      else {
        timeStr = time + " " + timeScale[0];
      }
    }
  
    let $tweet = $(`<article class="tweet">
      <header>
        <div>
          <img id="tweet-profile" src="${escape(imgSrc)}">
            <p id="tweet-name">${escape(name)}</p>
          </div>
        <p id="tweet-id">${escape(id)}</p>
      </header>
      <div id="tweet-content">
        <p>${escape(content)}</p>
      </div>
      <footer>
        <p id="tweet-time">${escape(timeStr)} ago</p>
        <div class="feature-btn">
          <img src="/images/flag.png" >
          <img src="/images/retweet.png">
          <img src="/images/like.png" >
        </div>
      </footer>
      </article>`);
    return $tweet;
  }

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
      for (const tweetData of tweets) {
        const $tweet = createTweetElement(tweetData);
        // Test / driver code (temporary)
        // console.log($tweet); // to see what it looks like
        $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
      }
    }

  const loadtweets = function() {
    var get_url = "/tweets/";
    $.get( get_url, function( response ) {
      renderTweets(response.reverse());
    });
  }

  loadtweets();

  $("button#compost").click(function(){
    const $section = $("section.new-tweet");
    $section.toggle(250);
    $section.find("textarea").focus();
  });

  $(window).scroll(function(){
    const button = $("button#back-to-top");
    if($("html").scrollTop() > 400) {
      button.css("display", "block");
    } else {
      button.css("display", "none");
    }
  });

  $("button#back-to-top").click(function(){
    const $section = $("section.new-tweet");
    if ($section.css("display") === "none") {
      $section.toggle(250);
      $section.find("textarea").focus();
    }
    $("html").scrollTop(400);
  });

  $("#new-tweet-form").submit(function(event){
    event.preventDefault(); //prevent default action 
    let post_url = $(this).attr("action");
    let form_data = $(this).serialize();
    if (form_data.length > 145) {
      $("div#empty p").hide();
      $("div#too-long p").show(250);
    } else if (form_data.length <= 5) {
      $("div#too-long p").hide();
      $("div#empty p").show(250);
    } else {
      $("div#empty p").hide();
      $("div#too-long p").hide();
      $.post( post_url, form_data, function() {
        $(".tweet").replaceWith(loadtweets());
      });
    }
  });
});

$(document).ready();

