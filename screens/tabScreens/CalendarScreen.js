import React, { useState } from "react";
import { View, Text } from "react-native";
import { Agenda } from "react-native-calendars";

const CalendarScreen = () => {
  const [items, setItems] = useState({
    "2025-01-07": [{ name: "Meeting with client", time: "10:00 AM" }],
    "2025-01-13": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
      { name: "Project presentation", time: "5:00 PM" },
    ],
    "2025-02-10": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
    ],
    "2025-02-17": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
    ],
  });

  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No events for this day</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <Agenda
        pastScrollRange={1}
        futureScrollRange={1}
        items={items}
        renderEmptyData={renderEmptyData}
        renderItem={(item) => (
          <View
            style={{
              marginVertical: 10,
              marginTop: 30,
              backgroundColor: "white",
              marginHorizontal: 10,
              padding: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CalendarScreen;
