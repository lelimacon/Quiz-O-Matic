import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.1.5/+esm"


export const html = (strings, ...substitutions) => format(strings, sanitizeHtml(substitutions))
export const css = (strings, ...substitutions) => format(strings, substitutions)

const format = (strings, substitutions) =>
{
    let result = ''
    for (let i = 0; i < substitutions.length; i++)
    {
        result += strings[i]
        result += substitutions[i]
    }
    result += strings[strings.length - 1]
    return result
}

const sanitizeHtml = (values) =>
    values.map(value => DOMPurify.sanitize(value))
