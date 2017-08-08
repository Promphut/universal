import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "top-bar-with-back" */ './TopBarWithBack'),
});
