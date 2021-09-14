// References:
// https://tailwindcss.com/course/locking-images-to-a-fixed-aspect-ratio/#app
// https://github.com/embermap/emberconf2020-tailwind-css-best-practices
import Component from "@glimmer/component";
import {
  htmlSafe
} from "@ember/string";

export default class AspectRatioComponent extends Component {
  get style() {
    let paddingBottom = this.args.ratio
      .split(":")
      .map(str => parseInt(str, 10))
      .reduce((prev, curr) => curr / prev);
    return htmlSafe(`padding-bottom: ${paddingBottom * 100}%`);
  }
}