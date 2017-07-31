import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "error-page" */ './ErrorPage'),
});
