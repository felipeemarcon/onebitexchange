$(document).ready(() =>

  $('form').submit(() => {
    const formAction = $('form').attr('action')

    let convertRoute = '/convert'
    let sourceCurrency = $('#source_currency')
    let targetCurrency = $('#target_currency')
    let amount = $('#amount')
    let convertResult = $('#result')

    if (formAction  === convertRoute) {
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
          return convertResult.val(data.value);
        }
      });
      return false;
    }
  })
);