import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { action as sbAction } from '@storybook/addon-actions';

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

export default {
  title: 'UI/Buttons',
  decorators: [],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text for the button ',
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
      options: ['primary', 'secondary', 'border', 'text'],
      description: 'The style of the button',
      table: { defaultValue: { summary: 'primary' } },
    },
    leadingIcon: {
      control: 'text',
      description: 'SVG path for a leading icon',
      table: { defaultValue: { summary: null } },
    },
    trailingIcon: {
      control: 'text',
      description: 'SVG path for a trailing icon',
      table: { defaultValue: { summary: null } },
    },
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    disabled: {
      control: 'boolean',
      description: 'Toggle the disabled state',
      table: { defaultValue: { summary: false } },
    },
    busy: {
      control: 'boolean',
      description: 'Manually toggle the buttons busy state',
      table: { defaultValue: { summary: false } },
    },
    task: {
      control: 'object',
      description:
        'Pass the archive task, this will be triggered on tap and the busy state set when running',
      table: { defaultValue: { summary: null } },
    },
    action: {
      control: 'object',
      description: 'Action to call on button tap',
      table: { defaultValue: { summary: null } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Ui::Button 
      @color={{this.color}}
      @size={{this.size}} 
      @style={{this.style}}
      @leadingIcon={{this.leadingIcon}}
      @trailingIcon={{this.trailingIcon}}
      @loading={{this.loading}}
      @disabled={{this.disabled}}
      @busy={{this.busy}}
      title="If you are expecting truncation - remember to add a title"
    >{{this.text}}</Ui::Button>`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  loading: false,
  text: 'Button Text',
  color: 'primary',
  size: 'md',
  style: 'primary',
  disabled: false,
  busy: false,
  action: action(sbAction('onButtonClick')),
};

Default.parameters = {
  layout: 'padded',
};

export const Truncated = Template.bind({});

Truncated.args = {
  loading: false,
  text: 'This Buttons Text is too damn much so we must truncate it',
  color: 'primary',
  size: 'md',
  style: 'primary',
  disabled: false,
  busy: false,
  action: action(sbAction('onButtonClick')),
};

Truncated.parameters = {
  layout: 'padded',
};

export const LeadingIcon = Template.bind({});

LeadingIcon.args = {
  loading: false,
  text: 'Leading Icon Button',
  color: 'primary',
  size: 'md',
  style: 'primary',
  leadingIcon: 'mail',
  disabled: false,
  busy: false,
  action: action(sbAction('onButtonClick')),
};

LeadingIcon.parameters = {
  layout: 'padded',
};

export const TrailingIcon = Template.bind({});

TrailingIcon.args = {
  loading: false,
  text: 'Trailing Icon Button',
  color: 'primary',
  size: 'md',
  style: 'primary',
  trailingIcon: 'mail',
  disabled: false,
  busy: false,
  action: action(sbAction('onButtonClick')),
};

TrailingIcon.parameters = {
  layout: 'padded',
};

const GroupTemplate = (args) => ({
  template: hbs`
  <div class="flex flex-col space-y-2">
    {{#each this.colorOptions as |color|}}
      <Ui::Button 
        @color={{color}}
        @size={{this.size}} 
        @style={{this.style}}
        @leadingIcon={{this.leadingIcon}}
        @trailingIcon={{this.trailingIcon}}
        @loading={{this.loading}}
        @disabled={{this.disabled}}
        @busy={{this.busy}}
      >{{this.text}}</Ui::Button>
    {{/each}}
  </div>`,
  context: args,
});

export const Primary = GroupTemplate.bind({});

Primary.args = {
  loading: false,
  text: 'Primary Button Text',
  colorOptions: colorOptions,
  size: 'md',
  style: 'primary',
  disabled: false,
  busy: false,
  action: action(sbAction('onButtonClick')),
};

Primary.parameters = {
  layout: 'centered',
};

export const Secondary = GroupTemplate.bind({});

Secondary.args = {
  loading: false,
  text: 'Secondary Button Text',
  colorOptions: colorOptions,
  size: 'md',
  style: 'secondary',
  disabled: false,
  busy: false,
  action: action(sbAction('onButtonClick')),
};

Secondary.parameters = {
  layout: 'centered',
};

export const Border = GroupTemplate.bind({});

Border.args = {
  loading: false,
  text: 'Border Button Text',
  colorOptions: colorOptions,
  size: 'md',
  style: 'border',
  disabled: false,
  busy: false,
  action: action(sbAction('onButtonClick')),
};

Border.parameters = {
  layout: 'centered',
};

export const Text = GroupTemplate.bind({});

Text.args = {
  loading: false,
  text: 'Text Button Text',
  colorOptions: colorOptions,
  size: 'md',
  style: 'text',
  disabled: false,
  busy: false,
  action: action(sbAction('onButtonClick')),
};

Text.parameters = {
  layout: 'centered',
};
