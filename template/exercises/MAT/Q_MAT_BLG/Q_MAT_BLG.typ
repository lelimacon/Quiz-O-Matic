#import "../../../builder.typ" as builder
#import "../../../entities.typ"
#import "../../../constants.typ": *
#import "../../../random.typ": *
#import "../../../utils.typ": *

#import "@preview/cetz:0.2.2" as cetz


#let compare(a, b) = if a == b { 0 } else if a > b { 1 } else { -1 }
#let array-max(array) = array.fold(array.at(0), (a, b) => calc.max(a, b))

#let days = (
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
)

#let evolution-adjective = (
  "increasing", // -1
  "stagnant", //  0
  "decreasing", // +1
)

#let evolution-past = (
  "increased", // -1
  "plateaued", //  0
  "decreased", // +1
)


#let generate-title(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let person = none
  (random, person) = pick(random, entities.persons)
  let (random, object) = pick(random, entities.objects.filter(o => o.size == "s"))

  let sex = if (person.sex == "m") { "Boy" } else { "Girl" }

  let (random, title) = pick(random, (
    [#f(person)'s side hustle],
    [#f(person)'s #f(object, n: 2)],
    [#f(person) the collector],
    [#sex sells #f(object, n: 2)],
  ))

  return title
}


// Structure:
// - 1 list item per point
#let generate(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let (random, person) = pick(random, entities.persons)
  let (random, object) = pick(random, entities.objects.filter(o => o.size == "s"))

  let (random, statement) = pick(random, (
    par[
      #f-ve(person) dreams of becoming a
      successful salesman like #possessive(person) father.
      As training grounds, #subject(person) sells #f-ve(object, n: 2)
      to his schoolmates at #possessive(person) school during recess.

      The broken line graph on the right shows the number
      of #f-v(object, n: 2) sold last week.
      #f-ve(person)'s school is closed on the weekends so he didn't sell any.

      Complete the statements below with the information from the graph.
    ],
  ))

  // Grid vertical divisions.
  let (random, y-tick-step) = integer(random, 2, 5)
  let (random, y-minor-tick-step) = integer(random, 2, 6)
  let y-tick-step = y-tick-step * y-minor-tick-step

  let (random, day1) = integer(random, 0, 10)
  let (random, day2) = integer(random, 0, 10)
  let (random, day3) = integer(random, 0, 10)
  let (random, day4) = integer(random, 0, 10)
  let (random, day5) = integer(random, 0, 10)

  let data = (
    //(0, 0),
    (1, day1 * y-minor-tick-step),
    (2, day2 * y-minor-tick-step),
    (3, day3 * y-minor-tick-step),
    (4, day4 * y-minor-tick-step),
    (5, day5 * y-minor-tick-step),
    //(6, 0),
  )
  let values = data.map(o => o.at(1))

  //let max-value = array-max(values)
  let max = data.fold(data.at(0), (a, b) => if (a.at(1) > b.at(1)) { a } else { b })
  let max-day = max.at(0)
  let max-value = max.at(1)

  let min = data.fold(data.at(0), (a, b) => if (a.at(1) < b.at(1)) { a } else { b })
  let min-day = min.at(0)
  let min-value = min.at(1)

  let sum = values.sum()
  let avg = sum / 5

  let question-count = length
  let (random, inputs) = sample(random, question-count, (
    [
      Each small division on the vertical axis represents
      #builder.input-inline(1, none, $#y-minor-tick-step$) #f-v(object, n: 2).
    ],
    [
      #f-v(person) sold the least #f-v(object, n: 2)
      on #builder.input-inline(0.5, none, [#days.at(min-day)]),
      #builder.input-inline(0.5, none, $#min-value$)
      were sold on that day.
    ],
    [
      #f-v(person)'s most successful day was
      on #builder.input-inline(0.5, none, [#days.at(max-day)]) where
      #builder.input-inline(0.5, none, $#max-value$)
      #f-v(object, n: 2) were sold.
    ],
    [
      #let evolution = evolution-past.at(compare(values.at(0), values.at(2)) + 1)
      The sales of #f-v(object, n: 2)
      #builder.input-inline(1, [↑↓], [#evolution])
      between Monday and Wednesday.
    ],
    [
      #let evolution = evolution-past.at(compare(values.at(1), values.at(3)) + 1)
      The sales of #f-v(object, n: 2)
      #builder.input-inline(1, [↑↓], [#evolution])
      between Tuesday and Thursday.
    ],
    [
      #let evolution = evolution-past.at(compare(values.at(2), values.at(4)) + 1)
      The sales of #f-v(object, n: 2)
      #builder.input-inline(1, [↑↓], [#evolution])
      between Wednesday and Friday.
    ],
    [
      #let evolution = evolution-adjective.at(compare(values.at(0), values.at(4)) + 1)
      The sales of #f-v(object, n: 2) last week was
      #builder.input-inline(1, [↑↓], [#evolution])
      on the whole.
    ],
    [
      #let difference = max-value - min-value
      #let first-day = calc.min(min-day, max-day)
      #let last-day = calc.max(min-day, max-day)
      The sales between #days.at(min-day) and #days.at(max-day)
      #if (first-day == min-day) { "increased" } else { "decreased" }
      by #builder.input-inline(1, [↑↓], $#difference$).
    ],
    [
      A total of #builder.input-inline(1, none, $#sum$)
      #f-v(object, n: 2) were sold last week.
    ],
    [
      An average of #builder.input-inline(1, none, $#avg$)
      #f-v(object, n: 2) were sold on school days last week.
    ],
    [
      #let target = calc.ceil(avg)
      #let days-index = range(5).filter(day-index => values.at(day-index) < target)
      If the target was to sell _$#target$_ #f-v(object, n: 2) every day,
      the target was not met for days
      #builder.input-inline(1, none, [#days-index.map(day-index => days.at(day-index + 1)).join(", ")]).
    ],
  ))

  let plot = cetz.plot.plot(
    size: (6, 3),
    //axis-style: none,
    //axis-style: "school-book",
    //axis-style: "left",
    axis-style: "scientific-auto",
    plot-style: (
      stroke: red,
    ),
    mark-style: (
      stroke: red,
      fill: white,
    ),

    x-min: 0,
    x-max: 6,
    x-label: "Day of the week",
    x-ticks: (
      (0, "Sun"),
      (1, "Mon"),
      (2, "Tue"),
      (3, "Wed"),
      (4, "Thu"),
      (5, "Fri"),
      (6, "Sat"),
    ),
    x-tick-step: none,
    x-grid: true,

    y-min: 0,
    y-max: max-value + 5,
    y-label: [#up(f(object, n: 2)) sold],
    y-tick-step: y-tick-step,
    y-minor-tick-step: y-minor-tick-step,
    y-grid: "both",

    {
      cetz.plot.add(
        //style: (stroke: black, fill: rgb(0, 0, 200, 75)),
        mark: "o",
        hypograph: true,
        epigraph: true,
        data
      )
    }
  )

  set figure.caption(position: top)
  let chart = figure(
    caption: [Sales of #f(object, n: 2) last week],
    cetz.canvas(plot),
  )

  grid(
    columns: (auto, auto),
    //columns: (50%, auto),
    gutter: 26pt,
    align: horizon,

    {
      statement
    },
    {
      chart
    },
  )

  v(1em)

  list(
    ..inputs
  )
}


// Preview.
#let preview() = {
  let seed = 42
  let level = level-grades.g6
  let length = lengths.quick

  import "../../../themes/T_PLN/T_PLN.typ" as theme
  //import "../../../themes/T_PDM/T_PDM.typ" as theme
  show: theme.apply

  builder.exercise(
    length,
    generate-title(seed: seed, level: level, length: length),
    generate(seed: seed, level: level, length: length),
  )
}

// Keep commented to avoid breaking imports.
//#preview()
