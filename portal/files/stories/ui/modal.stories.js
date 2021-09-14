import {hbs} from 'ember-cli-htmlbars';

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

export default {
  title: 'UI/Modal',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: {defaultValue: {summary: false}},
    },
    isShowing: {
      control: 'boolean',
      description: 'Toggle the modals visibility',
      table: {defaultValue: {summary: false}},
    },
    style: {
      control: 'select',
      options: ['centered', 'left', 'right'],
      description: 'The style of the modal',
      table: {defaultValue: {summary: 'top'}},
    },
    color: {
      control: 'select',
      options: colorOptions,
      description:
        'The color of the modal, sets the default button and icon colors',
      table: {defaultValue: {summary: 'gray'}},
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Ui::Modal 
      @name="export"
      @isShowing={{this.isShowing}}
    as |modal|
    >
      <modal.Body>

        <div class="h-64 w-full bg-gray-100 dark:bg-gray-900"></div>

      </modal.Body>

    </Ui::Modal>`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  loading: false,
  isShowing: true,
};

const SingleActionTemplate = (args) => ({
  template: hbs`
    <Ui::Modal 
      @name="export"
      @style={{this.style}}
      @isShowing={{this.isShowing}}
    as |modal|
    >
      <modal.Body as |body|>

        <body.Title>Payment successful</body.Title>
        <body.Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</body.Text>

      </modal.Body>

      <modal.Footer as |footer|>
        <footer.ButtonGroup as |group|>
          <group.Button @color="primary">Go back to dashboard</group.Button>
        </footer.ButtonGroup>
      </modal.Footer>
      
    </Ui::Modal>`,
  context: args,
});

export const SingleAction = SingleActionTemplate.bind({});

SingleAction.args = {
  loading: false,
  isShowing: true,
  style: 'centered',
  color: 'primary',
};

const ActionsTemplate = (args) => ({
  template: hbs`
    <Ui::Modal 
      @name={{this.style}}
      @style={{this.style}}
      @color={{this.color}}
      @isShowing={{this.isShowing}}
      @loading={{this.loading}}
    as |modal|
    >

      <modal.Body as |body|>
      
        <modal.Aside as |aside|>
          <aside.Icon @icon="check" />
        </modal.Aside>

        <body.Title>Payment successful</body.Title>
        <body.Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.</body.Text>

      </modal.Body>

      <modal.Footer class="bg-gray-50 dark:bg-gray-950" as |footer|>
        <footer.ButtonGroup as |group|>
          <group.Button>Deactivate</group.Button>
          <group.Button @color="gray" @style="border">Cancel</group.Button>
        </footer.ButtonGroup>
      </modal.Footer>
      
    </Ui::Modal>`,
  context: args,
});

export const CenteredActions = ActionsTemplate.bind({});

CenteredActions.args = {
  loading: false,
  style: 'centered',
  isShowing: true,

  color: 'primary',
};
export const LeftActions = ActionsTemplate.bind({});

LeftActions.args = {
  loading: false,
  style: 'left',
  isShowing: true,

  color: 'primary',
};
export const RightActions = ActionsTemplate.bind({});

RightActions.args = {
  loading: false,
  style: 'right',
  isShowing: true,

  color: 'primary',
};
