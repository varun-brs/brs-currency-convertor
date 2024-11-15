const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function getValue() {
  let currency_one = currencyEl_one.value;
  let currency_two = currencyEl_two.value;
  let data = fetch(
    `https://api.exchangerate-api.com/v4/latest/${currency_one}`
  );

  data
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

currencyEl_one.addEventListener("change", getValue);
amountEl_one.addEventListener("input", getValue);
currencyEl_two.addEventListener("change", getValue);
amountEl_two.addEventListener("input", getValue);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  getValue();
});

getValue();
