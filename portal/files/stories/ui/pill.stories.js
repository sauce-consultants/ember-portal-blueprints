import { hbs } from 'ember-cli-htmlbars';

const colorOptions = [
  'white',
  'gray',
  'black',
  'primary',
  'accent',
  'success',
  'warning',
  'danger',
  'red',
];

export default {
  title: 'UI/Pills',
  decorators: [],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text of the pill',
      table: { defaultValue: { summary: null } },
    },
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    style: {
      control: 'select',
      options: ['circular', 'rounded'],
      description: 'The style of the pill',
      table: { defaultValue: { summary: 'circular' } },
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'The size of the pill',
      table: { defaultValue: { summary: 'md' } },
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'The color of the pill',
      table: { defaultValue: { summary: 'gray' } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
      <Ui::Pill 
        @loading={{this.loading}}
        @style={{this.style}}
        @size={{this.size}}
        @color={{this.color}}
      >Primary</Ui::Pill>
    `,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  text: 'Badge',
  color: 'primary',
  size: 'md',
  style: 'circular',
  loading: false,
};

Default.parameters = {
  layout: 'centered',
};

const GroupTemplate = (args) => ({
  template: hbs`
  {{#each this.colorOptions as |color|}}
    <Ui::Pill 
      @loading={{this.loading}}
      @style={{this.style}}
      @size={{this.size}}
      @color={{color}}
    >{{color}}</Ui::Pill>
  {{/each}}  `,
  context: args,
});

export const Circular = GroupTemplate.bind({});

Circular.args = {
  colorOptions: colorOptions,
  size: 'md',
  style: 'circular',
  loading: false,
};

Circular.parameters = {
  layout: 'centered',
};

export const Rounded = GroupTemplate.bind({});

Rounded.args = {
  colorOptions: colorOptions,
  size: 'md',
  style: 'rounded',
  loading: false,
};

Rounded.parameters = {
  layout: 'centered',
};
