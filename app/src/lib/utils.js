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

const dompurifySettings =
{
    CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: /^qc.-/,
        attributeNameCheck: (_) => true,
        allowCustomizedBuiltInElements: true,
    },
}

const sanitizeHtml = (values) =>
    values.map(value => DOMPurify.sanitize(value, dompurifySettings))

export const hasSetter = (obj, setterName) =>
{
    const prototype = Object.getPrototypeOf(obj)
    const property = Object.getOwnPropertyDescriptor(prototype, setterName)
    if (!property)
        return false
    return !!property["set"]
}

/**
 * @param {String} html String representing a single or multiple elements.
 * @return {Element | HTMLCollection | null}
 */
export const elementFromHTML = (html) =>
{
    if (!html)
    {
        return null
    }

    const template = document.createElement('template')
    template.innerHTML = html
    const result = template.content.children

    if (result.length === 1)
    {
        return result[0]
    }

    return result
}
