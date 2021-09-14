import { hbs } from 'ember-cli-htmlbars';

const colorOptions = [
  'transparent',
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
  title: 'UI/Header',
  decorators: [],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title text',
      table: { defaultValue: { summary: null } },
    },
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'The color of the header',
      table: { defaultValue: { summary: 'transparent' } },
    },
  },
};

const SimpleTemplate = (args) => ({
  template: hbs`
    <Ui::Header 
      @loading={{this.loading}}
      @color={{this.color}}
    as |header|>

      <header.Title @text={{this.title}} />

    </Ui::Header>
    `,
  context: args,
});

export const Simple = SimpleTemplate.bind({});

Simple.args = {
  loading: false,
  title: 'Page Header Title',
  color: 'transparent',
};

const ActionsTemplate = (args) => ({
  template: hbs`
    <Ui::Header 
      @loading={{this.loading}}
      @color={{this.color}}
    as |header|>

      <header.Title @text={{this.title}} />

      <header.Actions as |actions|>
        <actions.Action @icon="switch-vertical" @title="Order the results">Sort</actions.Action>
        <actions.Action @icon="filter" @title="Filter the results">Filter</actions.Action>
        <actions.Action @icon="download" @title="Download a cvs of the results">Export</actions.Action>
      </header.Actions>

    </Ui::Header>
    `,
  context: args,
});

export const Actions = ActionsTemplate.bind({});

Actions.args = {
  loading: false,
  title: 'Page Header with Actions',
  color: 'transparent',
};

const SearchTemplate = (args) => ({
  template: hbs`
    <Ui::Header 
      @loading={{this.loading}}
      @color={{this.color}}
    as |header|>

      <header.Title @text={{this.title}} />

      <header.Actions as |actions|>
        <actions.Action @icon="switch-vertical" @title="Order the results">Sort</actions.Action>
        <actions.Action @icon="filter" @title="Filter the results">Filter</actions.Action>
        <actions.Search @value={{this.search}}>Search</actions.Search>
      </header.Actions>

    </Ui::Header>
    `,
  context: args,
});

export const Search = SearchTemplate.bind({});

Search.args = {
  loading: false,
  title: 'Page Header with Search',
  color: 'transparent',
};
