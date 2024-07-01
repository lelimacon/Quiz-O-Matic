// code=Q_MAT_AAD
// subject=mat
// name=Arithm-Addict
// description=Practical quiz for Maths beginners, where every question is an operation to solve.
// tags=practical,closed_answers,arithmetic
// levelScale=grades
// supportedLevels=g5,g6
// supportedLengths=medium,long,full,double

#import "../../constants.typ": *
#import "../../random.typ": *
#import "../../theme.typ": *


#let generate-title(
  seed: 0,
  level: none,
  length: none,
) = {
  return "Arithm-Addict"
}


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
#{
  let seed = 42
  let level = level-grades.kindergarten
  let length = lengths.medium

  exercise(
    generate-title(seed: seed, level: level, length: length),
    generate(seed: seed, level: level, length: length),
  )
}
