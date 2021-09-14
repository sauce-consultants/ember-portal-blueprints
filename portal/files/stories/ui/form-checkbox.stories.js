import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { action as sbAction } from '@storybook/addon-actions';

export default {
  title: 'UI/Form/Checkbox',
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
    <Ui::Form::Checkbox
      @checked={{this.checked}}
      @value={{this.value}}
      @placeholder={{this.placeholder}} 
      @loading={{this.loading}}
      @invalid={{this.invalid}}
      disabled={{this.disabled}}
      {{on "input" (fn this.toggle)}}
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
    label: 'Comments',
    tip: 'Get notified when someones posts a comment on a posting.',
    checked: false,
  },
  {
    label: 'Candidates',
    tip: 'Get notified when a candidate applies for a job.',
    checked: true,
  },
  {
    label: 'Offers',
    tip: 'Get notified when a candidate accepts or rejects an offer.',
    checked: false,
  },
];

const ListTemplate = (args) => ({
  template: hbs`
    <Ui::Form::CheckboxList @loading={{this.loading}} as |list|>
      {{#each this.options as |option|}}
        <list.Item @label={{option.label}} @tip={{option.tip}} @checked={{option.checked}}/>
      {{/each}}
    </Ui::Form::CheckboxList>`,
  context: args,
});

export const List = ListTemplate.bind({});

List.args = {
  options: options,
  loading: false,
};
List.parameters = {
  layout: 'padded',
};
