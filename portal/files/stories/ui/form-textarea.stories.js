import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Form/Textarea',
  decorators: [],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the input',
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
    rows: {
      control: 'number',
      description: 'Number of lines of text',
      table: { defaultValue: { summary: null } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <div class="max-w-sm w-screen">
      <Ui::Form::Textarea 
        @value={{this.value}} 
        disabled={{this.disabled}}
        placeholder={{this.placeholder}} 
        rows={{this.rows}}
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
  value: 'Textarea Value',
  placeholder: 'Placeholder text',
  loading: false,
  disabled: false,
  invalid: false,
  rows: 5,
};

Default.parameters = { layout: 'centered' };

export const LeadingIcon = Template.bind({});

LeadingIcon.args = {
  value: 'Textarea Value',
  placeholder: 'Placeholder text',
  loading: false,
  disabled: false,
  invalid: false,
  rows: 5,
  leadingIcon: 'mail',
};

LeadingIcon.parameters = { layout: 'centered' };

export const TrailingIcon = Template.bind({});

TrailingIcon.args = {
  value: 'Textarea Value',
  placeholder: 'Placeholder text',
  loading: false,
  disabled: false,
  invalid: false,
  rows: 5,
  trailingIcon: 'question-mark-circle',
};

TrailingIcon.parameters = { layout: 'centered' };

/*

export const InputStates = () => ({
  template: hbs`
  <Ui::Form class="space-y-6 max-w-sm" @changeset={{this.changeset}} as |form|>

   <form.Control class="w-full" @name="activeFoo" as |control|>
      <control.Label @text="Active Input" />
      <control.Input @value={{this.changeset.activeFoo}} @type="text" placeholder="Enter text"/>
      <control.Helper @tip="This input is active, check out the focused state" />
    </form.Control>

    <form.Control class="w-full" @name="disabledFoo" as |control|>
      <control.Label @text="Disabled Input" />
      <control.Input @value={{this.changeset.disabledFoo}} @type="text" disabled={{true}} placeholder="Enter text"/>
      <control.Helper @tip="This input is disabled, you can not change it" />
    </form.Control>

    <form.Control class="w-full" @invalid={{true}} @name="errorFoo" as |control|>
      <control.Label @text="Error Input" />
      <control.Input @value={{this.changeset.errorFoo}} @type="text" placeholder="Enter text"/>
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
      activeFoo: '2021-02-01~2021-02-08',
      disabledFoo: '2021-02-01~2021-02-08',
      errorFoo: '2021-02-01~2021-02-08',
    },
  },
});

export const TextAreaStates = () => ({
  template: hbs`
  <Ui::Form class="space-y-6 max-w-sm" @changeset={{this.changeset}} as |form|>

   <form.Control class="w-full" @name="activeFoo" as |control|>
      <control.Label @text="Active Input" />
      <control.Textarea @value={{this.changeset.activeFoo}} @type="text" placeholder="Enter text"/>
      <control.Helper @tip="This input is active, check out the focused state" />
    </form.Control>

    <form.Control class="w-full" @name="disabledFoo" as |control|>
      <control.Label @text="Disabled Input" />
      <control.Textarea @value={{this.changeset.disabledFoo}} @type="text" disabled={{true}} placeholder="Enter text"/>
      <control.Helper @tip="This input is disabled, you can not change it" />
    </form.Control>

    <form.Control class="w-full" @invalid={{true}} @name="errorFoo" as |control|>
      <control.Label @text="Error Input" />
      <control.Textarea @value={{this.changeset.errorFoo}} @type="text" placeholder="Enter text"/>
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
