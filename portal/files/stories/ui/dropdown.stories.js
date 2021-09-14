import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Dropdowns',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
  },
};

const ButtonTemplate = (args) => ({
  template: hbs`
    <Ui::Dropdown 
      @loading={{this.loading}}
    as |dropdown|
    >
      <dropdown.Button {{on "click" dropdown.toggle}}>Dropdown Menu</dropdown.Button>

      <dropdown.Menu as
        |menu|>
        <menu.Item @name="one" @text="Item One" />
        <menu.Item @name="two" @text="Item Two" />
        <menu.Item @name="three" @text="Item Three" />
      </dropdown.Menu>

    </Ui::Dropdown>
  `,
  context: args,
});

export const Button = ButtonTemplate.bind({});

Button.args = {
  loading: false,
};

Button.parameters = {
  layout: 'centered',
};

const IconTemplate = (args) => ({
  template: hbs`
  <Ui::Dropdown 
    @loading={{this.loading}}
  as |dropdown|>

    <dropdown.Icon {{on "click" dropdown.toggle}} />

    <dropdown.Menu as
      |menu|>
      <menu.Item @name="one" @text="Item One" />
      <menu.Item @name="two" @text="Item Two" />
      <menu.Item @name="three" @text="Item Three" />
    </dropdown.Menu>

  </Ui::Dropdown>
  `,
  context: args,
});

export const Icon = IconTemplate.bind({});

Icon.args = {
  loading: false,
};

Icon.parameters = {
  layout: 'centered',
};

const SortTempalte = () => ({
  template: hbs`
  <div class="w-64">
    <Ui::Dropdown @name="menu" as |dropdown|>

      <dropdown.Button 
        @trailingIcon="switch-vertical"
        {{on "click" dropdown.toggle}}
      >Sort Items</dropdown.Button>

      <dropdown.Menu as
        |menu|>
        <menu.Item @name="name" @text="Name" />
        <menu.Item @name="email" @text="Email" @trailingIcon="arrow-narrow-down" />
        <menu.Item @name="age" @text="Age" />
      </dropdown.Menu>
    </Ui::Dropdown>
  </div>
  `,
});

export const Sort = SortTempalte.bind({});

Sort.args = {
  loading: false,
};

Sort.parameters = {
  layout: 'centered',
};
