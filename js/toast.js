(function () {
  document.querySelectorAll("[data-lb-toast]").forEach(function (toast) {
    toast.classList.remove("is-open");
    var closeBtn = toast.querySelector("[data-lb-toast-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        toast.classList.remove("is-open");
      });
    }
    setTimeout(function () { toast.classList.add("is-open"); }, 4000);
  });

  window.lbOpenToast = function (id) {
    var toast = document.getElementById(id);
    if (toast) toast.classList.add("is-open");
  };
})();
