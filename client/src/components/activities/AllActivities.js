import ActivityCard from "./ActivityCard";
import { useSelector } from "react-redux";

const AllActivities = (props) => {
  const { userActivities } = useSelector((state) => state.userData);
  const { selectValue } = useSelector((state) => state.filterActivity);
  let filteredUserActivities = [];
  switch (selectValue) {
    case "date":
      filteredUserActivities = [...userActivities].sort((a, b) => {
        if (new Date(a.date) < new Date(b.date)) return 1;
        return -1;
      });
      break;
    case "activity":
      filteredUserActivities = [...userActivities].sort((a, b) => {
        if (a.activity_name < b.activity_name) return -1;
        return 1;
      });
      break;
    case "calories":
      filteredUserActivities = [...userActivities].sort((a, b) => {
        if (a.calories_burned < b.calories_burned) return 1;
        return -1;
      });
      break;
    case "duration":
      filteredUserActivities = [...userActivities].sort((a, b) => {
        if (a.activity_duration < b.activity_duration) return 1;
        return -1;
      });
      break;

    default:
      break;
  }
  return (
    <div>
      {filteredUserActivities.map((activity) => {
        return (
          <ActivityCard
            showBtns
            coords={[
              activity.location.split(",")[0],
              activity.location.split(",")[1],
            ]}
            key={activity.activity_id}
            activity={activity.activity_name}
            duration={activity.activity_duration}
            date={activity.date}
            calories={activity.calories_burned}
            id={activity.activity_id}
          />
        );
      })}
    </div>
  );
};

export default AllActivities;
