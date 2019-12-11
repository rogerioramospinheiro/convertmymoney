$(function() {
    $('button').click(function(evt) {
        evt.preventDefault()
        const valCotacao = $("input[name='cotacao']").val()
        const valQuantidade = $("input[name='quantidade']").val()
        const cotacao = parseFloat(valCotacao)
        const quantidade = parseFloat(valQuantidade)
        if (cotacao > 0 && quantidade > 0) {
            $('form').submit()
        } else {
            alert('Valores invalidos')
        }
    })
})