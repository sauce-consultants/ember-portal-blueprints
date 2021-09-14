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
  title: 'UI/Button Icons',
  decorators: [],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon svg path for the button',
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
      options: ['fill', 'empty'],
      description: 'The style of the button',
      table: { defaultValue: { summary: 'primary' } },
    },
    title: {
      control: 'text',
      description: 'Let the user know what the icon means!',
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
    <Ui::IconButton 
      @icon={{this.icon}}
      @color={{this.color}}
      @size={{this.size}} 
      @style={{this.style}}
      @loading={{this.loading}}
      @disabled={{this.disabled}}
      @busy={{this.busy}}
      @title={{this.title}}
    />`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  loading: false,
  icon: 'plus',
  color: 'primary',
  size: 'md',
  style: 'fill',
  disabled: false,
  busy: false,
  title: 'Read what this button does',
  action: action(sbAction('onButtonClick')),
};

Default.parameters = {
  layout: 'padded',
};

const GroupTemplate = (args) => ({
  template: hbs`
  <div class="flex flex-row space-x-2">
    {{#each this.colorOptions as |color|}}
      <Ui::IconButton 
        @icon={{this.icon}}
        @color={{color}}
        @size={{this.size}} 
        @style={{this.style}}
        @loading={{this.loading}}
        @disabled={{this.disabled}}
        @busy={{this.busy}}
        @title={{this.title}}
      />
    {{/each}}
  </div>`,
  context: args,
});

export const Filled = GroupTemplate.bind({});

Filled.args = {
  loading: false,
  icon: 'plus',
  color: 'primary',
  size: 'md',
  style: 'fill',
  disabled: false,
  busy: false,
  title: 'Read what this button does',
  action: action(sbAction('onButtonClick')),
  colorOptions: colorOptions,
};

Filled.parameters = {
  layout: 'centered',
};

export const Empty = GroupTemplate.bind({});

Empty.args = {
  loading: false,
  icon: 'plus',
  color: 'primary',
  size: 'md',
  style: 'empty',
  disabled: false,
  busy: false,
  title: 'Read what this button does',
  action: action(sbAction('onButtonClick')),
  colorOptions: colorOptions,
};

Empty.parameters = {
  layout: 'centered',
};
