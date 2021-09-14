import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { action as sbAction } from '@storybook/addon-actions';

export default {
  title: 'UI/Form/Select',
  decorators: [],
  argTypes: {
    selected: {
      control: 'object',
      description: 'The selected option',
      table: { defaultValue: { summary: null } },
    },
    options: {
      control: 'array',
      description: 'An array of options to display',
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
    allowClear: {
      control: 'boolean',
      description: 'Allow the user to clear selection',
      table: { defaultValue: { summary: false } },
    },
    searchEnabled: {
      control: 'boolean',
      description: 'Allow the user search options',
      table: { defaultValue: { summary: false } },
    },
    searchField: {
      control: 'string',
      description: 'Define the option property to search on',
      table: { defaultValue: { summary: null } },
    },
    searchMessage: {
      control: 'string',
      description:
        'Message shown in options list when no search has been entered and there are no options.',
      table: { defaultValue: { summary: null } },
    },
    searchPlaceholder: {
      control: 'string',
      description: 'Placeholder of the search box',
      table: { defaultValue: { summary: null } },
    },
    search: {
      control: 'string',
      description: 'The search term to use',
      table: { defaultValue: { summary: null } },
    },
    loadingMessage: {
      control: 'string',
      description:
        'Message shown in the list of options while the options are not resolved',
      table: { defaultValue: { summary: null } },
    },
  },
};

const ANIMAL_OPTIONS = [
  {
    label: 'Cow',
    value: 'cow',
  },
  {
    label: 'Sheep',
    value: 'sheep',
  },
  {
    label: 'Cat',
    value: 'cat',
  },
  {
    label: 'Hen',
    value: 'hen',
  },
  {
    label: 'Goose',
    value: 'goose',
  },
];

const Template = (args) => ({
  template: hbs`
  <div class="max-w-sm w-screen">

    <Ui::Form::Dropdown
      @options={{this.options}}
      @selected={{this.selected}}
      @onChange={{this.onChange}}
      @renderInPlace={{true}}
      @placeholder={{this.placeholder}}
      @disabled={{this.disabled}}
      @loading={{this.loading}}
      @invalid={{this.invalid}}
      @allowClear={{this.allowClear}}
      @searchEnabled={{this.searchEnabled}}
      @searchField={{this.searchField}}
      @searchMessage={{this.searchMessage}}
      @searchPlaceholder={{this.searchPlaceholder}}
      @search={{this.search}}
      @loadingMessage={{this.loadingMessage}}
      as |option|
    >
      {{option.label}}
    </Ui::Form::Dropdown>

  </div>
  `,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Placeholder text',
  loading: false,
  disabled: false,
  invalid: false,
  options: ANIMAL_OPTIONS,
  selected: null, //ANIMAL_OPTIONS[1],
  onChange: action(sbAction('onChange')),
  allowClear: false,
  searchEnabled: true,
  searchField: 'label',
  searchMessage: null,
  searchPlaceholder: null,
  search: null,
  loadingMessage: null,
};

Default.parameters = { layout: 'centered' };

export const WithValue = Template.bind({});

WithValue.args = {
  placeholder: 'Placeholder text',
  loading: false,
  disabled: false,
  invalid: false,
  options: ANIMAL_OPTIONS,
  selected: ANIMAL_OPTIONS[1],
  onChange: action(sbAction('onChange')),
  allowClear: false,
  searchEnabled: true,
  searchField: 'label',
  searchMessage: null,
  searchPlaceholder: null,
  search: null,
  loadingMessage: null,
};

WithValue.parameters = { layout: 'centered' };

const MultiTemplate = (args) => ({
  template: hbs`
  <div class="max-w-sm w-screen">
    <Ui::Form::MultiDropdown
      @options={{this.options}}
      @selected={{this.selected}}
      @onChange={{this.onChange}}
      @renderInPlace={{true}}
      @placeholder={{this.placeholder}}
      @disabled={{this.disabled}}
      @loading={{this.loading}}
      @invalid={{this.invalid}}
      @allowClear={{this.allowClear}}
      @searchEnabled={{this.searchEnabled}}
      @searchField={{this.searchField}}
      @searchMessage={{this.searchMessage}}
      @searchPlaceholder={{this.searchPlaceholder}}
      @search={{this.search}}
      @loadingMessage={{this.loadingMessage}}
      as |option|
    >
      {{option.label}}
    </Ui::Form::MultiDropdown>
  </div>
  `,
  context: args,
});

export const Multi = MultiTemplate.bind({});

Multi.args = {
  placeholder: 'Placeholder text',
  loading: false,
  disabled: false,
  invalid: false,
  options: ANIMAL_OPTIONS,
  selected: null, //[ANIMAL_OPTIONS[1], ANIMAL_OPTIONS[2]],
  onChange: action(sbAction('onChange')),
  allowClear: false,
  searchEnabled: true,
  searchField: 'label',
  searchMessage: null,
  searchPlaceholder: null,
  search: null,
  loadingMessage: null,
};

Multi.parameters = { layout: 'centered' };

export const MultiWithValue = MultiTemplate.bind({});

MultiWithValue.args = {
  placeholder: 'Placeholder text',
  loading: false,
  disabled: false,
  invalid: false,
  options: ANIMAL_OPTIONS,
  selected: [ANIMAL_OPTIONS[1], ANIMAL_OPTIONS[2]],
  onChange: action(sbAction('onChange')),
  allowClear: false,
  searchEnabled: true,
  searchField: 'label',
  searchMessage: null,
  searchPlaceholder: null,
  search: null,
  loadingMessage: null,
};

MultiWithValue.parameters = { layout: 'centered' };

export const MultiWithAllValues = MultiTemplate.bind({});

MultiWithAllValues.args = {
  placeholder: 'Placeholder text',
  loading: false,
  disabled: false,
  invalid: false,
  options: ANIMAL_OPTIONS,
  selected: ANIMAL_OPTIONS,
  onChange: action(sbAction('onChange')),
  allowClear: false,
  searchEnabled: true,
  searchField: 'label',
  searchMessage: null,
  searchPlaceholder: null,
  search: null,
  loadingMessage: null,
};

MultiWithAllValues.parameters = { layout: 'centered' };

/*

export const Controls = () => ({
  template: hbs`
  <div class="space-y-4">
    <Ui::Form::Control
      @changeset={{this.changeset}}
      @name="foo"
      @isSubmitting={{this.form.isSubmitting}}
      @didSubmit={{this.form.didSubmit}}
      as
      |control|>
        <control.Label @text={{this.label}} />
        <control.Input @value={{this.changeset.value}}
          @type="text"
          placeholder={{this.placeholder}} />
        <control.Helper @tip={{this.tip}} />
      </Ui::Form::Control>
  </div>
  `,
  context: {
    label: text('Control', 'Label'),
    tip: text('Tip', 'Some text about this control'),
    placeholder: text('Placeholder', 'Enter Text'),
    changeset: {
      isInvalid: boolean('Invalid', false),
      value: '',
      error: {
        foo: {
          validation: [text('Validation Message', 'This is an error message')],
        },
      },
    },
    form: {
      isSubmitting: boolean('Form is submitting', false),
      didSubmit: boolean('Form did submit', false),
    },
  },
});
*/

/*
export const DateRangeStates = () => ({
  template: hbs`
  <Ui::Form class="space-y-6 max-w-sm" @changeset={{this.changeset}} as |form|>

   <form.Control class="w-full" @name="activeFoo" as |control|>
      <control.Label @text="Active Input" />
      <control.DateRange 
        @value={{this.changeset.activeFoo}} 
        @type="text" 
        placeholder="Enter text"
      />
      <control.Helper @tip="This input is active, check out the focused state" />
    </form.Control>

    <form.Control class="w-full" @name="disabledFoo" as |control|>
      <control.Label @text="Disabled Input" />
      <control.DateRange 
        @value={{this.changeset.disabledFoo}} 
        @type="text" 
        disabled={{true}} placeholder="Enter text"
      />
      <control.Helper @tip="This input is disabled, you can not change it" />
    </form.Control>

    <form.Control class="w-full" @invalid={{true}} @name="errorFoo" as |control|>
      <control.Label @text="Error Input" />
      <control.DateRange 
        @value={{this.changeset.errorFoo}} 
        @type="text" 
        placeholder="Enter text"
      />
      <control.Helper @tip="This input is has an error" />
    </form.Control>

  </Ui::Form>
    `,
  context: {
    changeset: {
      isInvalid: true,
      error: {
        errorFoo: {
          validation: ['Here be an error message'],
        },
      },
      activeFoo: '',
      disabledFoo: 'Hammer time',
      errorFoo: 'Bad data man',
    },
  },
});
*/
