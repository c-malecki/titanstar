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

- Layout styling — Deciding how to break down the responsive layout responsibilities between elements and components. I feel the design is very accurate to the mock up styling, but I consider the CSS to be very rigid and specific. This issue is mostly present around orienting the Spent Points UI to the right of the Talent Path UI. It is dependent on a fixed number of 4 Talents per Talent Path. It changes to a vertical orientation at < 860px width, but this is also dependent on there being a fixed number of 2 Talent Paths total for a clean display. The “rigidity” results from using CSS grid column and row quantities and sizes based on this 4x2 specification with margins applied to the Points Counter to center it in the remaining right-side space.
- Button Border styles — It took a little time and playing around to get the correct half gradient styling for the button borders.
- H1 Title font — I'm not sure which font the "TitanStar Legends &#45; Rune Mastery Loadout Talent Calculator 9000" is using specifically, so I went with a 'Times New Roman' serif font to get the right letter shapes, but I know the lettering accenting is not accurate.

### Features or enhancements I would add

- Lots of CSS animation opportunities. Faint blue pulsating while hovering over talent that can be allocated. A border trace and fill animation when a point is allocated. For sequential talents, spark that travels across connecting branch UI and then does the trace and fill animation.
- Fix up container and responsive CSS to cleanly handle additional talent paths.
- In-app persistence for saving different load outs.
