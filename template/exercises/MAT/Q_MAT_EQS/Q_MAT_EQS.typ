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

  let object-price = none
  (random, object-price) = integer(random, 1, 100)
  object-price = object-price / 10.0
  let rest = none
  (random, rest) = integer(random, 1, 100)
  rest = rest / 10.0
  let total = object-price + rest

  par[
    #f-ve(person) is an avid toy collector.
    After buying a #emph($\$#object-price$) #f-ve(object),
    he now has #emph($\$rest$) left.
  ]

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
