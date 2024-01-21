import { UrlFormat } from './interfaces/url-format.interface'

export function parseUrl (urlFormat: string, urlInstance: string): UrlFormat {
    const formatParts = urlFormat.split('/')
    const [urlPath, queryString] = urlInstance.split('?')
    const urlParts = urlPath.split('/')
    const queryParams = new URLSearchParams(queryString)

    const result: UrlFormat = extractPathParams(formatParts, urlParts)
    appendQueryParams(result, queryParams)

    return result
}

function extractPathParams (formatParts: string[], urlParts: string[]): UrlFormat {
    const result: UrlFormat = {}

    formatParts.forEach((part, index) => {
        if (part.startsWith(':')) {
            const paramName = part.slice(1)
            result[paramName] = parseValue(urlParts[index])
        }
    })

    return result
}

function appendQueryParams (result: UrlFormat, queryParams: URLSearchParams): void {
    queryParams.forEach((value, key) => {
        result[key] = parseValue(value)
    })
}

function parseValue (value: string): string | number {
    return isNaN(Number(value)) ? value : Number(value)
}

const urlFormat = '/:version/api/:collection/:id'
const urlInstance = '/6/api/listings/3?sort=desc&limit=10'

const parsedUrl = parseUrl(urlFormat, urlInstance)

console.log(parsedUrl)