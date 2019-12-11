const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

const res = {
    data: {
        value: [
            { cotacaoVenda: 3.90 }
        ]
    }
}

const getToday = jest.fn()
getToday.mockReturnValue('01-01-2019')

const getURL = jest.fn()
getURL.mockReturnValue('url')

const extractCotacao = jest.fn()
extractCotacao.mockReturnValue(3.9)

test('getCotacaoAPI', (done) => {
    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('url').then( resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
        done()
    })
})

test('extractCotacao', () => {
    const cotacao = api.extractCotacao(res)
    expect(cotacao).toBe(3.90)
})

test('extractCotacao sem data', () => {
    const cotacao = api.extractCotacao({})
    expect(cotacao).toBe(0)
})

test('extractCotacao sem value', () => {
    const cotacao = api.extractCotacao({ data: undefined })
    expect(cotacao).toBe(0)
})

test('extractCotacao value indefinido', () => {
    const cotacao = api.extractCotacao({ data: { value: undefined } })
    expect(cotacao).toBe(0)
})

test('extractCotacao value vazio', () => {
    const cotacao = api.extractCotacao({ data: { value: [] } })
    expect(cotacao).toBe(0)
})

test('extractCotacao sem cotacaoVenda', () => {
    const cotacao = api.extractCotacao({ data: { value: [ {} ] } })
    expect(cotacao).toBe(0)
})

describe('getToday', () => {
    const RealDate = Date
    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date)
            }
        }
    }
    afterEach(() => {
        global.Date = RealDate
    })
    test('getToday', () => {
        mockDate('2019-01-01T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('1-1-2019')
    })
})

test('getURL', () => {
    const url = api.getURL('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=\'MINHA-DATA\'&$top=100&$format=json')
})

test('getCotacao', (done) => {

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockResolvedValue(res)

    const getCotacao = api.pure.getCotacao( { getToday, getURL, getCotacaoAPI, extractCotacao } )
    getCotacao().then( res => {
        expect(res).toBe(3.9)
        done()
    })
})

test('getCotacao exception', (done) => {

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockReturnValue(Promise.reject('err'))

    const getCotacao = api.pure.getCotacao( { getToday, getURL, getCotacaoAPI, extractCotacao } )
    getCotacao().then( res => {
        expect(res).toBe('')
        done()
    })
})