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

  let person = none
  (random, person) = pick(random, entities.persons)

  return [
    #f(person)'s toy collection
  ]
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

  par[
    #f-ve(person) is an avid toy collector.
    #up(subject(person)) has #emph[$#object-count$] #f-ve(object, n: 2)
    which account for #emph($#numerator%$)
    of his collection.
  ]

  builder.input(2,
    [
      Let $T$ be #f-v(person)'s total number of toys.
      Calculate $T$ with an equation.
    ],
    [
      #block[$ #numerator / #denominator T = #object-count $]
      #block[$ T = #object-count * #denominator / #numerator $]
      #block[$ T = #total-count $]
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
