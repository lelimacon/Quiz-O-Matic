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
  let relation = none
  (random, relation) = pick(random, entities.relations)

  return [
    #f(person)'s #f(relation, n: 2) agree:
    Sharing is caring
  ]
}


// Structure:
// - 3x 1p question
// - 1x 2p questions
// - 3x 1p question
// - 1x 2p questions
#let generate(
  theme,
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let person = none
  (random, person) = pick(random, entities.persons)
  let relation = none
  (random, relation) = pick(random, entities.relations)
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

  let question-indices = none
  (random, question-indices) = sample(random, length - 4, range(7))

  par[
    #f-ve(person) has #f-vae(container) full of #f-ve(edible, n: total-edibles),
    and distributes them among #possessive(person)
    #f-vce(relation, n: relation-count).\
    After giving #f-vc(edible, n: pack-size) to each of
    #possessive(person) #f-v(relation, n: relation-count), #subject(person)
    has #f-vc(edible, n: rest) left for #reflexive(person).
  ]

  theme.hint[Be aware that some questions may not require any calculation!]

  let questions = array-take(question-indices,
    (
      theme.input(1,
        [
          How many #f-v(edible, n: 2) does #f-v(person) have left?
        ],
        block[
          $ #rest $
        ],
      ),
      theme.input(1,
        [
          How many #f-v(edible, n: 2) do each of #f-v(person)'s
          #f-v(relation, n: relation-count) receive?
        ],
        block[
          $ #pack-size $
        ],
      ),
      theme.input(1,
        [
          How many #f-v(edible, n: 2) do #f-v(person)'s #f-v(relation, n: relation-count) have
          in total?
        ],
        block[
          $ #relation-count #math.times #pack-size
          #math.eq #(relation-count * pack-size) $
        ],
      ),
    )
  )
  questions.join()

  theme.input(2,
    [
      How many #f-v(edible, n: 2) are there in total?
    ],
    block[
      $ #rest #math.plus #relation-count #math.times #pack-size
      #math.eq #total-edibles $
    ],
  )

  let eat-count = none
  (random, eat-count) = integer(random, 1, 3)
  let special-eat-count = none
  (random, special-eat-count) = integer(random, 0, 3)

  par[
    Everyone eats #f-vc(edible, n: eat-count) to celebrate 🎉.\
    #{
      if (special-eat-count == 0) [
        Except for #f-v(person) who is fasting and refrains from eating any #f-v(edible, n:  2).
      ]
      else if (special-eat-count > eat-count) [
        Except for glutony #f-v(person) who gulps #f-vc(edible, n: special-eat-count) at once.
      ]
      else if (special-eat-count < eat-count) [
        Except for #f-v(person) who is on a diet and limits #reflexive(person) to
        #f-vc(edible, n: special-eat-count).
      ]
    }
  ]

  questions = array-take(startAt: 3, question-indices,
    (
      theme.input(1,
        [
          How many does #f-v(edible, n: 2) did #f-v(person) eat?
        ],
        block[
          $ #special-eat-count $
        ]
      ),
      theme.input(1,
        [
          How many does #f-v(edible, n: 2) does #f-v(person) have left?
        ],
        block[
          $ #rest - #special-eat-count
          #math.eq #(rest - special-eat-count) $
        ]
      ),
      theme.input(1,
        [
          How many #f-v(edible, n: 2) do each of #f-v(person)'s
          #f-v(relation, n: 2) have left?
        ],
        block[
          $ #pack-size - #eat-count
          #math.eq #(pack-size - eat-count) $
        ]
      ),
      theme.input(1,
        [
          How many #f-v(edible, n: 2) do #f-v(person)'s
          #f-v(relation, n: 2) have in total?
        ],
        block[
          $ #relation-count #math.times \( #pack-size - #eat-count \)
          #math.eq #(relation-count * (pack-size - eat-count)) $
        ]
      ),
    )
  )
  questions.join()

  theme.input(2,
    [
      How many #f-v(edible, n: 2) are there in total?
    ],
    block[
      $ #rest - #special-eat-count + #relation-count #math.times \( #pack-size - #eat-count \)
      #math.eq #(rest - special-eat-count + relation-count * (pack-size - eat-count)) $
    ]
  )
}


// Preview.
#let preview() = {
  let seed = 42
  let level = level-grades.g5
  let length = lengths.medium

  import "../../themes/T_PLN/T_PLN.typ" as theme

  show: theme.apply

  theme.exercise(
    length,
    generate-title(seed: seed, level: level, length: length),
    generate(theme, seed: seed, level: level, length: length),
  )
}

// Keep commented to avoid breaking imports.
//#preview()
