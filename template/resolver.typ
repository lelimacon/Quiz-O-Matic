#import "builder.typ" as builder


#let generate-exercise(
  exercise,
  shouldExcludeAnswers,
) = {
  import exercise.path as ex

  show <answer>: it => {
    if shouldExcludeAnswers { it }
    else { hide(it) }
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

#let generate-answers(
  exercise,
) = {
  import exercise.path as ex

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

  heading(
    level: 1,

    ex.generate-title(
      seed: exercise.seed,
      level: exercise.level,
      length: exercise.length,
    )
  )

  block({

    // Shrink input boxes.
    show box.where(label: <input-body>): it => [
      #box(
        width: auto,
        stroke: it.stroke,
        inset: it.inset,
        it.body
      )
    ]

    let inputs = filterInputs(
      ex.generate(
        seed: exercise.seed,
        level: exercise.level,
        length: exercise.length,
      )
    )

    inputs
      .map(i => box(i))
      .join(box(width: 6pt))
  })
}