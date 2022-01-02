// alert("HEY!")
$(document).ready(function () {
  mobileOptimization();
  $('.btn').attr('disabled', true);
  $('#createUserName').keyup(function () {
    if ($(this).val().length != 0) {
      $('.btn').attr('disabled', false);

      $(".loginArea-form .btn").click(function () {
        $(".loginArea").addClass("active");
      });
    } else {
      $('.btn').attr('disabled', true);
    }
  })
  $('#joinUserName').keyup(function () {
    if ($(this).val().length != 0) {
      $('.btn').attr('disabled', false);

      $(".loginArea-form .btn").click(function () {
        $(".loginArea").addClass("active");
      });
    } else {
      $('.btn').attr('disabled', true);
    }
  })
});
$(".info-item .btn").click(function () {
  $(".loginArea").toggleClass("log-in");
});

$(window).resize(function () {
  mobileOptimization();
});


function mobileOptimization() {
  if ($(window).width() < 500) {
    // console.log($(window).width())
    $(".loginArea .loginArea-forms .loginArea-info .info-item .btn").addClass("rotate");
    $(".loginArea .loginArea-forms .loginArea-info .info-item .btnJoin").html("Join Room");
    $(".loginArea .loginArea-forms .loginArea-info .info-item .btnCreate").html("Create Room");
    $(".heading").hide();
    $(".loginArea .loginArea-forms .loginArea-info .info-item .btnCreate").hide();
  } else {
    $(".loginArea .loginArea-forms .loginArea-info .info-item .btn").removeClass("rotate");
    $(".loginArea .loginArea-forms .loginArea-info .info-item .btnJoin").html("Join it!");
    $(".loginArea .loginArea-forms .loginArea-info .info-item .btnCreate").html("Create it!");
    $(".heading").show();
  }
}

$(".loginArea .loginArea-forms .loginArea-info .info-item .btnCreate").click(function(){
  $(".loginArea .loginArea-forms .loginArea-info .info-item .btnCreate").hide(200);
  $(".loginArea .loginArea-forms .loginArea-info .info-item .btnJoin").show(200);
})

$(".loginArea .loginArea-forms .loginArea-info .info-item .btnJoin").click(function(){
  $(".loginArea .loginArea-forms .loginArea-info .info-item .btnJoin").hide(200);
  $(".loginArea .loginArea-forms .loginArea-info .info-item .btnCreate").show(200);
})