import { hbs } from 'ember-cli-htmlbars';

import { action } from '@ember/object';
import { action as sbAction } from '@storybook/addon-actions';

export default {
  title: 'UI/Slideover',
  decorators: [],
};

const Template = (args) => ({
  template: hbs`
  <Ui::SlideOver 
    @isShowing={{this.isShowing}}
    @onClose={{this.onClose}}
    class="px-6 pb-6"
  >
  
    <div class="h-full w-full bg-gray-100 dark:bg-gray-900"></div>

  </Ui::SlideOver>
    `,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  isShowing: true,
  onClose: action(sbAction('onClose')),
};
