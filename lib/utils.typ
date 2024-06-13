#import "@preview/suiji:0.3.0"
#import "theme.typ": *


#let pick(rng, arr, count: 1) = {
  if (count == 1) {
    let index = none
    (rng, index) = suiji.integers(rng, high: arr.len())
    return (rng, arr.at(index))
  }
  else {
    let indices = none
    ((.., rng), indices) = suiji.integers(rng, high: arr.len(), size: count)
    return (rng, indices.map(i => arr.at(i)))
  }
}

#let f(
  // Show variable.
  variable: false,
  // Entity count.
  n: 1,
  // Show count or article.
  prefix: none, // "count" | "article"
  // Show emoji.
  emoji: false,
  entity,
) = {
    let s-main = ""
    let s-article = ""
    let s-emoji = ""

    if (entity.type == "person") {
      s-main = entity.name
    }
    else {
      if (prefix == "count") {
        s-main = [#n ]
      }
      else if (prefix == "article") {
        s-article = [#entity.article ]
      }

      if (n == 1) {
        s-main = s-main + entity.singular
      }
      else {
        s-main = s-main + entity.plural
      }
    }

    if (emoji) {
      s-emoji = [ #entity.emoji]
    }

    if (variable) {
      return {s-article;var({s-main;s-emoji})}
    }
    else {
      return {s-article;s-main;s-emoji}
    }
}

#let f-vae(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: "article", emoji: true, entity)

#let f-ae(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: "article", emoji: true, entity)

#let f-a(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: "article", emoji: false, entity)

#let f-va(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: "article", emoji: false, entity)

#let f-v(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: none, emoji: false, entity)

#let f-vce(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: "count", emoji: true, entity)

#let f-ce(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: "count", emoji: true, entity)

#let f-c(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: "count", emoji: false, entity)

#let f-vc(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: "count", emoji: false, entity)

#let f-e(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: none, emoji: true, entity)

#let f-ve(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: none, emoji: true, entity)

#let subject(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "M") { return "he" }
      else { return "she" }
    }
    else { return "the" }
}

#let object(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "M") { return "him" }
      else { return "her" }
    }
    else { return "its" }
}

#let possessive(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "M") { return "his" }
      else { return "her" }
    }
    else { return "its" }
}

#let independent-possessive(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "M") { return "his" }
      else { return "hers" }
    }
    else { return "its" }
}

#let reflexive(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "M") { return "himself" }
      else { return "herself" }
    }
    else { return "itself" }
}
