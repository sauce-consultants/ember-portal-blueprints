import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Button Groups',
  decorators: [],
  argTypes: {
    style: {
      control: 'select',
      options: ['centered', 'left', 'right'],
      description: 'The style of the button',
      table: { defaultValue: { summary: 'primary' } },
    },
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
  },
};

const SingleTemplate = (args) => ({
  template: hbs`
    <Ui::ButtonGroup 
        @style={{this.style}}
        @loading={{this.loading}}
        class="bg-gray-100 dark:bg-gray-900 p-4"
    as |group|
    >

        <group.Button>Go back to dashboard</group.Button>

    </Ui::ButtonGroup>`,
  context: args,
});

const Template = (args) => ({
  template: hbs`
    <Ui::ButtonGroup 
        @style={{this.style}}
        @loading={{this.loading}}
        class="bg-gray-100 dark:bg-gray-900 p-4"
    as |group|
    >

      <group.Button @color="red">Deactivate</group.Button>
      <group.Button @color="gray">Cancel</group.Button>

    </Ui::ButtonGroup>`,
  context: args,
});

export const SingleCentered = SingleTemplate.bind({});

SingleCentered.args = {
  loading: false,
  style: 'centered',
};

// SingleCentered.parameters = {
//   layout: 'centered',
// };

export const Centered = Template.bind({});

Centered.args = {
  loading: false,
  style: 'centered',
};

// Centered.parameters = {
//   layout: 'centered',
// };

export const Left = Template.bind({});

Left.args = {
  loading: false,
  style: 'left',
};

// Left.parameters = {
//   layout: 'centered',
// };

export const Right = Template.bind({});

Right.args = {
  loading: false,
  style: 'right',
};

// Right.parameters = {
//   layout: 'centered',
// };
