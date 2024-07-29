#import "generator.typ" as generator

#let data = json("data.json")

#import data.theme.path as theme

#show: theme.apply.with(
  options: data.theme.options
)

#show: theme.cover.with(
  length: data.exercises.map(e => e.length).sum(default: 0),
  title: data.title,
  subtitle: data.subtitle,
  date: data.date,
)

#let mode = (
  questions-then-answers: 0,
  questions-with-answers: 1,
  questions-only: 2,
  answers-only: 3,
)


// Questions.
#if (data.mode != mode.answers-only) {

  let shouldExcludeAnswers = data.mode != mode.questions-with-answers

  data.exercises
    .map(ex => generator.generate-exercise(theme, ex, shouldExcludeAnswers))
    .join()
}


#if (data.mode == mode.questions-then-answers) {

  // Page break.
  pagebreak()

  // Reset index.
  let index = state("exercise-index", 1)
  context index.update(x => 1)
}


// Answers.
#if (data.mode == mode.questions-then-answers or
     data.mode == mode.answers-only) {

  text(size: 20pt, align(center, [Answers]))

  data.exercises
    .map(ex => generator.generate-answers(theme, ex))
    .join()
}
