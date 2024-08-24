#import "utils.typ": *


#let state-index = state("exercise-index", 1)


#let header(
  options,
  title,
  length,
) = {
  set text(weight: "bold")

  block(
    width: 100%,
    height: 100%,
    inset: 6pt,
    stroke: (
      bottom: 1pt,
    ),

    [
      #title
      #h(1fr)
      #length minutes
    ]
  )
}

#let footer(
  options,
  title,
) = {
  set text(weight: "bold")

  block(
    width: 100%,
    height: 100%,
    inset: 6pt,
    stroke: (
      top: 1pt,
    ),

    [
      #title
      #h(1fr)
      #counter(page).display(
        "1/1",
        both: true,
      )
    ]
  )
}


#let exercise(
  options,
  points,
  title,
  body,
) = {
  heading(
    level: 1,
    [
      #title
      #h(1fr)
      \/#points
    ],
  )
  body
}

#let answer(
  options,
  body,
) = {
  body
}

#let input(
  options,
  points,
  label,
  expected,
) = [
  #box(
    width: auto,
    stroke: 1pt + gray,
    inset: 4pt,

    [
  #text(
    size: 10pt,
    [\##context state-index.get()]
  )
  #text(
    size: 10pt,
    [\/#points]
  )
    ]
  )
  #box(
    width: auto,
    stroke: 1pt + black,
    inset: 4pt,

    [
      #answer(options, expected)
    ]
  )
  #context state-index.update(x => x + 1)
]


#let apply(
  options: (),
  title: "",
  length: "",
  body,
) = {
  set page(
    margin: (
      top: 40pt,
      bottom: 40pt,
      left: 20pt,
      right: 20pt,
    ),
    header: header(options, title, length),
    footer: footer(options, title),
  )

  show heading.where(level: 1): set heading(numbering: "1.")
  show heading.where(level: 2): set heading(numbering: "1.1.")

  set text(size: 10pt)

  show emph: it => {
    text(
      weight: "semibold",
      it.body,
    )
  }

  let filter-inputs(
    content
  ) = {
    //return content.fields()
    //return (content,)
    //return type(content)

    if type(content) != "content" {
      //return (type(content),)
      //return "NOT"
      return ()
    }

    if content.has("label") {
      if content.label == <q-input> {
        return (content,)
      }
      if content.label == <q-input-inline> {
        return (content,)
      }
      return ()
    }

    if content.has("text") {
      if type(content.text) == "string" {
        return ()
      }
      return filter-inputs(content.text)
    }

    if content.has("body") {
      return filter-inputs(content.body)
        .flatten()
    }

    if content.has("children") {
      return content.children
        .map(item => filter-inputs(item))
        .flatten()
    }

    // styled().
    if content.has("child") {
      return filter-inputs(content.child)
        .flatten()
    }

    return ()
  }

  show <q-exercise>: it => {
    let points = int(content-to-string(it.children.at(0).body))
    let title = it.children.at(1).body
    let body = it.children.at(2).body

    let filtered-body = filter-inputs(body)
      .map(i => box(i))
      .join(box(width: 6pt))
    exercise(options, points, title, [#filtered-body])
  }

  show <q-answer>: it => {
    let body = it.children.at(0).body
    answer(options, body)
  }

  show <q-input>: it => {
    let points = float(content-to-string(it.children.at(0).body))
    let label = it.children.at(1).body
    let expected = it.children.at(2).body
    input(options, points, label, expected)
  }

  show <q-input-inline>: it => {
    let points = float(content-to-string(it.children.at(0).body))
    let label = it.children.at(1).body
    let expected = it.children.at(2).body
    input(options, points, label, expected)
  }

  show <q-hint>: it => {
    []
  }

  body
}


// Preview.
#let preview() = {
  import "demo/dummy-quiz.typ" as dummy

  show: apply

  dummy.generate()
}

// Keep commented to avoid breaking imports.
//#preview()
