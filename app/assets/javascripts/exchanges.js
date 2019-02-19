$(document).ready(() => {
  selectCustom();
  focusExchanged();
  sendForm();
  calculateCurrency();
  // invertCurrency();

  function selectCustom() {
    $(".select-custom-exchange").customSelect();
  }

  function focusExchanged() {
    const btnFocus = $("#focus-formExchange");
    const resetButton = $(".reset_form");
    let amount = $("#amount");

    btnFocus.click(e => {
      e.preventDefault();
      amount.focus();
    });

    resetButton.click(e => {
      amount.focus();
    });
  }

  function sendForm() {
    const exchangeForm = $("#exchange_form");

    $("#exchange_form input, #exchange_form select").on("input", function() {
      exchangeForm.submit();
    });
  }

  function calculateCurrency() {
    const exchangeForm = $("#exchange_form");

    exchangeForm.submit(() => {
      const formAction = exchangeForm.attr("action");

      let convertRoute = "/convert";
      let sourceCurrency = $("#source_currency");
      let targetCurrency = $("#target_currency");
      let amount = $("#amount");
      let convertResult = $("#resultExchange");
      let loading = $(".app__form--loading");

      if (formAction === convertRoute) {
        $.ajax(convertRoute, {
          type: "GET",
          dataType: "json",
          data: {
            source_currency: sourceCurrency.val(),
            target_currency: targetCurrency.val(),
            amount: amount.val()
          },
          error(jqXHR, textStatus, errorThrown) {
            return alert(textStatus);
          },
          success(data, text, jqXHR) {
            loading.show();
            convertResult.css("opacity", "0.2");
            setTimeout(() => {
              return (
                convertResult.val(Math.round(data.value * 100) / 100),
                convertResult.css("opacity", "1"),
                loading.hide()
              );
            }, 1000);
          }
        });
        return false;
      }
    });
  }

  function invertCurrency() {
    let sourceCurrency = $("#source_currency");
    let sourceCurrencySelect = sourceCurrency.find(":selected");

    targetCurrency = $("#target_currency");
    targetCurrencySelect = targetCurrency.find(":selected");

    const exchangeForm = $("#exchange_form");
    const triggerInvert = $("#invertConvert");

    sourceCurrencyVal = sourceCurrencySelect.val();
    targetCurrencyVal = targetCurrencySelect.val();

    triggerInvert.on("click", function(e) {
      e.preventDefault();

      // target
      $(`#source_currency option[value=${targetCurrencyVal}]`).attr(
        "selected",
        "selected"
      );
      sourceCurrency.val(targetCurrencyVal);

      $(`#target_currency option[value=${sourceCurrencyVal}]`).attr(
        "selected",
        "selected"
      );

      // Report results
      console.log(sourceCurrencySelect.val(), targetCurrencySelect.val());

      exchangeForm.submit();
    });
  }
});
