#let state-index = state("exercise-index", 1)


#let header(
  title,
  length,
) = {
  set text(weight: "bold")

  block(
    width: 100%,
    height: 100%,
    inset: 6pt,
    stroke: (
      bottom: 1pt + black,
    ),

    [
      #title
      #h(1fr)
      #length minutes
    ]
  )
}

#let footer(
  title,
) = {
  set text(weight: "bold")

  block(
    width: 100%,
    height: 100%,
    inset: 6pt,
    stroke: (
      top: 1pt + black,
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
  length: "",
  title: "",
  subtitle: "",
  date: "",
  body,
) = {
  set page(
    header: context {
      if counter(page).get().first() > 1 {
        header(title, length)
      }
    },
    footer: footer(title),
  )

  block(
    width: 100%,
    inset: (
      top: 6pt,
      bottom: 32pt,
    ),
    stroke: (
      top: 1pt + black,
      bottom: 1pt + black,
    ),

    [
      #block[
        #set text(weight: "bold")

        #date
        #h(1fr)
        #length minutes
      ]

      #set align(center)

      #v(12pt)
      #block(text(
        size: 32pt,
        weight: "extrabold",
        fill: black,
        title
      ))

      #block(text(
        size: 20pt,
        weight: "light",
        fill: black,
        subtitle
      ))
    ]
  )

  body
}

#let apply(
  options: none,
  body,
) = {
  // Allow empty options exclusively for this default theme.
  let options = if options != none { options }
    else { toml("T_PLN.toml").defaults }

  let primary-color = rgb(options.primaryColor)
  let secondary-color = rgb(options.secondaryColor)

  set page(
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
      fill: primary-color,
    )

    v(0.6em)
    it
    v(0.6em)
  }

  show heading.where(level: 2): set heading(numbering: "1.1 |")
  show heading.where(level: 2): it => {
    set text(
      size: 14pt,
      fill: primary-color,
    )

    v(0.2em)
    it
    v(0.6em)
  }

  set text(size: 12pt)

  show emph: it => {
    text(
      fill: secondary-color,
      weight: "semibold",
      it.body,
    )
  }

  body
}

#let exercise(
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
  body,
) = {
  set text(fill: green)

  [ #body <answer> ]
}

#let input(
  points,
  label,
  expected,
) = [
  #block(label) <label>

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
          answer(expected)
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
  points,
  label,
  expected,
) = [
  #box(
    baseline: 12pt,
    inset: (
      top: 2pt,
      bottom: 8pt,
      //left: 2pt,
      //right: 2pt,
    ),
    [
      // Input counter.
      #place(
        dx: 0pt,
        dy: 12pt,
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
        dx: 0pt,
        dy: 12pt,
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

      // Underlined input.
      #box(
        stroke: (
          bottom: (
            paint: black,
            thickness: 2pt,
          ),
        ),
        inset: (
          //top: 2pt,
          bottom: 5pt,
          left: 4pt,
          right: 8pt,
        ),
        [
          #(text(label)) <label> <t-label>
          #box(inset: (left: 3pt, right: 3pt), answer(expected)) <input-body>
        ]
      )
    ]
  ) <input>
  #context state-index.update(x => x + 1)
]

#let hint(
  body,
) = {
  block(
    stroke: orange,
    width: 100%,
    inset: (
      top: 12pt,
      bottom: 12pt,
      left: 12pt,
      right: 12pt,
    ),

    {
      set text(fill: orange)

      "💡"
      h(6pt)
      body
    }
  )
}


// Preview.
#let preview() = {
  import "../../demo/dummy-quiz.typ" as dummy

  let metadata = toml("T_PLN.toml")

  show: apply.with(
    options: metadata.defaults,
  )

  dummy.generate((
    cover: cover,
    exercise: exercise,
    input: input,
    input-inline: input-inline,
    hint: hint,
  ))
}

// Keep commented to avoid breaking imports.
//#preview()
