import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { action as sbAction } from '@storybook/addon-actions';

export default {
  title: 'UI/Form/Radio',
  decorators: [],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the input',
      table: { defaultValue: { summary: null } },
    },
    checked: {
      control: 'boolean',
      description: 'Set the checked state',
      table: { defaultValue: { summary: null } },
    },
    selected: {
      control: 'string',
      description: 'Set the current value on radio lists',
      table: { defaultValue: { summary: null } },
    },
    placeholder: {
      control: 'text',
      description: 'Set the placeholder text of the input',
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
    invalid: {
      control: 'boolean',
      description: 'Toggle the invalid state',
      table: { defaultValue: { summary: false } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Ui::Form::Radio
      @name="foo"
      @checked={{this.checked}}
      @value={{this.value}}
      @placeholder={{this.placeholder}} 
      @loading={{this.loading}}
      @invalid={{this.invalid}}
      disabled={{this.disabled}}
      {{on "click" (fn this.toggle)}}
    />`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  value: 'foo',
  checked: true,
  placeholder: 'Toggle ',
  loading: false,
  disabled: false,
  invalid: false,
  toggle: action(sbAction('toggle')),
};

Default.parameters = { layout: 'centered' };

const options = [
  {
    label: 'Public access',
    value: 'public',
    tip: 'This project would be available to anyone who has the link.',
  },
  {
    label: 'Private to Project Members',
    value: 'members',
    tip: 'Only members of this project would be able to access.',
  },
  {
    label: 'Private to you',
    value: 'private',
    tip: 'You are the only one able to access this project.',
  },
];

const ListTemplate = (args) => ({
  template: hbs`
    <Ui::Form::RadioList 
      @loading={{this.loading}}
      @selected={{this.selected}}
      @name="foo"
      @onChange={{this.change}}
    as |list|>
      {{#each this.options as |option|}}
        <list.Item 
          @label={{option.label}} 
          @tip={{option.tip}} 
          @value={{option.value}}
        />
      {{/each}}
    </Ui::Form::RadioList>`,
  context: args,
});

export const List = ListTemplate.bind({});

List.args = {
  options: options,
  loading: false,
  selected: 'members',
  change: action(sbAction('change')),
};
List.parameters = {
  layout: 'padded',
};
