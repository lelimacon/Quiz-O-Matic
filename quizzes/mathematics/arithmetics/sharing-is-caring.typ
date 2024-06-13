// SUBJECT=Mathematics
// CATEGORY=Arithmetics
// NAME=Sharing is caring
// DESCRIPTION=Practical problem about multiplications and multiples.
// TAGS=practical,closed_answers,problem,traps
// LEVEL_SCALE=grades
// SUPPORTED_LEVELS=g5,g6
// SUPPORTED_LENGTHS=quick,average

#import "@preview/suiji:0.3.0"
#import "../../../lib/theme.typ": *
#import "../../../lib/models.typ": *
#import "../../../lib/entities.typ"
#import "../../../lib/utils.typ": *


#let generate(
  seed: 0,
  level: none,
  length: none,
) = {
  let rng = suiji.gen-rng(seed)

  let relation = none
  (rng, relation) = pick(rng, entities.relations)
  let person = none
  (rng, person) = pick(rng, entities.persons)
  let container = none
  (rng, container) = pick(rng, entities.containers)
  let edible = none
  (rng, edible) = pick(rng, entities.edibles)

  let relation-count = none
  (rng, relation-count) = suiji.integers(rng, low: 3, high: 10)
  let pack-size = none
  (rng, pack-size) = suiji.integers(rng, low: 3, high: 10)
  let rest = 5
  let total-edibles = rest + relation-count * pack-size

  par[
    #f-ve(person) has #f-vae(container) full of #f-ve(edible, n: total-edibles),
    and distributes them among #possessive(person)
    #f-vce(relation, n: relation-count).\
    After giving #f-vc(edible, n: pack-size) to each of
    #possessive(person) #f-v(relation, n: relation-count), #subject(person)
    has #f-vc(edible, n: rest) left for #reflexive(person).
  ]

  hint[Be aware that some questions do not require any calculation!]

  {
    input(
      [
        How many #f-v(edible, n: 2) does #f-v(person) have left?
      ],
      [
        $ #rest $
      ],
    )
    input(
      [
        How many #f-v(edible, n: 2) do each of #f-v(person)'s
        #f-v(relation, n: relation-count) get?
      ],
      [
        $ #pack-size $
      ],
    )
    input(
      [
        How many #f-v(edible, n: 2) do #f-v(person)'s #f-v(relation, n: relation-count) have in total?
      ],
      [
        $ #relation-count #math.times #pack-size
        #math.eq #(relation-count * pack-size) $
      ],
    )
  }

  input(
    [
      How many #f-v(edible, n: 2) are there in total?
    ],
    [
      $ #rest #math.plus #relation-count #math.times #pack-size
      #math.eq #total-edibles $
    ],
  )

  let eat-count = none
  (rng, eat-count) = suiji.integers(rng, low: 1, high: 3)
  let special-eat-count = none
  (rng, special-eat-count) = suiji.integers(rng, low: 2, high: 3)

  par[
    Everyone eats #f-vc(edible, n: eat-count) to celebrate 🎉.\
    #f-v(person) eats #var(special-eat-count) at once.
  ]

  {
    input(
      [
        How many does #f-v(edible, n: 2) does #f-v(person) have left?
      ],
      [
        $ #rest - #special-eat-count
        #math.eq #(rest - special-eat-count) $
      ]
    )
    input(
      [
        How many #f-v(edible, n: 2) do each of #f-v(person)'s
        #f-v(relation, n: 2) have left?
      ],
      [
        $ #pack-size - #eat-count
        #math.eq #(pack-size - eat-count) $
      ]
    )
    input(
      [
        How many #f-v(edible, n: 2) do #f-v(person)'s
        #f-v(relation, n: 2) have in total?
      ],
      [
        $ #relation-count #math.times \( #pack-size - #eat-count \)
        #math.eq #(relation-count * (pack-size - eat-count)) $
      ]
    )
  }
  input(
    [
      How many #f-v(edible, n: 2) are there in total?
    ],
    [
      $ #rest - #special-eat-count + #relation-count #math.times \( #pack-size - #eat-count \)
      #math.eq #(rest - special-eat-count + relation-count * (pack-size - eat-count)) $
    ]
  )
}


// Preview.
#exercise(
  "Sharing is caring",
  generate(
    seed: 42,
    level: level-grades.g5,
    length: lengths.average,
  ),
)
