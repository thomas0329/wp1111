import { useQuery } from '@apollo/client';
import { GET_ITEMS_QUERY } from '../graphql/queries';

import Balance from './Balance';
import Category from './Category';

function Analytics() {
  // TODO 2.2 Use the useQuery hook to get items from backend
  const { data, loading, subscribeToMore }
        = useQuery(GET_ITEMS_QUERY, {
        // variables: {
        //     name1: me,
        //     name2: friend,
        // },
    });

  // useEffect(
  //   () => {
  //     subscribeToMore({
  //       document: GET_ITEMS_QUERY,
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         const item = subscriptionData.data.itemCreated;
  //         return {
  //           items: [item, ...prev.items],
  //         };
  //       },
  //     });
  //   },
  //   [subscribeToMore],
  // );
  const items = data.items;
  // // TODO 2.2 End


  return (
    <div className="grid grid-cols-12 gap-6">
      { 
        // TODO 2.3 Add Balence and Category (uncomment the following code)
      }
      <div className="col-span-6">
        <Balance items={items} />
      </div>
      <div className="col-span-6">
        <Category items={items} />
      </div>
      {
        // TODO 2.3 End
      }
    </div>
  );
}

export default Analytics;
