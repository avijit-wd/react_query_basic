import SingleItem from "./SingleItem";
import { useFetchTasks } from "./react-query-custom-hooks";

const Items = () => {
  const { data } = useFetchTasks();
  return (
    <div className="items">
      {data?.data?.taskList?.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
