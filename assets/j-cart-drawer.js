const $add_to_cart_forms = document.querySelectorAll(
  'form[action="/cart/add"]',
);
const $cd_ = document.querySelector(".cd_");
const $cart_btn = document.querySelectorAll("#cart-btn");
const $indicator = document.querySelectorAll("#cart-btn .indi");

const Cart = async (html) => {
  if (!html) {
    const res = await fetch("/?section_id=cart-drawer");
    html = await res.text();
  }
  const $html = document.createElement("div");
  $html.innerHTML = html;
  $cd_.innerHTML = $html.querySelector(".cd_").innerHTML;
  $cd_.innerHTML = $html.querySelector(".cd_").innerHTML;
  const count = $html.querySelector(".cd_h_count_").getAttribute("data-count");
  // console.log("Count", count);
  if (count == 0) {
    $indicator?.forEach(($indi) => {
      $indi.classList.add("d-n");
    });
  } else {
    $indicator?.forEach(($indi) => {
      $indi.classList.remove("d-n");
    });
  }

  initialize();
};

const addToCart = async (e) => {
  // Prevent the default form submission
  e.preventDefault();

  // Submit form data
  const res = await fetch("/cart/add", {
    method: "POST",
    body: new FormData(e.target),
  });
  const html = await res.text();

  // Update cart conetent
  await Cart(html);

  // Update cart count
  openCartDrawer();
};

const updateItemQuantity = async (e) => {
  const $btn = e.target;
  const $cd_item = $btn.closest(".cd_item");
  const $quantity_input = $cd_item.querySelector("input");

  // Get line key
  const line_key = $cd_item.getAttribute("data-line-key");
  // Check the button clicked
  const isPlus = $btn.id === "plus";

  // Get new Quantity
  const current_quantity = parseInt($quantity_input.value);
  const new_quantity = isPlus ? current_quantity + 1 : current_quantity - 1;

  // Ajax update
  try {
    const res = await fetch("/cart/update.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updates: {
          [line_key]: new_quantity,
        },
      }),
    });
    if (!res.ok) throw new Error("Network response was not ok");
    Cart();
  } catch (err) {
    console.error("ER", err);
  }
};

const removeItem = async (e) => {
  const $link = e.target;
  e.preventDefault();
  const href = $link.getAttribute("href");

  const res = await fetch(href);
  const html = await res.text();
  Cart(html);
};

const closeCartDrawer = () => {
  document.body.classList.remove("s-s");
  $cd_.classList.remove("active");
};

const openCartDrawer = () => {
  document.body.classList.add("s-s");
  $cd_.classList.add("active");
};

// Event listeners
$add_to_cart_forms.forEach(($form) => {
  $form.addEventListener("submit", addToCart);
});

$cd_.addEventListener("click", closeCartDrawer);

$cart_btn.forEach(($cb) => {
  $cb.addEventListener("click", openCartDrawer);
});

const initialize = () => {
  // Query Selectors
  const $cd = document.querySelector(".cd");
  const $cd_close_btn = document.querySelector(".cd_h_close");
  const $quantity_controllers = document.querySelectorAll(
    ".cd_item-quantity button",
  );
  const $remove_links = document.querySelectorAll(
    ".cd_ a[href*='/cart/change']",
  );

  // Event Listeners
  $cd_close_btn.addEventListener("click", closeCartDrawer);

  $cd.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  $quantity_controllers.forEach(($btn) => {
    $btn.addEventListener("click", updateItemQuantity);
  });

  $remove_links.forEach(($link) => {
    $link.addEventListener("click", removeItem);
  });
};

initialize();
