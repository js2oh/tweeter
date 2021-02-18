$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() {
    const counter = $(this).next().find(".counter");
    counter.text(140-this.textLength);
    if (this.textLength > 140) {
      counter.css("color", "red");
    } else {
      counter.css("color", "rgb(54, 52, 52)");
    }
  });
});

$(document).ready();