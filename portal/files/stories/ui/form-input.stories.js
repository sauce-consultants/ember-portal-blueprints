import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Form/Input',
  decorators: [],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the input',
      table: { defaultValue: { summary: null } },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
      description: 'The input type of the input',
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
    <div class="max-w-sm w-screen">
      <Ui::Form::Input 
        @value={{this.value}} 
        @type={{this.type}} 
        disabled={{this.disabled}}
        placeholder={{this.placeholder}} 
        @loading={{this.loading}}
        @invalid={{this.invalid}}
        @leadingIcon={{this.leadingIcon}}
        @trailingIcon={{this.trailingIcon}}
      />
    </div>`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  value: 'Input Value',
  placeholder: 'Placeholder text',
  type: 'text',
  loading: false,
  disabled: false,
  invalid: false,
};

Default.parameters = { layout: 'centered' };

export const LeadingIcon = Template.bind({});

LeadingIcon.args = {
  value: '',
  placeholder: 'you@example.com',
  type: 'email',
  loading: false,
  disabled: false,
  invalid: false,
  leadingIcon: 'mail',
};

LeadingIcon.parameters = { layout: 'centered' };

export const TrailingIcon = Template.bind({});

TrailingIcon.args = {
  value: '',
  placeholder: '000-00-0000',
  type: 'number',
  loading: false,
  disabled: false,
  invalid: false,
  trailingIcon: 'question-mark-circle',
};

TrailingIcon.parameters = { layout: 'centered' };

/*



export const Checkbox = () => ({
  template: hbs`
  <div class="space-y-4">
    <div>
      <Ui::Form::Checkbox
        @value={{this.model.foo}}
        @placeholder="Toggle this"
        {{on "click" (fn this.toggle this.model "foo")}}
      />
    </div>
    <div>
      <Ui::Form::Checkbox
        @value={{this.model.bar}}
        @placeholder="Toggle this"
        {{on "click" (fn this.toggle this.model "bar")}}
      />
    </div>
  </div>
  `,
  context: {
    model: {
      foo: false,
      bar: true,
    },
    toggle: action(sbAction('toggle')),
  },
});

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

export const Dropdown = () => ({
  template: hbs`
  <div class="space-y-4">
    <Ui::Form::Dropdown
    @name="dropdown"
      @options={{this.options}}
      @selected={{this.selected}}
      @onChange={{this.onChange}}
      @placeholder="Select Option"
      @searchEnabled={{false}}
      as |option|
    >
      {{option.label}}
    </Ui::Form::Dropdown>
  </div>
  `,
  context: {
    options: ANIMAL_OPTIONS,
    selected: ANIMAL_OPTIONS[1],
    onChange: action(sbAction('onChange')),
  },
});

export const MultiDropdown = () => ({
  template: hbs`
  <div class="space-y-4">
    <Ui::Form::MultiDropdown
    @name="dropdown"
      @options={{this.options}}
      @selected={{this.selected}}
      @onChange={{this.onChange}}
      @placeholder="Select Option"
      @searchEnabled={{false}}
      as |option|
    >
      {{option.label}}
    </Ui::Form::MultiDropdown>
  </div>
  `,
  context: {
    options: ANIMAL_OPTIONS,
    selected: [ANIMAL_OPTIONS[0], ANIMAL_OPTIONS[3]],
    onChange: action(sbAction('onChange')),
  },
});

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
