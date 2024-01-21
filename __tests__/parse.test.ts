import { parseUrl } from '../src/main'
import { UrlFormat } from '../src/interfaces/url-format.interface'
import { describe, it, expect } from '@jest/globals'


describe('parseUrl', () => {
    it('should correctly parse a URL', () => {
        const urlFormat = '/:version/api/:collection/:id'
        const urlInstance = '/6/api/listings/3?sort=desc&limit=10'

        const expected: UrlFormat = {
            version: 6,
            collection: 'listings',
            id: 3,
            sort: 'desc',
            limit: 10
        }

        expect(parseUrl(urlFormat, urlInstance)).toEqual(expected)
    })

    it('should correctly parse a URL without id param', () => {
        const urlFormat = '/:version/api/:collection/test'
        const urlInstance = '/6/api/listings/test?sort=desc&limit=10'

        const expected: UrlFormat = {
            version: 6,
            collection: 'listings',
            sort: 'desc',
            limit: 10
        }

        expect(parseUrl(urlFormat, urlInstance)).toEqual(expected)
    })

    it('should correctly parse a URL without query params', () => {
        const urlFormat = '/:version/api/:collection/:id'
        const urlInstance = '/6/api/listings/3'

        const expected: UrlFormat = {
            version: 6,
            collection: 'listings',
            id: 3
        }

        expect(parseUrl(urlFormat, urlInstance)).toEqual(expected)
    })

    it('should return an empty object for an empty URL', () => {
        const urlFormat = ''
        const urlInstance = ''

        const expected: UrlFormat = {}

        expect(parseUrl(urlFormat, urlInstance)).toEqual(expected)
    })
})