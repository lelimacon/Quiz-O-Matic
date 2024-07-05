#import "constants.typ": *
#import "theme.typ": *


#show: quiz


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

#let print-exercises(
  exercises
) = {
  return exercises
    .map(row => {
      let code = row.at("code")
      let subject = code.slice(2, count: 3)

      return print-quiz(
        "quizzes/" + subject + "/" + code + ".typ",
        int(row.at("seed")),
        int(row.at("level")),
        int(row.at("length")),
      )
    })
    .join()
}

#let mode = (
  questions-then-answers: 0,
  questions-with-answers: 1,
  questions-only: 2,
  answers-only: 3,
)

#let data = json("data.json")


// Questions.
#if (data.mode != mode.answers-only) {
  show <answer>: it => {
    if data.mode == mode.questions-with-answers {
      it
    }
    else {
      hide(it)
    }
  }

  print-exercises(data.exercises)
}


// Page break.
#if (data.mode == mode.questions-then-answers) {
  pagebreak()
}


// Answers.
#if (data.mode == mode.questions-then-answers or
     data.mode == mode.answers-only) {
  let index = state("exercise-index", 1)
  context index.update(x => 1)

  text(size: 20pt, align(center, [Answers]))

  let filterInputs(
    content
  ) = {
    if type(content) != "content" {
      return ()
    }

    if label in content.fields() and content.label == <input> {
      return (content,)
    }

    if "body" in content.fields() {
      return filterInputs(content.body)
        .flatten()
    }

    if "children" in content.fields() {
      return content.children
        .map(item => filterInputs(item))
        .flatten()
    }

    return ()
  }

  block({
    show box.where(label: <input-body>): it => [
      #box(
        width: auto,
        stroke: it.stroke,
        inset: it.inset,
        it.body
      )
    ]

    let inputs = filterInputs(print-exercises(data.exercises))

    inputs
      .map(i => box(i))
      .join(box(width: 6pt))
  })
}
