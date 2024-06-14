// SUBJECT=Mathematics
// CATEGORY=Arithmetics
// NAME=Sharing is caring
// DESCRIPTION=Practical problem about multiplications and multiples.
// TAGS=practical,closed_answers,problem,traps,plot
// LEVEL_SCALE=grades
// SUPPORTED_LEVELS=g5,g6
// SUPPORTED_LENGTHS=quick,medium

#import "../../../lib/entities.typ"
#import "../../../lib/models.typ": *
#import "../../../lib/random.typ": *
#import "../../../lib/theme.typ": *
#import "../../../lib/utils.typ": *


// Structure:
// - 3 1p question
// - 1 2p questions
// - 3 1p question
// - 1 2p questions
#let generate(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let question-indices = none
  (random, question-indices) = sample(random, length - 4, range(6))

  let relation = none
  (random, relation) = pick(random, entities.relations)
  let person = none
  (random, person) = pick(random, entities.persons)
  let container = none
  (random, container) = pick(random, entities.containers.filter(v => v.size == "s"))
  let edible = none
  (random, edible) = pick(random, entities.edibles)

  let relation-count = none
  (random, relation-count) = integer(random, 3, 10)
  let pack-size = none
  (random, pack-size) = integer(random, 3, 10)
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

  hint[Be aware that some questions may not require any calculation!]

  let questions = array-take(question-indices,
    (
      input(1,
        [
          How many #f-v(edible, n: 2) does #f-v(person) have left?
        ],
        [
          $ #rest $
        ],
      ),
      input(1,
        [
          How many #f-v(edible, n: 2) do each of #f-v(person)'s
          #f-v(relation, n: relation-count) receive?
        ],
        [
          $ #pack-size $
        ],
      ),
      input(1,
        [
          How many #f-v(edible, n: 2) do #f-v(person)'s #f-v(relation, n: relation-count) have
          in total?
        ],
        [
          $ #relation-count #math.times #pack-size
          #math.eq #(relation-count * pack-size) $
        ],
      ),
    )
  )
  questions.join()

  input(2,
    [
      How many #f-v(edible, n: 2) are there in total?
    ],
    [
      $ #rest #math.plus #relation-count #math.times #pack-size
      #math.eq #total-edibles $
    ],
  )

  let eat-count = none
  (random, eat-count) = integer(random, 1, 3)
  let special-eat-count = none
  (random, special-eat-count) = integer(random, 2, 3)

  par[
    Everyone eats #f-vc(edible, n: eat-count) to celebrate 🎉.\
    #f-v(person) eats #var(special-eat-count) at once.
  ]

  questions = array-take(startAt: 3, question-indices,
    (
      input(1,
        [
          How many does #f-v(edible, n: 2) does #f-v(person) have left?
        ],
        [
          $ #rest - #special-eat-count
          #math.eq #(rest - special-eat-count) $
        ]
      ),
      input(1,
        [
          How many #f-v(edible, n: 2) do each of #f-v(person)'s
          #f-v(relation, n: 2) have left?
        ],
        [
          $ #pack-size - #eat-count
          #math.eq #(pack-size - eat-count) $
        ]
      ),
      input(1,
        [
          How many #f-v(edible, n: 2) do #f-v(person)'s
          #f-v(relation, n: 2) have in total?
        ],
        [
          $ #relation-count #math.times \( #pack-size - #eat-count \)
          #math.eq #(relation-count * (pack-size - eat-count)) $
        ]
      ),
    )
  )
  questions.join()

  input(2,
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
    length: lengths.long,
  ),
)
