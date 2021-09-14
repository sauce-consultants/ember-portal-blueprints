import {hbs} from 'ember-cli-htmlbars';

export default {
  title: 'UI/Cards',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: {defaultValue: {summary: false}},
    },
    title: {
      control: 'text',
      description: 'Card title text',
      table: {defaultValue: {summary: false}},
    },
    padded: {
      control: 'boolean',
      description: 'Add padding to the whole card',
      table: {defaultValue: {summary: false}},
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Ui::Card 
      @loading={{this.loading}} 
      @padded={{this.padded}}
    >
      
      <div class="w-full h-64 bg-primary-100"></div>

    </Ui::Card>`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  loading: false,
  padded: true,
};

Default.parameters = {
  layout: 'padded',
};

const WithBodyTemplate = (args) => ({
  template: hbs`
    <Ui::Card @loading={{this.loading}} as |card|>
      
      <card.Body class="prose dark:prose-light">
        <Ui::Text::P @loading={{this.loading}}>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</Ui::Text::P>
        <Ui::Text::P @loading={{this.loading}}>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</Ui::Text::P>
      </card.Body>

    </Ui::Card>`,
  context: args,
});

export const WithBody = WithBodyTemplate.bind({});

WithBody.args = {
  loading: false,
};

WithBody.parameters = {
  layout: 'padded',
};

const WithHeaderTemplate = (args) => ({
  template: hbs`
    <Ui::Card @loading={{this.loading}} as |card|>
      
      <card.Header @title={{this.title}} />

      <card.Body class="prose dark:prose-light">
        <Ui::Text::P @loading={{this.loading}}>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</Ui::Text::P>
        <Ui::Text::P @loading={{this.loading}}>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</Ui::Text::P>
      </card.Body>

    </Ui::Card>`,
  context: args,
});

export const WithHeader = WithHeaderTemplate.bind({});

WithHeader.args = {
  loading: false,
  title: 'Card Title',
};

WithHeader.parameters = {
  layout: 'padded',
};

const WithFooterTemplate = (args) => ({
  template: hbs`
    <Ui::Card @loading={{this.loading}} as |card|>
      
      <card.Body class="prose dark:prose-light">
        <Ui::Text::P @loading={{this.loading}}>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</Ui::Text::P>
        <Ui::Text::P @loading={{this.loading}}>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</Ui::Text::P>
      </card.Body>
      
      <card.Footer>
        <Ui::Text::P @loading={{this.loading}}>Felis aptent sodales enim in in interdum.</Ui::Text::P>
      </card.Footer>

    </Ui::Card>`,
  context: args,
});

export const WithFooter = WithFooterTemplate.bind({});

WithFooter.args = {
  loading: false,
};

WithFooter.parameters = {
  layout: 'padded',
};

const WithHeaderAndFooterTemplate = (args) => ({
  template: hbs`
    <Ui::Card @loading={{this.loading}} as |card|>
      
      <card.Header @title={{this.title}} />
      
      <card.Body class="prose dark:prose-light">
        <Ui::Text::P @loading={{this.loading}}>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</Ui::Text::P>
        <Ui::Text::P @loading={{this.loading}}>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</Ui::Text::P>
      </card.Body>
      
      <card.Footer>
        <Ui::Text::P @loading={{this.loading}}>Felis aptent sodales enim in in interdum.</Ui::Text::P>
      </card.Footer>

    </Ui::Card>`,
  context: args,
});

export const WithHeaderAndFooter = WithHeaderAndFooterTemplate.bind({});

WithHeaderAndFooter.args = {
  loading: false,
  title: 'Card Title',
};

WithHeaderAndFooter.parameters = {
  layout: 'padded',
};

/*
export const Default = () => ({
  template: hbs`
    <div class="w-full bg-gray-200 p-6">
      <Ui::Card @name="basic">
        <div class="p-6 prose">
          <p>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</p>
          <p>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</p>
        </div>
      </Ui::Card>
    </div>
    `,
  context: {},
});

export const WithTitle = () => ({
  template: hbs`
    <div class="w-full bg-gray-200 p-6">
      <Ui::Card @title="Card with Title" @name="title">
        <div class="p-6 prose">
          <p>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</p>
          <p>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</p>
        </div>
      </Ui::Card>
    </div>
    `,
  context: {},
});

export const WithFullWidthContent = () => ({
  template: hbs`
    <div class="w-full bg-gray-200 p-6">
      <Ui::Card @title="Card with Title" @name="title">
        <div class="bg-primary-50">
          <div class="prose p-6">
            <p>Sapien est gravida in consectetur a nec a orci a felis aptent sodales enim in in interdum at habitant aenean sociosqu nulla in a vestibulum parturient parturient.</p>
            <p>Consectetur nec vestibulum sociis odio a porttitor hac proin scelerisque velit egestas duis vel suspendisse risus porta donec mi ullamcorper quam parturient massa auctor dictum vehicula phasellus mattis eu.</p>
          </div>
        </div>
      </Ui::Card>
    </div>
    `,
  context: {},
});
*/
