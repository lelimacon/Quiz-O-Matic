#import "constants.typ": *
#import "theme.typ": *


#let print-quiz(
  path,
  seed,
  level,
  length,
) = {
  let module = import path: *
  exercise(
    generate-title(
      seed: seed,
      level: level,
      length: length,
    ),
    generate(
      seed: seed,
      level: level,
      length: length,
    ),
  )
}

#let rows = csv(
  delimiter: ";",
  row-type: dictionary,
  "data.csv"
)

#let exercises = rows.map(row => {
  let code = row.at("code")
  let subject = code.slice(2, count: 3)

  return print-quiz(
    "quizzes/" + subject + "/" + code + ".typ",
    int(row.at("seed")),
    int(row.at("level")),
    int(row.at("length")),
  )
})

#exercises.join()
