#import "../../../builder.typ" as builder
#import "../../../constants.typ": *
#import "../../../random.typ": *
#import "../../../utils.typ": *


#let generate-title(
  seed: 0,
  level: none,
  length: none,
) = {
  return "Pop-Quiz!"
}


#let all-questions(
) = (
  {
    builder.input(1,
      [ What does H.C.F stand for? ],
      [ Highest Common Factor ],
    )
  },
  {
    builder.input(1,
      [ What does L.C.M stand for? ],
      [ Least Common Multiple ],
    )
  },
  {
    builder.input(1,
      [ For a multiple of 3, what is special about the digits? ],
      [ The sum of the digits is a multiple of 3 ],
    )
  },
  {
    builder.input(1,
      [ For a multiple of 5, what is special about the digit in the units place? ],
      [ The digit in the units place is either a 0 or a 5 ],
    )
  },
  {
    builder.input(1,
      [ For a multiple of 9 up to 100, what is special about the digits in the tens and units places? ],
      [ The sum of the digit in the tens and units places is equal to 9 ],
    )
  },
  {
    builder.input(1,
      [ For a multiple of 3, what is special about the digits? ],
      [ The sum of the digits is a multiple of 3 ],
    )
  },
)

#let generate(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let questions = none
  (random, questions) = sample(random, length, all-questions())
  questions.join()
}


// Preview.
#let preview() = {
  let seed = 42
  let level = level-grades.g5
  let length = lengths.quick

  import "../../themes/T_PLN/T_PLN.typ" as theme

  show: theme.apply

  builder.exercise(
    length,
    generate-title(seed: seed, level: level, length: length),
    generate(seed: seed, level: level, length: length),
  )
}

// Keep commented to avoid breaking imports.
//#preview()
