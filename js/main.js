(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  var form = document.querySelector("#inquiry-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var lang = (document.documentElement.lang || "").toLowerCase();
      var isEn = lang.indexOf("en") === 0;
      var isHans = lang.indexOf("zh-hans") === 0;
      var lines = isEn ? [
        "Name: " + (data.get("name") || ""),
        "Phone: " + (data.get("phone") || ""),
        "Student year: " + (data.get("grade") || ""),
        "Service of interest: " + (data.get("service") || ""),
        "",
        data.get("message") || ""
      ] : isHans ? [
        "姓名：" + (data.get("name") || ""),
        "电话：" + (data.get("phone") || ""),
        "学生年级：" + (data.get("grade") || ""),
        "感兴趣的服务：" + (data.get("service") || ""),
        "",
        data.get("message") || ""
      ] : [
        "姓名：" + (data.get("name") || ""),
        "電話：" + (data.get("phone") || ""),
        "學生年級：" + (data.get("grade") || ""),
        "感興趣的服務：" + (data.get("service") || ""),
        "",
        data.get("message") || ""
      ];
      var subject = isEn ? "Lead Education course enquiry" : isHans ? "立扬教育课程查询" : "立揚教育課程查詢";
      var href = "mailto:inquiry@lead-education.org?subject=" +
        encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      window.location.href = href;
    });
  }
})();
