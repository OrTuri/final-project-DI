import ActivityCard from "./ActivityCard";
import { useSelector } from "react-redux";

const RecentActivities = (props) => {
  const { userActivities } = useSelector((state) => state.userData);
  return (
    <div>
      {[...userActivities].reverse().map((activity) => {
        return (
          <ActivityCard
            coords={[
              activity.location.split(",")[0],
              activity.location.split(",")[1],
            ]}
            key={activity.activity_id}
            activity={activity.activity_name}
            duration={activity.activity_duration}
            date={activity.date}
            calories={activity.calories_burned}
          />
        );
      })}
    </div>
  );
};

export default RecentActivities;
