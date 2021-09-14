import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { action as sbAction } from '@storybook/addon-actions';

export default {
  title: 'UI/Archive',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    button: {
      control: 'text',
      description: 'Text for the archive button ',
      table: { defaultValue: { summary: null } },
    },
    task: {
      control: 'object',
      description: 'Pass the archive task in to set the buttons busy state',
      table: { defaultValue: { summary: null } },
    },
    action: {
      control: 'object',
      description: 'Action to call on delete tap',
      table: { defaultValue: { summary: null } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
  <Ui::Archive
    @loading={{this.loading}}
    @button={{this.button}}
    @onDelete={{this.action}}>
      <Ui::Text::P @loading={{this.loading}}>In parturient at nisi ullamcorper metus eu consectetur lobortis nunc arcu.</Ui::Text::P>
      <Ui::Text::P @loading={{this.loading}}>cubilia per mus parturient consectetur suspendisse inceptos eros mus non class parturient aliquam condimentum quam duis.</Ui::Text::P>
  </Ui::Archive>`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  loading: false,
  button: 'Archive',
  action: action(sbAction('onButtonClick')),
};

Default.parameters = {
  layout: 'padded',
};

/*
export const Loading = () => ({
  template: hbs`
    <div class="w-96">
      <Ui::Archive
        @loading={{true}}
        @onDelete={{this.action}}
        @button="Archive">
        <p>In parturient at nisi ullamcorper metus eu consectetur.</p>
        <p>cubilia per mus parturient consectetur suspendisse inceptos eros mus non class parturient aliquam condimentum quam duis.</p>
      </Ui::Archive>
    </div>
    `,
  context: {
    action: action(sbAction('onButtonClick')),
  },
});

export const Submitting = () => ({
  template: hbs`
    <div class="w-96">
      <Ui::Archive
        @loading={{false}}
        @onDelete={{this.action}}
        @button="Archive"
        @task={{this.task}}>
        <p>In parturient at nisi ullamcorper metus eu consectetur lobortis nunc arcu.</p>
        <p>cubilia per mus parturient consectetur suspendisse inceptos eros mus non class parturient aliquam condimentum quam duis.</p>
      </Ui::Archive>
    </div>
    `,
  context: {
    action: action(sbAction('onButtonClick')),
    task: {
      isRunning: true,
    },
  },
});
//
// export const TitleAlerts = () => ({
//   template: hbs `
//   <div class="space-y-4 flex flex-col max-w-full">
//     <Ui::Alert @type="success" @title="Success Alert" @body="Information about this alert"/>
//     <Ui::Alert @type="warning" @title="Warning Alert" @body="Information about this alert"/>
//     <Ui::Alert @type="error" @title="Error Alert" @body="Information about this alert"/>
//     <Ui::Alert @type="primary" @title="Primary Alert" @body="Information about this alert"/>
//     <Ui::Alert @type="secondary" @title="Secondary Alert" @body="Information about this alert"/>
//     <Ui::Alert @title="Gray Alert" @body="Information about this alert"/>
//   </div>
//   `,
//   context: {}
// });
//
// export const ButtonAlerts = () => ({
//   template: hbs `
//   <div class="space-y-4 flex flex-col max-w-full">
//     <Ui::Alert @type="success" @title="Success Alert" @button="clear" @onButtonClick={{this.action}}/>
//     <Ui::Alert @type="warning" @title="Warning Alert" @button="clear" @onButtonClick={{this.action}}/>
//     <Ui::Alert @type="error" @title="Error Alert" @button="clear" @onButtonClick={{this.action}}/>
//     <Ui::Alert @type="primary" @title="Primary Alert" @button="clear" @onButtonClick={{this.action}}/>
//     <Ui::Alert @type="secondary" @title="Secondary Alert" @button="clear" @onButtonClick={{this.action}}/>
//     <Ui::Alert @title="Gray Alert" @button="clear" @onButtonClick={{this.action}}/>
//   </div>
//   `,
//   context: {
//     action: action(sbAction('onButtonClick')),
//   }
// });
//
// export const Playground = () => ({
//   template: hbs `
//   <div class="space-y-4 flex flex-col max-w-full">
//     <Ui::Alert
//       @type={{this.type}}
//       @title={{this.title}}
//       @body={{this.body}}
//       @icon={{this.icon}}
//       @button={{this.button}}
//       @onButtonClick={{this.action}}
//     />
//   </div>
//   `,
//   context: {
//     title: text("Title Text", ""),
//     body: text("Body Text", "I got something to tell you"),
//     button: text("Button Text", ""),
//     type: select("Type", types, "success"),
//     icon: text("Icon", ""),
//     action: action(sbAction('onButtonClick')),
//   }
// });
*/
