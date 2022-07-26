import ActivityCard from "./ActivityCard";
import { useSelector } from "react-redux";

const RecentActivities = (props) => {
  const { userActivities } = useSelector((state) => state.userData);
  return (
    <div>
      {userActivities.length > 0 && (
        <h3 style={{ fontSize: "17px", textAlign: "center" }}>
          5 most recently added activities:
        </h3>
      )}
      {[...userActivities]
        .reverse()
        .slice(0, 5)
        .map((activity) => {
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
              id={activity.activity_id}
            />
          );
        })}
    </div>
  );
};

export default RecentActivities;
