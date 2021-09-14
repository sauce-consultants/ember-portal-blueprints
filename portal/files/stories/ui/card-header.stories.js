import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Card Headers',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    title: {
      control: 'text',
      description: 'Card title text',
      table: { defaultValue: { summary: null } },
    },
    description: {
      control: 'text',
      description: 'Card header description text',
      table: { defaultValue: { summary: null } },
    },
    button: {
      control: 'text',
      description: 'Text for the headers action button ',
      table: { defaultValue: { summary: null } },
    },
    action: {
      control: 'object',
      description: 'Action to call on action tap',
      table: { defaultValue: { summary: null } },
    },
    task: {
      control: 'object',
      description:
        'Pass a task in to triggigger on button tap and set busy state',
      table: { defaultValue: { summary: null } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Ui::Card @loading={{this.loading}} as |card|>

        <card.Header as |header|>
          <header.Title>{{this.title}}</header.Title>
        </card.Header>
      
        <card.Body class="prose dark:prose-light opacity-20">
            <Ui::Text::P @loading={{this.loading}}>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</Ui::Text::P>
            <Ui::Text::P @loading={{this.loading}}>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</Ui::Text::P>
        </card.Body>

    </Ui::Card>`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  loading: false,
  title: 'Simple Card Header',
};

Default.parameters = {
  layout: 'padded',
};

const WithActionTemplate = (args) => ({
  template: hbs`
    <Ui::Card @loading={{this.loading}} as |card|>

        <card.Header as |header|>
          <header.Cols as |cols|>

            <cols.Col @grow={{true}}>
              <header.Title>{{this.title}}</header.Title>
            </cols.Col>
            <cols.Col @shrink={{true}}>
              <header.Button>{{this.button}}</header.Button>
            </cols.Col>

          </header.Cols>
        </card.Header>
      
        <card.Body class="prose dark:prose-light opacity-20">
            <Ui::Text::P @loading={{this.loading}}>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</Ui::Text::P>
            <Ui::Text::P @loading={{this.loading}}>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</Ui::Text::P>
        </card.Body>

    </Ui::Card>`,
  context: args,
});

export const WithAction = WithActionTemplate.bind({});

WithAction.args = {
  loading: false,
  title: 'Card Header with Action',
  button: 'Create new job',
};

WithAction.parameters = {
  layout: 'padded',
};

const WithDescriptionTemplate = (args) => ({
  template: hbs`
    <Ui::Card @loading={{this.loading}} as |card|>

        <card.Header as |header|>
          <header.Title>{{this.title}}</header.Title>
          <header.Description>{{this.description}}</header.Description>
        </card.Header>
      
        <card.Body class="prose dark:prose-light opacity-20">
            <Ui::Text::P @loading={{this.loading}}>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</Ui::Text::P>
            <Ui::Text::P @loading={{this.loading}}>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</Ui::Text::P>
        </card.Body>

    </Ui::Card>`,
  context: args,
});

export const WithDescription = WithDescriptionTemplate.bind({});

WithDescription.args = {
  loading: false,
  title: 'Card Heading with Description',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.',
};

WithDescription.parameters = {
  layout: 'padded',
};

const WithAvatarAndDescriptionTemplate = (args) => ({
  template: hbs`
    <Ui::Card @loading={{this.loading}} as |card|>

        <card.Header as |header|>

          <header.Cols as |cols|>

            <cols.Col @shrink={{true}}>
              <header.Avatar
                @src={{this.avatar}}
                @alt="avatar name" />
            </cols.Col>

            <cols.Col @grow={{true}}>
              <header.Title>{{this.title}}</header.Title>
              <header.Description>{{this.description}}</header.Description>
            </cols.Col>

          </header.Cols>

        </card.Header>
      
        <card.Body class="prose dark:prose-light opacity-20">
            <Ui::Text::P @loading={{this.loading}}>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</Ui::Text::P>
            <Ui::Text::P @loading={{this.loading}}>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</Ui::Text::P>
        </card.Body>

    </Ui::Card>`,
  context: args,
});

export const WithAvatarAndDescription = WithAvatarAndDescriptionTemplate.bind(
  {}
);

WithAvatarAndDescription.args = {
  loading: false,
  title: 'Card Heading with Avatar',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

WithAvatarAndDescription.parameters = {
  layout: 'padded',
};

const WithAvatarAndActionsTemplate = (args) => ({
  template: hbs`
    <Ui::Card @loading={{this.loading}} as |card|>

        <card.Header as |header|>

          <header.Cols as |cols|>

          
            <cols.Col @shrink={{true}}>
              <header.Avatar
                @src={{this.avatar}}
                @alt="avatar name" />
            </cols.Col>

            <cols.Col @grow={{true}}>
              <header.Title>{{this.title}}</header.Title>
              <header.Description>{{this.description}}</header.Description>
            </cols.Col>

            <cols.Col>
              <header.Button >{{this.button}}</header.Button>
            </cols.Col>

          </header.Cols>

        </card.Header>
      
        <card.Body class="prose dark:prose-light opacity-20">
            <Ui::Text::P @loading={{this.loading}}>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</Ui::Text::P>
            <Ui::Text::P @loading={{this.loading}}>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</Ui::Text::P>
        </card.Body>

    </Ui::Card>`,
  context: args,
});

export const WithAvatarAndActions = WithAvatarAndActionsTemplate.bind({});

WithAvatarAndActions.args = {
  loading: false,
  title: 'Card Heading with Avatar',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  button: 'Create new job',
};

WithAvatarAndActions.parameters = {
  layout: 'padded',
};
