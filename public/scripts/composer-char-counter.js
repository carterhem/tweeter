

$(document).ready(function() {
  console.log("DOM is ready to be manipulated")
  $("#tweet-text").on("input", function() {
    console.log("input");
    const length = $(this).val().length;
    $(".counter").val(5 - length);
    // if ($(".counter").val() < 0) {
    //   $(".counter").css("color", "red");
    // } else {
    //   $(".counter").css("color", "yellow")
    // }
    if ($(".counter").val() < 0) {
      $(".counter").removeClass( "counterBlack" );
      $(".counter").addClass( "counterRed" );
    } 
    else if($(".counter").val() > 0) {
      $(".counter").removeClass( "counterRed" );
    //   $(".counter").addClass( "counterYellow" );
    }
  })
});
//second child of second child of parent of parent



// $("#tweet-text").on("click", function() {
//   console.log("click")
// })