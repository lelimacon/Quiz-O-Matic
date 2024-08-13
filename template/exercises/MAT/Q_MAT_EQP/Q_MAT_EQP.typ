#import "../../../builder.typ" as builder
#import "../../../entities.typ"
#import "../../../constants.typ": *
#import "../../../random.typ": *
#import "../../../utils.typ": *


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

  let person = none
  (random, person) = pick(random, entities.persons)
  let object = none
  (random, object) = pick(random, entities.objects.filter(o => o.size == "l"))

  let coin-flip = none
  (random, coin-flip) = integer(random, 0, 2)

  let numerator = none
  (random, numerator) = integer(random, 1, 10)
  numerator = numerator * 10 + coin-flip * 5
  let denominator = 100
  let object-count = none
  (random, object-count) = integer(random, 1, 5)
  object-count = object-count * numerator / 5
  let total-count = object-count * denominator / numerator

  let statement = none
  let (random, statement) = pick(random, (
    par[
      #f-ve(person) is an avid model collector.
      #up(subject(person)) has #emph[$#object-count$] #f-ve(object, n: 2)
      which constitute #emph($#numerator%$)
      of #possessive(person) collection.
    ],
    par[
      Over the years #f-ve(person) has accumulated
      #emph[$#object-count$] #f-ve(object, n: 2),
      which account for #emph($#numerator%$)
      of #possessive(person) collection.
    ],
    par[
      #emph($#numerator%$) of #f-ve(person)'s model collection
      is composed of #f-ve(object, n: 2),
      of which #subject(person) has #emph[$#object-count$].
    ],
  ))
  statement

  builder.input(2,
    [
      Let $x$ be #f-v(person)'s total number of models.
      Calculate $x$ with an equation.
    ],
    [
      #block[$ #numerator / #denominator x = #object-count $]
      #block[$ x = #object-count * #denominator / #numerator $]
      #block[$ x = #total-count $]
    ],
  )
}


// Preview.
#let preview() = {
  let seed = 42
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
