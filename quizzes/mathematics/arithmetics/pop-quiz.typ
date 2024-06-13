// SUBJECT=Mathematics
// CATEGORY=Arithmetics
// NAME=Pop-Quiz!
// DESCRIPTION=Theoretical questions about multiples and divisors.
// TAGS=theoretical,closed_answers
// LEVEL_SCALE=grades
// SUPPORTED_LEVELS=g5,g6
// SUPPORTED_LENGTHS=instant,quick,average

#import "@preview/suiji:0.3.0"
#import "../../../lib/theme.typ": *
#import "../../../lib/models.typ": *
#import "../../../lib/utils.typ": *


#let all-questions = (
  {
    input(
      [ What does H.C.F stand for? ],
      [ Highest Common Factor ],
    )
  },
  {
    input(
      [ What does L.C.M stand for? ],
      [ Least Common Multiple ],
    )
  },
  {
    input(
      [ For a multiple of 3, what is special about the digits? ],
      [ The sum of the digits is a multiple of 3 ],
    )
  },
  {
    input(
      [ For a multiple of 5, what is special about the digit in the units place? ],
      [ The digit in the units place is either a 0 or a 5 ],
    )
  },
  {
    input(
      [ For a multiple of 9 up to 100, what is special about the digits in the tens and units places? ],
      [ The sum of the digit in the tens and units places is equal to 9 ],
    )
  },
  {
    input(
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
  let rng = suiji.gen-rng(seed)

  let questions = none
  (rng, questions) = pick(rng, all-questions, count: length)

  for question in questions {
    question
  }
}


// Preview.
#exercise(
  "Pop-Quiz!",
  generate(
    seed: 42,
    level: level-grades.g5,
    length: lengths.quick,
  ),
)
