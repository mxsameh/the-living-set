const $product_form = document.querySelector(".pf");
const product_variants = product.variants;

const getSelectedOptions = () => {
  const selectedOptions = [];
  const inputs = $product_form.querySelectorAll('input[type="radio"]:checked');
  inputs.forEach((input) => {
    const value = input.value;
    selectedOptions.push(value);
  });
  return selectedOptions;
};

const areArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();

  return sorted1.every((value, index) => value === sorted2[index]);
};

const getVariantByOptions = (options) => {
  const variant = product_variants.find((variant) =>
    areArraysEqual(variant.options, options),
  );
  return variant;
};

const updateUrl = (variantId) => {
  const url = new URL(window.location.href);
  url.searchParams.set("variant", variantId);
  window.history.replaceState({}, "", url);
};

$product_form.addEventListener("change", () => {
  const selectedOptions = getSelectedOptions();
  const variant = getVariantByOptions(selectedOptions);
  const x = $product_form.querySelector("#variant-id");
  x.value = variant.id;
  updateProductInfo(variant);
  updateUrl(variant.id);
});

const formatPrice = (number) => {
  if (!number) return 0;
  number = number / 100;
  let formattedNumber = number.toLocaleString();
  // Convert the number to a string

  // Convert back to a number
  return formattedNumber;
};

const updateProductInfo = (variant) => {
  const { available, price, compare_at_price } = variant;

  // QUERY SELECTORS
  const $product_compare_price = document.querySelector(
    ".product_price .compare-price span",
  );
  const $product_current_price = document.querySelector(
    ".product_price .current-price span",
  );
  const $product_atc = document.querySelector(".product_atc button");
  // const $product_image = document.querySelector(".product_image img");

  // UPDATE COMPARE PRICE
  if (compare_at_price && compare_at_price > price) {
    $product_compare_price?.classList.remove("d-n");
    $product_compare_price?.textContent = formatPrice(compare_at_price);
  } else {
    $product_compare_price?.classList.add("d-n");
  }

  // UPDATE CURRENT PRICE
  $product_current_price.textContent = formatPrice(price);

  // UPDATE AVAILABILITY
  if (available) {
    if (!$product_atc.disabled) return;
    $product_atc.removeAttribute("disabled");
    $product_atc.classList.remove("disabled");
    $product_atc.textContent = "Add to Bag";
  } else {
    if ($product_atc.disabled) return;
    $product_atc.setAttribute("disabled", true);
    $product_atc.classList.add("disabled");
    $product_atc.textContent = "Sold Out";
  }
  console.log("updated");
};
