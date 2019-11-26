const convert = require('./convert')

test('should convert cotacao 4 to quantidade 4', () => {
    const res = convert.convert(4, 4)
    expect(res).toBe(16)
})

test('should convert cotacao 0 to quantidade 4', () => {
    const res = convert.convert(0, 4)
    expect(res).toBe(0)
})

test('should toMoney convert float', () => {
    const res = convert.toMoney(2)
    expect(res).toBe('2.00')
})

test('should toMoney convert string', () => {
    const res = convert.toMoney('2')
    expect(res).toBe('2.00')
})