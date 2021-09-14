import {hbs} from 'ember-cli-htmlbars';

export default {
  title: 'Design/Tailwind',
  decorators: [],
};

const colors = [
    'primary',
    'accent',
    'success',
    'warning',
    'danger',
    'gray',
    'cool-gray',
    // Colors
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'purple',
    'pink',
  ],
  shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const ColorTemplate = (args) => ({
  template: hbs`
    <div class="w-full max-w-4xl">
      <div class="grid grid-cols-{{this.shades.length}} gap-1 text-left">
        {{#each this.shades as |shade|}}
          <div class="text-sm text-gray-800 dark:text-gray-200  text-center mb-2 {{if (eq shade 500) "font-bold" ""}}">{{shade}}</div>
        {{/each}}
      </div>

      {{#each this.colors as |color|}}

        <div class="grid grid-cols-{{this.shades.length}} gap-1">
          {{#each this.shades as |shade|}}
            <div class="bg-{{color}}-{{shade}} aspect-w-1 aspect-h-1 border border-black dark:border-white border-opacity-20 dark:border-opacity-20"></div>
          {{/each}}
        </div>

        <h2 class="uppercase text-gray-800 text-sm relative ml-2 mb-8 -mt-6">{{color}}</h2>

      {{/each}}

    </div>
    `,
  context: args,
});

export const Color = ColorTemplate.bind({});

Color.args = {
  colors: colors,
  shades: shades,
};

Color.parameters = {layout: 'padded'};

const TypeSizeTemplate = (args) => ({
  template: hbs`
    <div class="w-full max-w-4xl">
    
      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-5xl</div>
      <h1 class="text-5xl">Swiss 721 - 48px/48px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-4xl</div>
      <h1 class="text-4xl">Swiss 721 - 36px/40px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-3xl</div>
      <h1 class="text-3xl">Swiss 721 - 30px/36px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-2xl</div>
      <h1 class="text-2xl">Swiss 721 - 24px/32px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-xl</div>
      <h1 class="text-xl">Swiss 721 - 20px/28px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-lg</div>
      <h1 class="text-lg">Swiss 721 - 18px/28px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-base</div>
      <h1 class="text-base">Swiss 721 - 16px/24px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-sm</div>
      <h1 class="text-sm">Swiss 721 - 14px/20px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-xs</div>
      <h1 class="text-xs">Swiss 721 - 12px/16px</h1>


      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-5xl</div>
      <h1 class="font-serif text-5xl">Merriweather - 48px/48px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-4xl</div>
      <h1 class="font-serif text-4xl">Merriweather - 36px/40px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-3xl</div>
      <h1 class="font-serif text-3xl">Merriweather - 30px/36px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-2xl</div>
      <h1 class="font-serif text-2xl">Merriweather - 24px/32px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-xl</div>
      <h1 class="font-serif text-xl">Merriweather - 20px/28px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-lg</div>
      <h1 class="font-serif text-lg">Merriweather - 18px/28px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-base</div>
      <h1 class="font-serif text-base">Merriweather - 16px/24px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-sm</div>
      <h1 class="font-serif text-sm">Merriweather - 14px/20px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-xs</div>
      <h1 class="font-serif text-xs">Merriweather - 12px/16px</h1>


      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-5xl</div>
      <h1 class="font-display text-5xl">Oswald - 48px/48px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-4xl</div>
      <h1 class="font-display text-4xl">Oswald - 36px/40px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-3xl</div>
      <h1 class="font-display text-3xl">Oswald - 30px/36px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-2xl</div>
      <h1 class="font-display text-2xl">Oswald - 24px/32px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-xl</div>
      <h1 class="font-display text-xl">Oswald - 20px/28px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-lg</div>
      <h1 class="font-display text-lg">Oswald - 18px/28px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-base</div>
      <h1 class="font-display text-base">Oswald - 16px/24px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-sm</div>
      <h1 class="font-display text-sm">Oswald - 14px/20px</h1>

      <div class="uppercase text-sm mt-2 mb-4 text-gray-500">text-xs</div>
      <h1 class="font-display text-xs">Oswald - 12px/16px</h1>

    </div>
    `,
  context: args,
});

export const TypeSize = TypeSizeTemplate.bind({});

TypeSize.parameters = {layout: 'padded'};

const TypeWeightTemplate = (args) => ({
  template: hbs`
    <div class="w-full max-w-4xl">

      <div class="uppercase text-sm mt-4 mb-2 text-gray-500">font-light</div>
      <p class="font-lg font-light">The quick brown fox jumped over the lazy dog.</p>

      <div class="uppercase text-sm mt-4 mb-2 text-gray-500">font-normal</div>
      <p class="font-lg font-normal">The quick brown fox jumped over the lazy dog.</p>

      <div class="uppercase text-sm mt-4 mb-2 text-gray-500">font-bold</div>
      <p class="font-lg font-bold">The quick brown fox jumped over the lazy dog.</p>


    </div>
    `,
  context: args,
});

export const TypeWeight = TypeWeightTemplate.bind({});

TypeWeight.parameters = {layout: 'padded'};

const BorderRadiusTemplate = (args) => ({
  template: hbs`
    <div class="w-full max-w-4xl">

      <div class="grid grid-cols-5 gap-4 text-left">
        <div class="text-sm mb-2">rounded-sm</div>
        <div class="text-sm mb-2">rounded</div>
        <div class="text-sm mb-2">rounded-md</div>
        <div class="text-sm mb-2">rounded-lg</div>
        <div class="text-sm mb-2">rounded-full</div>
      </div>
      <div class="grid grid-cols-5 gap-4 text-left">
        <div class="bg-primary-600 aspect-w-1 aspect-h-1 rounded-sm ">
          <div class="text-white font-bold text-xl p-4 text-center">2px</div>
        </div>
        <div class="bg-primary-600 aspect-w-1 aspect-h-1 rounded ">
          <div class="text-white font-bold text-xl p-4 text-center">4px</div>
        </div>
        <div class="bg-primary-600 aspect-w-1 aspect-h-1 rounded-md ">
          <div class="text-white font-bold text-xl p-4 text-center">6px</div>
        </div>
        <div class="bg-primary-600 aspect-w-1 aspect-h-1 rounded-lg ">
          <div class="text-white font-bold text-xl p-4 text-center">8px</div>
        </div>
        <div class="bg-primary-600 aspect-w-1 aspect-h-1 rounded-full ">
          <div class="text-white font-bold text-xl p-4 text-center">9999px</div>
        </div>
      </div>

    </div>
    `,
  context: args,
});

export const BorderRadius = BorderRadiusTemplate.bind({});

BorderRadius.parameters = {layout: 'padded'};
