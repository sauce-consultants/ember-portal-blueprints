// import { hbs } from 'ember-cli-htmlbars';
// import { action } from '@ember/object';
// import { action as sbAction } from '@storybook/addon-actions';

export default {
  title: 'UI/Form/TBC',
  decorators: [],
};

// export const Default = () => ({
//   template: hbs`
//   <Ui::Form
//     @onSubmit={{this.onSubmit}}
//     @afterSubmit={{this.afterSubmit}}
//    as |form|>
//     <div class="p-6">This is an empty form</div>
//     <form.Submit>Submit</form.Submit>
//   </Ui::Form>
//     `,
//   context: {
//     onSubmit: action(sbAction('onSubmit')),
//     afterSubmit: action(sbAction('afterSubmit')),
//   },
// });

// export const BoundInputs = () => ({
//   template: hbs`
//   <div class="space-y-4">
//     <Ui::Form::Input
//       placeholder="Enter value"
//       @type="text"
//       @value={{this.model.text}}
//     />
//     <Ui::Form::Input
//       placeholder="Enter value"
//       @type="email"
//       @value={{this.model.email}}
//     />
//     <Ui::Form::Input
//       placeholder="Enter value"
//       @type="password"
//       @value={{this.model.password}}
//     />
//     <Ui::Form::Input
//       placeholder="Enter value"
//       @type="number"
//       @value={{this.model.number}}
//       min=0
//       max=100
//       step=5
//     />

//     <div>Text: {{this.model.text}}</div>
//     <div>Email: {{this.model.email}}</div>
//     <div>Password: {{this.model.password}}</div>
//     <div>Number: {{this.model.number}}</div>
//   </div>
//     `,
//   context: {
//     model: {
//       text: '',
//       email: '',
//       password: '',
//       number: '',
//     },
//   },
// });
