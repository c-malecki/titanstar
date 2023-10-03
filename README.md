# TitanStar Legends &#45; Rune Mastery Loadout Talent Calculator 9000

## Theory craft, build, and share your favorite TitanStar Legends loadouts fast and easy

D&D Beyond frontend developer challenge.

Check it out at [https://lucent-granita-fa4867.netlify.app/](https://lucent-granita-fa4867.netlify.app/)

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

The client application is built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/). Styling is achieved through the usage of plain ol' CSS with one exception being the images for Rune Talent Buttons. Inline styles are used as part of calculating the sprite sheet mapping for the Rune images. [react-router-dom](https://reactrouter.com/en/main),[Buffer](https://www.npmjs.com/package/buffer), and [zod](https://zod.dev/) are used to create easily sharable loadouts that are persisted through URLs.

#### Component Architecture

- `App.tsx` — Simply acts as the page container, applying the background image and constraining the app to the center of the view port and adjusting margins based on viewport sizing.
- `Calculator.tsx` — Where the TypeScript types, main application state, and functions for updating state live.
- `TalentPathGrid.tsx` — Controls the layout of the talent path UI, switches sprite sheet mapping for rune icons, and controls CSS classes based on stateful conditions.

#### Additional Feature

- Persistence of Loadout through URL — In the spirit of creating easy to share loadouts for the TitanStar Legends community, application state is serialized as a base64 string and added to the URL as a query parameter. This allows loadouts to be shared simply by copying and pasting links. When valid JSON is parsed from the deserialized base64 string AND the resulting JSON conforms to the valid `zod` schema for the application state, the app will be initialized with a predefined loadout.

### Difficulties I encountered

- Layout methods — I feel the design is very accurate to the mock up styling, but I consider the CSS to be very rigid and specific. This issue is mostly present around orienting the Spent Points UI to the right of the Talent Path UI. It is dependent on a fixed number of 4 Talents per Talent Path and 2 total Talent Paths. A shift to a vertical orientation happens at < 860px width. The “rigidity” results from using CSS grid column and row quantities/sizes based on this 4x2 specification with margins applied to the Points Counter to center it in the remaining right-side space.
- Button Border styles — It took a little time and playing around to get the correct half gradient styling for the button borders.
- H1 Title font — I'm not sure which font the "TitanStar Legends &#45; Rune Mastery Loadout Talent Calculator 9000" is using specifically, so I went with a 'Times New Roman' serif font to get the right letter shapes, but I know the lettering accenting is not accurate.

### Features or enhancements I would add

- Revisit and improve the layout CSS. I feel like there is a better method to achieve the desired grid-like effect for the Talent Buttons in a Talent Path, but add flexibility for additional Talents Buttons. This also applies to scaling the total number of Talent Paths. Additional Talent Paths would continue to stack vertically as rows of Talent Buttons on > 860px, but on a small screen where each Talent Path shifts to a column of Talent Buttons, additional Talent Paths would not cleanly stack as additional rows.
- There are a lot of CSS animation opportunities. I could see adding a border fill transition when the first Talent Button of a path is allocated. Something like a blue spark that starts center-left, travels counterclockwise, filling the border to the blue color, and ending with a pulse of the box shadowing before settling into the faint box shadow. When a subsequent Talent Button is allocated, the blue spark would travel across connecting path UI, from left to right, repeat the border fill animation on that Talent Button, and then animate the lighting up of the connecting path.
- Revisit the logic for serializing the application state as I'm sure there are some optimizations that can be made in the `useEffect` hook to stop the second rerender on initial load. I also pushed to add this in my time constraints since it felt like a worthy addition in the spirit of sharing theorycrafting amongst a community, but the if and when of updating the URL could possibly use more constraints since after the initialization, if points are added and then removed, returning to the base application state will still create a URL.
