#import "../../utils.typ": *


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
      bottom: 1pt + options.primary-color,
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
      top: 1pt + options.primary-color,
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

#let cover(
  options,
  length,
  title,
  subtitle,
  date,
) = {
  block(
    width: 100%,
    inset: (
      top: 6pt,
      bottom: 32pt,
    ),
    stroke: (
      top: 1pt + options.primary-color,
      bottom: 1pt + options.primary-color,
    ),

    [
      #block[
        #set text(
          weight: "bold",
        )

        #date
        #h(1fr)
        #length minutes
      ]

      #set align(center)

      #v(12pt)
      #block(text(
        size: 32pt,
        weight: "extrabold",
        fill: options.primary-color,
        title
      ))

      #block(text(
        size: 20pt,
        weight: "light",
        fill: options.secondary-color,
        subtitle
      ))
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
  set text(fill: green)

  [ #body <answer> ]
}

#let input(
  options,
  points,
  label,
  expected,
) = [
  #block(label) <input-label>

  #grid(
    columns: (auto, auto, auto),
    gutter: 2pt,
    align: top,

    box(
      fill: black,
      stroke: (
        paint: black,
        thickness: 2pt,
      ),
      inset: (
        top: 4pt,
        bottom: 4pt,
        left: 4pt,
        right: 4pt,
      ),

      text(
        fill: white, 
        size: 10pt,
        [\##context state-index.get()]
      )
    ),

    [
      #box(
        width: 100%,
        stroke: (
          paint: black,
          thickness: 2pt,
        ),
        inset: (
          top: 12pt,
          bottom: 12pt,
          left: 12pt,
          right: 12pt,
        ),

        {
          answer(options, expected)
        }
      ) <input-body>
    ],

    box(
      fill: black,
      stroke: (
        paint: black,
        thickness: 2pt,
      ),
      inset: (
        top: 4pt,
        bottom: 4pt,
        left: 4pt,
        right: 4pt,
      ),

      text(
        fill: white, 
        size: 10pt,
        [\/#points]
      )
    ),

    context state-index.update(x => x + 1)

  ) <input>
]

#let input-inline(
  options,
  points,
  label,
  expected,
) = [
  #let body = [
    #label <input-label>
    #box(inset: (left: 3pt, right: 3pt), answer(options, expected)) <input-body>
  ]
  // ← No spacing to avoid new block.
  #box(
    baseline: 11pt,
    inset: (
      top: 2pt,
      bottom: 8pt,
      //left: 2pt,
      //right: 2pt,
    ),

    [
      // Input counter.
      #place(
        dx: -1pt,
        dy: 13pt,
        bottom + left,

        box(
          fill: black,
          inset: 3pt,

          text(
            size: 10pt,
            fill: white,
            [\##context state-index.get()]
          )
        )
      )

      // Input score.
      #place(
        dx: 1pt,
        dy: 13pt,
        bottom + right,

        box(
          fill: black,
          inset: 3pt,

          text(
            size: 10pt,
            fill: white,
            [\/#points]
          )
        )
      )

      // Bounding box.
      #place(
        dx: 0pt,
        dy: 1pt,
        bottom + right,

        box(
          stroke: (
            paint: black,
            thickness: 2pt,
          ),
          inset: (
            top: 5pt,
            bottom: 5pt,
            left: 6pt,
            right: 6pt,
          ),
          hide(body)
        )
      )

      // Underlined input.
      #box(
        //stroke: (
        //  paint: black,
        //  thickness: 2pt,
        //),
        inset: (
          top: 3pt,
          bottom: 3pt,
          left: 6pt,
          right: 6pt,
        ),
        body
      )
    ]
  ) <input>
  //
  #context state-index.update(x => x + 1)
]

#let hint(
  options,
  body,
) = {
  block(
    stroke: options.secondary-color,
    width: 100%,
    inset: (
      top: 12pt,
      bottom: 12pt,
      left: 12pt,
      right: 12pt,
    ),

    {
      set text(fill: options.secondary-color)

      "💡"
      h(6pt)
      body
    }
  )
}


#let apply(
  options: none,
  title: "",
  length: "",
  body,
) = {
  // Load default options.
  let options = if options != none { options } else { toml("T_PLN.toml").defaults }

  // Parse colors.
  let options = (
    primary-color: rgb(options.primaryColor),
    secondary-color: rgb(options.secondaryColor),
  )

  set page(
    header: context {
      if counter(page).get().first() > 1 {
        header(options, title, length)
      }
    },
    footer: footer(options, title),
    margin: (
      top: 50pt,
      bottom: 50pt,
      left: 40pt,
      right: 40pt,
    ),
  )

  show heading.where(level: 1): set heading(numbering: "I.")
  show heading.where(level: 1): it => {
    set text(
      size: 22pt,
      fill: options.primary-color,
    )

    v(0.6em)
    it
    v(0.6em)
  }

  show heading.where(level: 2): set heading(numbering: "1.1 |")
  show heading.where(level: 2): it => {
    set text(
      size: 14pt,
      fill: options.primary-color,
    )

    v(0.2em)
    it
    v(0.6em)
  }

  set text(size: 12pt)

  show emph: it => {
    text(
      fill: options.secondary-color,
      weight: "semibold",
      it.body,
    )
  }

  show figure.caption: it => [
    #text(weight: "semibold", it.body)
  ]

  set list(marker: ([▪], [•], [--]))

  show <q-cover>: it => {
    let length = it.children.at(0).body
    let title = it.children.at(1).body
    let subtitle = it.children.at(2).body
    let date = it.children.at(3).body
    cover(options, length, title, subtitle, date)
  }

  show <q-exercise>: it => {
    let points = int(content-to-string(it.children.at(0).body))
    let title = it.children.at(1).body
    let body = it.children.at(2).body
    exercise(options, points, title, body)
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
    input-inline(options, points, label, expected)
  }

  show <q-hint>: it => {
    let body = it.children.at(0).body
    hint(options, body)
  }

  body
}


// Preview.
#let preview() = {
  import "../../demo/dummy-quiz.typ" as dummy

  let metadata = toml("T_PLN.toml")

  show: apply.with(
    options: metadata.defaults,
    title: "Preview",
    length: 20,
  )

  dummy.generate()
}

// Keep commented to avoid breaking imports.
//#preview()
