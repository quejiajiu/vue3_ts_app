import { Debounced } from '../../src/utils/common'

describe('防抖', () => {
    it('正常', () => {
        let debouncedUse: Function = new Debounced().use(printInt, 100)
        var _num: number = 0;
        function printInt() {
            _num++
        }
        let tmier = setInterval(() => {
            debouncedUse()
        }, 99)
        setTimeout(() => {
            clearInterval(tmier)
            expect(_num).toBe(1)
        }, 3000)
    })
})