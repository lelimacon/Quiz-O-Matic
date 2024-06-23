module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = \_ -> Sub.none
    }


type alias Model =
  { seed : String
  }


init : () -> ( Model, Cmd Msg )
init _ =
  ( { seed = "42" }
  , Cmd.none
  )


type Msg
  = SeedChanged String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    SeedChanged seed ->
      ( { model | seed = seed }
      , Cmd.none
      )


getData : Model -> String
getData model = "subject;category;name;seed;level;length\nmathematics;arithmetics;sharing-is-caring;" ++ model.seed ++ ";5;10"

view : Model -> Html Msg
view model =
  div [ class "container" ]
    [ div [ class "aside" ]
      [ label [
        for "seed"
        ] [
          text "Seed"
        ]
      , input
        [ id "seed"
        , name "seed"
        , placeholder "Seed"
        , value model.seed
        , onInput SeedChanged
        ] []
    ]
    , div [ class "preview" ] [
      node "typst-view"
        [ attribute "data" (getData model) ]
        []
      ]
    ]
