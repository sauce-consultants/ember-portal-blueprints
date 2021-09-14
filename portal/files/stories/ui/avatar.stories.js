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

const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'];

const styleOptions = ['circular', 'rounded'];

export default {
  title: 'UI/Avatar',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    text: {
      control: 'text',
      description: 'Set for a text avatar',
      table: { defaultValue: { summary: null } },
    },
    src: {
      control: 'text',
      description: 'Set for an image avatar',
      table: { defaultValue: { summary: null } },
    },
    svg: {
      control: 'text',
      description: 'Set for an svg avatar',
      table: { defaultValue: { summary: null } },
    },
    alt: {
      control: 'text',
      description:
        'Define the alt text of the image and adds a tooltip title on hover',
      table: { defaultValue: { summary: null } },
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'The color of the button',
      table: { defaultValue: { summary: 'gray' } },
    },
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'The size of the button',
      table: { defaultValue: { summary: 'md' } },
    },
    style: {
      control: 'select',
      options: styleOptions,
      description: 'The style of the button',
      table: { defaultValue: { summary: 'circular' } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Ui::Avatar 
        @loading={{this.loading}}
        @text={{this.text}}
        @src={{this.src}}
        @svg={{this.svg}}
        @alt={{this.alt}}
        @color={{this.color}}
        @size={{this.size}}
        @style={{this.style}}
    />`,
  context: args,
});

export const Image = Template.bind({});

Image.args = {
  loading: false,
  src:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  alt: 'Jim Wardlaw',
  size: 'md',
  color: 'primary',
  style: 'circular',
};

Image.parameters = {
  layout: 'centered',
};

export const Icon = Template.bind({});

Icon.args = {
  loading: false,
  svg: 'cloud',
  alt: 'Jim Wardlaw',
  size: 'md',
  color: 'primary',
  style: 'circular',
};

Icon.parameters = {
  layout: 'centered',
};

export const Text = Template.bind({});

Text.args = {
  loading: false,
  text: 'JW',
  alt: 'Jim Wardlaw',
  size: 'md',
  color: 'primary',
  style: 'circular',
};

Text.parameters = {
  layout: 'centered',
};
