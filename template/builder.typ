#let state-index = state("exercise-index", 1)


#let cover(
  length: "",
  title: "",
  subtitle: "",
  date: "",
) = [
  #grid(
    [#length],
    [#title],
    [#subtitle],
    [#date],
  ) <q-cover>
]


#let exercise(
  points,
  title,
  body,
) = [
  #grid(
    [#points],
    [#title],
    [#body],
  ) <q-exercise>
]

#let answer(
  body,
) = [
  #grid(
    body,
  ) <q-answer>
]

#let input(
  points,
  label,
  expected,
) = [
  #grid(
    [#points],
    [#label],
    [#expected],
  ) <q-input>
]

#let input-inline(
  points,
  label,
  expected,
) = [
  #grid(
    [#points],
    [#label],
    [#expected],
  ) <q-input-inline>
]

#let hint(
  body,
) = [
  #grid(
    [#body],
  ) <q-hint>
]
