const axios = require('axios')

// 11-27-2019
const getURL = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=\'${data}\'&$top=100&$format=json`
const getCotacaoAPI = (url) => axios.get(url)
const extractCotacao = res => {
    let value = 0
    if (res.data) {
        const data = res.data
        if (data.value) {
            const dataValue = data.value
            if (dataValue.length > 0) {
                const dataObj = dataValue[0]
                if (dataObj.cotacaoVenda) {
                    value = dataObj.cotacaoVenda
                }
            }
        }
    }
    return value
}
const getToday = () => {
    const today = new Date()
    return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
}
const getCotacao = ({ getToday, getURL, getCotacaoAPI, extractCotacao }) => async () => {
    try {
        const today = getToday()
        const url = getURL(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    } catch(err) {
        console.log(err)
        return ''
    }
}

module.exports = {
    getURL,
    getToday,
    getCotacaoAPI,
    getCotacao: getCotacao({getToday, getURL, getCotacaoAPI, extractCotacao}),
    extractCotacao,
    pure: {
        getCotacao
    }
}