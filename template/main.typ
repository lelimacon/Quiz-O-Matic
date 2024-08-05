#import "builder.typ" as builder


#let data = json("data.json")


#let length = data.exercises.map(e => e.length).sum(default: 0)

#let mode = (
  questions-then-answers: 0,
  questions-with-answers: 1,
  questions-only: 2,
  answers-only: 3,
)


#let generate-exercise(
  exercise,
  shouldExcludeAnswers,
) = {
  import exercise.path as ex

  show <answer>: it => {
    if shouldExcludeAnswers { hide(it) }
    else { it }
  }

  builder.exercise(
    exercise.length,
    ex.generate-title(
      seed: exercise.seed,
      level: exercise.level,
      length: exercise.length,
    ),
    ex.generate(
      seed: exercise.seed,
      level: exercise.level,
      length: exercise.length,
    ),
  )
}


// Questions.
#if (data.mode != mode.answers-only) {

  // Apply theme.
  import data.theme.path as theme
  show: theme.apply.with(
    options: data.theme.options,
    title: data.title,
    length: length,
  )

  builder.cover(
    length: length,
    title: data.title,
    subtitle: data.subtitle,
    date: data.date,
  )

  let shouldExcludeAnswers = data.mode != mode.questions-with-answers

  data.exercises
    .map(ex => generate-exercise(ex, shouldExcludeAnswers))
    .join()
}


// Answers.
#if (data.mode == mode.questions-then-answers or
     data.mode == mode.answers-only) {

  // Apply plain theme.
  import "theme-answers.typ" as theme
  show: theme.apply.with(
    options: (),
    title: data.title,
    length: length,
  )

  // Page break after applying new theme.
  if (data.mode == mode.questions-then-answers) {

    // Page break.
    pagebreak()

    // Reset question index.
    let index = state("exercise-index", 1)
    context index.update(x => 1)

    // Reset heading index.
    counter(heading).update(0)
  }

  text(size: 20pt, align(center, [Answers]))

  data.exercises
    .map(ex => generate-exercise(ex, false))
    .join()
}
