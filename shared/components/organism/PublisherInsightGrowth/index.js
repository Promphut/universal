import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "publisher-insight-growth" */ './PublisherInsightGrowth'),
});
