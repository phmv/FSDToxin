import "./transition-blocker.css";
export { transitionOn as on, transitionOnce as once, transitionBlock as block };
let transitionBlockedClass = "transition-blocked";

function transitionOn(target) {
  target.classList.remove(transitionBlockedClass);
}

function transitionBlock(target) {
  target.classList.add(transitionBlockedClass);
}

function transitionOnce(target) {
  target.classList.remove(transitionBlockedClass);
  target.addEventListener(whichTransitionEvent(), transitionEndHandler);

  for (let child of target.children) {
    child.addEventListener(whichTransitionEvent(), (e) => e.stopPropagation());
  }

  function transitionEndHandler() {
    target.classList.add(transitionBlockedClass);
    target.removeEventListener(whichTransitionEvent(), transitionEndHandler);
  }
}

function whichTransitionEvent() {
  var t;
  var el = document.createElement("fakeelement");
  var transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}
