import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "contact-and-about" */ './ContactAndAbout'),
});
