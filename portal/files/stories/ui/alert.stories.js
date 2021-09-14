import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { action as sbAction } from '@storybook/addon-actions';

export default {
  title: 'UI/Alerts',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'primary', 'secondary', 'gray'],
      description: 'The style/color of the alert',
      table: { defaultValue: { summary: 'gray' } },
    },
    title: {
      control: 'text',
      description: 'Add a title to an alert',
      table: { defaultValue: { summary: null } },
    },
    body: {
      control: 'text',
      description: 'The main text content of the Alert',
      table: { defaultValue: { summary: null } },
    },
    button: {
      control: 'text',
      description: 'Text for the action button ',
      table: { defaultValue: { summary: null } },
    },
    action: {
      control: 'object',
      description: 'Action to call on button tap',
      table: { defaultValue: { summary: null } },
    },
  },
};

const SimpleTemplate = (args) => ({
  template: hbs`<Ui::Alert @type={{this.type}} @body={{this.body}} @loading={{this.loading}}/>`,
  context: args,
});

export const Simple = SimpleTemplate.bind({});

Simple.args = {
  loading: false,
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  type: 'success',
};

Simple.parameters = {
  layout: 'padded',
};

const TitleTemplate = (args) => ({
  template: hbs`<Ui::Alert @type={{this.type}} @title={{this.title}} @body={{this.body}} @loading={{this.loading}}/>`,
  context: args,
});

export const Title = TitleTemplate.bind({});

Title.args = {
  loading: false,
  title: 'Hear ye, Hear ye',
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  type: 'success',
};

Title.parameters = {
  layout: 'padded',
};

const ButtonTemplate = (args) => ({
  template: hbs`<Ui::Alert 
    @type={{this.type}} 
    @title={{this.title}} 
    @body={{this.body}} 
    @button={{this.button}} 
    @onButtonClick={{this.action}}
    @loading={{this.loading}}
  />`,
  context: args,
});

export const Button = ButtonTemplate.bind({});

Button.args = {
  loading: false,
  title: 'Hear ye, Hear ye',
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  type: 'success',
  button: 'clear',
  action: action(sbAction('onButtonClick')),
};

Button.parameters = {
  layout: 'padded',
};
