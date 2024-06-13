// SUBJECT=Mathematics
// CATEGORY=Arithmetics
// NAME=Arithm-Addict
// DESCRIPTION=Practical quiz for Maths beginners, where every question is an operation to solve.
// TAGS=practical,closed_answers
// LEVEL_SCALE=grades
// SUPPORTED_LEVELS=g5,g6
// SUPPORTED_LENGTHS=average,long,full,double

#import "@preview/suiji:0.3.0"
#import "../../../lib/theme.typ": *
#import "../../../lib/models.typ": *


#let generate-operation(
  rng,
  level,
) = {
  let operand-count = 2
  let min-value = 1
  let max-value = 10

  let operand = 0
  (rng, operand) = suiji.integers(rng, low: min-value, high: max-value)
  let result = operand
  let operation = [ #result ]

  for _ in range(operand-count) {
    (rng, operand) = suiji.integers(rng, low: min-value, high: max-value)
    result = result + operand
    operation = [ #operation #math.plus #operand ]
  }

  return (rng, operation, result)
}

#let generate(
  seed: 0,
  level: none,
  length: none,
) = [
  #let rng = suiji.gen-rng(seed)

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
        (rng, operation, result) = generate-operation(rng, level)
        input(
          [ #operation ],
          [ #result ],
        )
      }
    },
    {
      for _ in range(operation-count, step: 3) {
        (rng, operation, result) = generate-operation(rng, level)
        input(
          [ #operation ],
          [ #result ],
        )
      }
    },
    {
      for _ in range(operation-count, step: 3) {
        (rng, operation, result) = generate-operation(rng, level)
        input(
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
    length: lengths.average,
  ),
)
