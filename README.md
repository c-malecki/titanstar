# TitanStar Legends &#45; Rune Mastery Loadout Talent Calculator 9000

## Theory craft, build, and share your favorite TitanStar Legends loadouts fast and easy

Some blurb

Check it out at someNetlifyDeploymentLink

### To Run Locally

#### Prequisites

- [Node.js](https://nodejs.org/en/download/current)

#### Clone Git Repository

```
git clone https://github.com/c-malecki/titanstar.git
```

#### Launch Client Application

```
cd titanstar
npm i
npm run dev
```

### Tech Spec

The client application is built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/). Styling is implemented with plain ol' CSS with the exception of calculating sprite sheet mapping. No additional libraries are used.

#### Component Architecture

- `App.tsx` — Simply acts as the page container, applying the background image and constraining the app to the center of the view port and adjusting margins based on viewport sizing.
- `Calculator.tsx` — Where the TypeScript types, main application state, and functions for updating state live.
- `TalentPathGrid.tsx` — Controls the layout of the talent path UI, switches sprite sheet mapping for talent icons, and controls CSS classes based on stateful conditions.

### Difficulties I encountered

- Layout methods — I feel the design is very accurate to the mock up styling, but I consider the CSS to be very rigid and specific. This issue is mostly present around orienting the Spent Points UI to the right of the Talent Path UI. It is dependent on a fixed number of 4 Talents per Talent Path and 2 total Talent Paths. A shift to a vertical orientation happens at < 860px width. The “rigidity” results from using CSS grid column and row quantities/sizes based on this 4x2 specification with margins applied to the Points Counter to center it in the remaining right-side space.
- Button Border styles — It took a little time and playing around to get the correct half gradient styling for the button borders.
- H1 Title font — I'm not sure which font the "TitanStar Legends &#45; Rune Mastery Loadout Talent Calculator 9000" is using specifically, so I went with a 'Times New Roman' serif font to get the right letter shapes, but I know the lettering accenting is not accurate.

### Features or enhancements I would add

- I would revisit and improve the layout CSS. I feel like there is a better method to achieve the desired grid-like effect for the Talent Buttons in a Talent Path, but add flexibility for additional Talents Buttons. This also applies to scaling the total number of Talent Paths. Additional Talent Paths would continue to stack vertically as rows of Talent Buttons on > 860px, but on a small screen where each Talent Path shifts to a column of Talent Buttons, additional Talent Paths would not cleanly stack as additional rows.
- There are a lot of CSS animation opportunities. I could see adding a border fill transition when the first Talent Button of a path is allocated. Something like a blue spark that starts center-left, travels counterclockwise, filling the border to the blue color, and ending with a pulse of the box shadowing before settling into the faint box shadow. When a subsequent Talent Button is allocated, the blue spark would travel across connecting path UI, from left to right, repeat the border fill animation on that Talent Button, and then animate the lighting up of the connecting path.
- Persistence of load outs and easy sharing. Something I was starting to mess with was serializing the application state as a base64 string and using it with `react-router-dom` to change the URL to contain query parameters of the encoded application state. This would allow a user to share a link that has a load out's data embedded as query parameters. When another user clicks that link, the app would initialize that embedded state. I actually got that park working in feature a branch (github link), but schema validation using something like `zod` would need to be added to ensure the application isn't broken by adding arbitrary values to the query parameters in the URL. Persistence in naming and storing load outs could be done either via local storage or with a database so that a user doesn't have to save a bunch of links externally to come back to a certain build.
