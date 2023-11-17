/*
Author: Emil Soleymani
Last Modification: 2023-11-13

Code inspired by https://codepen.io/predragdavidovic/pen/mdpMoWo
*/

$(document).ready(function() {
  const SLIDER_BG = '#55a7b2';
  const RANGE_BG = '#264F54';

  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
      const [from, to] = getParsed(fromInput, toInput);
      fillSlider(fromInput, toInput, SLIDER_BG, RANGE_BG, controlSlider);
      if (from > to) {
          fromSlider.val(to);
          fromInput.val(to);
      } else {
          fromSlider.val(from);
      }
  }

  function controlToInput(toSlider, fromInput, toInput, controlSlider) {
      const [from, to] = getParsed(fromInput, toInput);
      fillSlider(fromInput, toInput, SLIDER_BG, RANGE_BG, controlSlider);
      setToggleAccessible(toInput);
      if (from <= to) {
          toSlider.val(to);
          toInput.val(to);
      } else {
          toInput.val(from);
      }
  }

  function controlFromSlider(fromSlider, toSlider, fromInput) {
      const [from, to] = getParsed(fromSlider, toSlider);
      fillSlider(fromSlider, toSlider, SLIDER_BG, RANGE_BG, toSlider);
      if (from > to) {
          fromSlider.val(to);
          fromInput.val(to);
      } else {
          fromInput.val(from);
      }
  }

  function controlToSlider(fromSlider, toSlider, toInput) {
      const [from, to] = getParsed(fromSlider, toSlider);
      fillSlider(fromSlider, toSlider, SLIDER_BG, RANGE_BG, toSlider);
      setToggleAccessible(toSlider);
      if (from <= to) {
          toSlider.val(to);
          toInput.val(to);
      } else {
          toInput.val(from);
          toSlider.val(from);
      }
  }

  function getParsed(currentFrom, currentTo) {
      const from = parseInt(currentFrom.val(), 10);
      const to = parseInt(currentTo.val(), 10);
      return [from, to];
  }

  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
      const rangeDistance = to.prop('max') - to.prop('min');
      const fromPosition = from.val() - to.prop('min');
      const toPosition = to.val() - to.prop('min');
      controlSlider.css('background', `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
          ${rangeColor} ${((fromPosition / rangeDistance)) * 100}%,
          ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
          ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
          ${sliderColor} 100%)`);
  }

  function setToggleAccessible(currentTarget) {
      const toSlider = $('#toSlider');
      if (Number(currentTarget.val()) <= 0) {
          toSlider.css('z-index', 2);
      } else {
          toSlider.css('z-index', 0);
      }
  }

  const filtersFromSlider = $('#fromSlider');
  const filtersToSlider = $('#toSlider');
  const fromInput = $('#fromInput');
  const toInput = $('#toInput');

  fillSlider(filtersFromSlider, filtersToSlider, SLIDER_BG, RANGE_BG, filtersToSlider);
  setToggleAccessible(filtersToSlider);

  filtersFromSlider.on('input', () => controlFromSlider(filtersFromSlider, filtersToSlider, fromInput));
  filtersToSlider.on('input', () => controlToSlider(filtersFromSlider, filtersToSlider, toInput));
  fromInput.on('input', () => controlFromInput(filtersFromSlider, fromInput, toInput, filtersToSlider));
  toInput.on('input', () => controlToInput(filtersToSlider, fromInput, toInput, filtersToSlider));
});
