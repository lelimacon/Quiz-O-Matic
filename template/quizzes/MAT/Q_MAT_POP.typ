// code=Q_MAT_POP
// subject=mat
// name=Pop-Quiz!
// description=Theoretical questions about multiples and divisors.
// tags=theoretical,closed_answers,arithmetic
// levelScale=grades
// supportedLevels=g5,g6
// supportedLengths=instant,quick,medium

#import "../../models.typ": *
#import "../../random.typ": *
#import "../../theme.typ": *
#import "../../utils.typ": *


#let all-questions = (
  {
    input(1,
      [ What does H.C.F stand for? ],
      [ Highest Common Factor ],
    )
  },
  {
    input(1,
      [ What does L.C.M stand for? ],
      [ Least Common Multiple ],
    )
  },
  {
    input(1,
      [ For a multiple of 3, what is special about the digits? ],
      [ The sum of the digits is a multiple of 3 ],
    )
  },
  {
    input(1,
      [ For a multiple of 5, what is special about the digit in the units place? ],
      [ The digit in the units place is either a 0 or a 5 ],
    )
  },
  {
    input(1,
      [ For a multiple of 9 up to 100, what is special about the digits in the tens and units places? ],
      [ The sum of the digit in the tens and units places is equal to 9 ],
    )
  },
  {
    input(1,
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
  (random, questions) = sample(random, length, all-questions)
  questions.join()
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
