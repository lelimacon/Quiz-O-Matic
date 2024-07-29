#import "../../../constants.typ": *
#import "../../../random.typ": *


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

#let generate-question(
  theme,
  random,
  level,
) = {
  let operation = "1 + 1"
  let result = 2

  (random, operation, result) = generate-operation(random, level)

  let input = theme.input(1,
    block[ $ #operation $ ],
    block[ $ #result $ ],
  )

  return (random, input)
}

#let generate(
  theme,
  seed: 0,
  level: none,
  length: none,
) = [
  #let random = random(seed)

  #let operation-count = length
  #let input = none

  🧮 Calculate the result of the following operations :

  #theme.hint[Try writing the operations down to avoid making mistakes!]

  #grid(
    gutter: 40pt,

    columns: (auto, auto, auto),

    {
      for _ in range(operation-count, step: 3) {
        (random, input) = generate-question(theme, random, level)
        input
      }
    },
    {
      for _ in range(operation-count, step: 3) {
        (random, input) = generate-question(theme, random, level)
        input
      }
    },
    {
      for _ in range(operation-count, step: 3) {
        (random, input) = generate-question(theme, random, level)
        input
      }
    }
  )
]


// Preview.
#let preview() = {
  let seed = 42
  let level = level-grades.kindergarten
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
