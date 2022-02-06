import { css } from "styled-components";

//mobile first approach min-width
const screenSizes = {
    fullhd: 1408,
    widescreen: 1215,
    desktop: 1023,
    tablet: 768,
    mobile: 0
}
const Media = Object
    .keys(screenSizes)
    .reduce((acc, label) => {
        acc[label] = (...args) => css`
            @media (min-width: ${screenSizes[label] / 16}rem) {
                ${css(...args)}
            }
        `
        return acc
    }, {});

export default Media;
