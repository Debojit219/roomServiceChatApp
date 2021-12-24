// alert("HEY!")
$(document).ready(function () {
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
