(function () {
  function initCoverflow(root) {
    var track = root.querySelector(".lb-slider-coverflow__track");
    if (!track) return;

    var STEP_MS = 1500;

    function slides() {
      return Array.prototype.slice.call(track.querySelectorAll(".lb-slider-coverflow__slide"));
    }

    function paint(centerIndex) {
      slides().forEach(function (el, i) {
        var dist = Math.abs(i - centerIndex);
        el.classList.toggle("is-center", dist === 0);
        el.classList.toggle("is-near", dist === 1);
      });
    }

    function setCenter(index, withTransition, durationMs) {
      var list = slides();
      if (list.length < 5) return;
      paint(index);
      var left = list[index - 2] || list[0];
      var apply = function () {
        if (withTransition === false) {
          track.style.transition = "none";
        } else {
          track.style.transition = "transform " + (durationMs || STEP_MS) + "ms cubic-bezier(0.22, 0.61, 0.36, 1)";
        }
        track.style.transform = "translate3d(" + -left.offsetLeft + "px,0,0)";
      };
      if (withTransition === false) {
        apply();
        void track.offsetHeight;
      } else {
        requestAnimationFrame(function () { requestAnimationFrame(apply); });
      }
    }

    function tick() {
      setCenter(3, true, STEP_MS);
      setTimeout(function () {
        var list = slides();
        track.appendChild(list[0]);
        setCenter(2, false);
        tick();
      }, STEP_MS);
    }

    window.addEventListener("resize", function () { setCenter(2, false); });

    setCenter(2, false);
    setTimeout(tick, 200);
  }

  document.querySelectorAll(".lb-slider-coverflow").forEach(initCoverflow);
})();
