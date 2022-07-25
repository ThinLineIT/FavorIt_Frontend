import {
  Price,
  Dates,
  Title,
  Options,
  Preview,
  Crawling,
  Description,
} from '../page-components';

const hocComponents = [
  { page: 0, component: <Crawling /> },
  { page: 1, component: <Options /> },
  { page: 2, component: <Price /> },
  { page: 3, component: <Title /> },
  { page: 4, component: <Description /> },
  { page: 5, component: <Dates /> },
  { page: 6, component: <Preview /> },
];

export default hocComponents;
