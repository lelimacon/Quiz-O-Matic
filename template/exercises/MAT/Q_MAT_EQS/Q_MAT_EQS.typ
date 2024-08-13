#import "../../../builder.typ" as builder
#import "../../../entities.typ"
#import "../../../constants.typ": *
#import "../../../random.typ": *
#import "../../../utils.typ": *

#import "@preview/oxifmt:0.2.1": strfmt


#let generate-title(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let (random, person) = pick(random, entities.persons)

  let sex = if (person.sex == "m") { "boy" } else { "girl" }

  let (random, title) = pick(random, (
    [#f(person)'s toy collection],
    [#f(person)'s models],
    [#f(person) the collector],
    [Model collector #f(person)],
    [Collector #sex #f(person)],
  ))

  return title
}


// Structure:
// - 1x 2p question
#let generate(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let (random, person) = pick(random, entities.persons)
  let (random, object) = pick(random, entities.objects.filter(o => o.size == "l"))

  let (random, object-price) = integer(random, 1, 100)
  object-price = object-price / 10.0
  let (random, rest) = integer(random, 1, 100)
  rest = rest / 10.0
  let total = object-price + rest

  let rest-format = emph($\$strfmt("{:.2}", #rest)$)
  let object-price-format = emph($\$strfmt("{:.2}", #object-price)$)
  let total-format = emph($\$strfmt("{:.2}", #total)$)

  let statement = none
  let (random, statement) = pick(random, (
    par[
      #f-ve(person) is an avid model collector.
      After buying a #object-price-format #f-ve(object),
      #subject(person) now has #rest-format left.
    ],
    par[
      For #possessive(person) model collection,
      #f-ve(person) has just bought a #f-ve(object) for #object-price-format
      and is left with #rest-format.
    ],
    par[
      #f-ve(person) has #rest-format left
      after buying a #object-price-format #f-ve(object)
      to complete #possessive(person) model collection.
    ],
  ))
  statement

  builder.input(2,
    [
      Let $x$ be the amount of money #f-v(person) had originally.
      Calculate $x$ with an equation.
    ],
    [
      #block[$ x - #object-price = #rest $]
      #block[$ x = #rest + #object-price $]
      #block[$ x = #total $]
    ],
  )
}


// Preview.
#let preview() = {
  let seed = 429
  let level = level-grades.g6
  let length = lengths.quick

  import "../../../themes/T_PLN/T_PLN.typ" as theme
  show: theme.apply

  builder.exercise(
    length,
    generate-title(seed: seed, level: level, length: length),
    generate(seed: seed, level: level, length: length),
  )
}

// Keep commented to avoid breaking imports.
//#preview()
