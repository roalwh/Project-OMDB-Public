import $ from "jquery";

$(function () {
  /*gnb 오픈*/
  $("#gnb > .gnb_depth1 > li").on("mouseenter focusin", function () {
    $(".header_inner").addClass("on");
    $(".gnb_depth2").clearQueue().slideDown();
    $("#gnb > .gnb_bg").clearQueue().slideDown();
  });
  $("#gnb .gnb_bg").on("mouseenter", function () {
    $(".header_inner").addClass("on");
    $(".gnb_depth2").show();
    $("#gnb > .gnb_bg").show();
  });
  $("#gnb .gnb_depth1 > li .gnb_depth2").on("mouseenter", function () {
    $(".header_inner").addClass("on");
    $(".gnb_depth2").show();
    $("#gnb > .gnb_bg").show();
  });
  $("#gnb .gnb_bg").on("mouseleave", function () {
    $(".header_inner").removeClass("on");
    $(".gnb_depth2").hide();
    $("#gnb > .gnb_bg").hide();
  });
  $("#gnb > .gnb_depth1").on("mouseleave", function () {
    $(".header_inner").removeClass("on");
    $(".gnb_depth2").clearQueue().hide();
    $("#gnb > .gnb_bg").clearQueue().hide();
  });
  /*//gnb 오픈*/
});
