import React from "react";
import SchedulerWrapper from "Layouts/UserLayout/SchedulerLayout/SchedulerWrapper";
import SelectSlotSection from "sections/AppPages/UserPages/SchedulerSections/SelectSlot/";

const SelectSlot = () => {
  return (
    <SchedulerWrapper title="Schedule- Hivepath">
      <SelectSlotSection />
    </SchedulerWrapper>
  );
};

export default React.memo(SelectSlot);
