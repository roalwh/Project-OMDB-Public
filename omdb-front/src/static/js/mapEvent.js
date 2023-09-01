import $ from "jquery";
import "../../../node_modules/swiper/swiper-bundle";
$(window).on("load", function () {
  var mapArr = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "경기광역시",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
    "세종특별자치시",
  ];

  $(document).on("click", "#area .land", function () {
    var idx = $(this).index();
    $("#area .land").removeClass("on");
    $("#area .land").eq(idx).addClass("on");
    $("#pin .pinPoint").removeClass("on");
    $("#pin .pinPoint").eq(idx).addClass("on");
    $(".locName").text(mapArr[idx]);
    // console.log(mapArr[idx]);
  });

  $(document).on(
    {
      mouseenter: function () {
        $(this).addClass("active");
      },
      mouseleave: function () {
        $(this).removeClass("active");
      },
    },
    ".land"
  );

  // $(".land").hover(
  //   function () {
  //     $(this).addClass("active");
  //   },
  //   function () {
  //     $(this).removeClass("active");
  //   }
  // );

  // $("#area .land").click(function () {
  //   var idx = $(this).index();
  //   $("#area .land").removeClass("on");
  //   $("#area .land").eq(idx).addClass("on");
  //   $("#pin .pinPoint").removeClass("on");
  //   $("#pin .pinPoint").eq(idx).addClass("on");
  //   $(".locName").text(mapArr[idx]);
  //   console.log(mapArr[idx]);
  // });
});
