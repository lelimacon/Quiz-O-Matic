#import "models.typ": *
#import "theme.typ": *


#let print-quiz(
  path,
  seed,
  level,
  length,
) = {
  let module = import path: *
  exercise(
    "TODO: Exercise title",
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

#let exercises = rows.map(row =>
  print-quiz(
    "quizzes/" + row.at("subject") + "/" + row.at("category") + "/" + row.at("name") + ".typ",
    int(row.at("seed")),
    int(row.at("level")),
    int(row.at("length")),
  )
)

#exercises.join()
