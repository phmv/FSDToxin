import IMask from "imask";
import "./text-field.scss";

var $dropdownField = $(".text-field--dropdown");
$dropdownField.parent().on("toggleActive", function () {
  $(this).children().toggleClass("text-field--focused text-field--no-radius");
});

var elements = document.getElementsByClassName("birthday-mask");
Array.prototype.forEach.call(elements, function (element) {
  var dateMask = IMask(element, {
    mask: Date,
    min: new Date(1900, 0, 1),
    max: new Date(2010, 0, 1),
    lazy: true,
    autofix: true,
  });
});

//To fire onchange event when value is changed via js
const textfields = document.querySelectorAll(".text-field");
const { get, set } = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
textfields.forEach((textfield) => {
  Object.defineProperty(textfield, "value", {
    get() {
      return get.call(this);
    },
    set(newVal) {
      this.dispatchEvent(new Event("change", { bubbles: true }));
      return set.call(this, newVal);
    },
  });
});
