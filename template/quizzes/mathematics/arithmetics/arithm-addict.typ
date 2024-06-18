// SUBJECT=Mathematics
// CATEGORY=Arithmetics
// NAME=Arithm-Addict
// DESCRIPTION=Practical quiz for Maths beginners, where every question is an operation to solve.
// TAGS=practical,closed_answers
// LEVEL_SCALE=grades
// SUPPORTED_LEVELS=g5,g6
// SUPPORTED_LENGTHS=medium,long,full,double

#import "../../../models.typ": *
#import "../../../random.typ": *
#import "../../../theme.typ": *


#let generate-operation(
  random,
  level,
) = {
  let operand-count = 2
  let min-value = 1
  let max-value = 10

  let operand = 0
  (random, operand) = integer(random, min-value, max-value)
  let result = operand
  let operation = [ #result ]

  for _ in range(operand-count) {
    (random, operand) = integer(random, min-value, max-value)
    result = result + operand
    operation = [ #operation #math.plus #operand ]
  }

  return (random, operation, result)
}

#let generate(
  seed: 0,
  level: none,
  length: none,
) = [
  #let random = random(seed)

  #let operation-count = length
  #let operation = "1 + 1"
  #let result = 2

  🧮 Calculate the result of the following operations :

  #hint[Try writing the operations down to avoid making mistakes!]

  #grid(
    gutter: 40pt,

    columns: (auto, auto, auto),
    {
      for _ in range(operation-count, step: 3) {
        (random, operation, result) = generate-operation(random, level)
        input(1,
          [ #operation ],
          [ #result ],
        )
      }
    },
    {
      for _ in range(operation-count, step: 3) {
        (random, operation, result) = generate-operation(random, level)
        input(1,
          [ #operation ],
          [ #result ],
        )
      }
    },
    {
      for _ in range(operation-count, step: 3) {
        (random, operation, result) = generate-operation(random, level)
        input(1,
          [ #operation ],
          [ #result ],
        )
      }
    }
  )
]


// Preview.
#exercise(
  "Arithm-Addict",
  generate(
    seed: 42,
    level: level-grades.kindergarten,
    length: lengths.medium,
  ),
)
