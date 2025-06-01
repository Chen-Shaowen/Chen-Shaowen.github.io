// Page scroll
var navHeight = $(".header").outerHeight();

$('a[href^="#"]').on("click", function () {
  var href = $(this).attr("href");
  var target = $(href == "#" || href == "" ? "html" : href);
  var position = target.offset().top - navHeight;
  $("html, body").animate({ scrollTop: position, }, 300, "swing");
  return false;
});

// Page-top
$("#js-page-top").on("click", function () {
  $("body,html").animate({ scrollTop: 0, }, 300);
  return false;
});

// Copy to the clip board
function copyToClipboard(elementId) {
  const textToCopy = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(textToCopy).then(function () {
    alert('Copied to the clip board: ' + textToCopy);
  }).catch(function (err) {
    console.error('Failed copying to the clip board: ', err);
  });
}
