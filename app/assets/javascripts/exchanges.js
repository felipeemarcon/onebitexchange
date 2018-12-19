$(document).ready(() => {
  
  selectCustom();
  focusExchanged();
  sendForm();
  calculateCurrency();

  function selectCustom() {
    $('.select-custom-exchange').customSelect();
  }

  function focusExchanged() {
    const btnFocus = $('#focus-formExchange');
    const resetButton = $('.reset_form')
    let amount = $('#amount')
    const exchangeForm = $('#exchange_form');

    btnFocus.click((e) => {
      e.preventDefault();
      exchangeForm.find('#amount').focus();
    });

    amount.on("input", () => {
      if (amount.length >= 1) {
        resetButton.removeAttr("disabled");
        resetButton.addClass('active');

        resetButton.click(() => {
          amount.focus();
        });
      } else if (amount.length == 0) {
        resetButton.attr("disabled", "disabled");
        resetButton.removeClass('active');
      }
    });
  }

  function sendForm() {
    const exchangeForm = $('#exchange_form');

    $('#exchange_form input, select').on('input', function() {
      $(this).closest(exchangeForm).submit();
    });    
  }

  function calculateCurrency() {
    const exchangeForm = $('#exchange_form');

    exchangeForm.submit(() => {
      const formAction = exchangeForm.attr('action');

      let convertRoute = '/convert';
      let sourceCurrency = $('#source_currency');
      let targetCurrency = $('#target_currency');
      let amount = $('#amount');
      let convertResult = $('#resultExchange');

      if (formAction === convertRoute) {
        $.ajax(convertRoute, {
          type: 'GET',
          dataType: 'json',
          data: {
            source_currency: sourceCurrency.val(),
            target_currency: targetCurrency.val(),
            amount: amount.val()
          },
          error(jqXHR, textStatus, errorThrown) {
            return alert(textStatus);
          },
          success(data, text, jqXHR) {
            // convertResult.val('Calculando...');
            // setTimeout(() => {
              return convertResult.val(Math.round(data.value * 100) / 100)
              // convertResult.removeClass('calculating')
            // }, 500);
          }
        });
        return false;
      }
    });
  }
});