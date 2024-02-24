// ActivityTypeDropdown.js
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const ActivityTypeDropdown = ({ activityType, setActivityType, open, setOpen, items, setItems }) => (
  <DropDownPicker
    open={open}
    value={activityType}
    items={items}
    setOpen={setOpen}
    setValue={setActivityType}
    setItems={setItems}
    placeholder="Select an activity type"
    containerStyle={styles.containerStyle}
    dropDownContainerStyle={styles.dropDownContainerStyle}
    placeholderStyle={styles.placeholderStyle}
    textStyle={styles.textStyle}
    labelStyle={styles.labelStyle}
    zIndex={5000}
  />
);

const styles = {
};

export default ActivityTypeDropdown;
